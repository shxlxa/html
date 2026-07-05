(async function () {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

  const params = new URLSearchParams(location.search);
  const seriesId = params.get('series');
  const startNo = parseInt(params.get('lesson'), 10) || 1;

  const pdfContainer = document.getElementById('pdfContainer');
  const pdfStatus = document.getElementById('pdfStatus');
  const lessonTitle = document.getElementById('lessonTitle');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('playBtn');
  const seekBar = document.getElementById('seekBar');
  const curTime = document.getElementById('curTime');
  const durTime = document.getElementById('durTime');
  const rateBtn = document.getElementById('rateBtn');
  const autoNextBtn = document.getElementById('autoNextBtn');
  const drawer = document.getElementById('drawer');
  const drawerMask = document.getElementById('drawerMask');
  const drawerList = document.getElementById('drawerList');

  // ---------- 加载目录数据 ----------
  let catalog;
  try {
    catalog = await (await fetch('data/catalog.json')).json();
  } catch (e) {
    pdfStatus.textContent = '资料清单加载失败，请刷新重试';
    return;
  }

  const series = catalog.series.find(s => s.id === seriesId) || catalog.series[0];
  let lesson = series.lessons.find(l => l.no === startNo) || series.lessons[0];

  // ---------- 自动连播设置（默认开启） ----------
  let autoNext = localStorage.getItem('english:autoNext') !== 'off';

  function renderAutoNextBtn() {
    autoNextBtn.textContent = autoNext ? '连播开' : '连播关';
    autoNextBtn.classList.toggle('on', autoNext);
  }
  renderAutoNextBtn();

  autoNextBtn.onclick = () => {
    autoNext = !autoNext;
    localStorage.setItem('english:autoNext', autoNext ? 'on' : 'off');
    renderAutoNextBtn();
  };

  // ---------- PDF 渲染 ----------
  let pdfDoc = null;
  let scale = 0; // 0 表示自动适应宽度
  let renderToken = 0;

  function fitScale(page) {
    const available = Math.min(pdfContainer.clientWidth - 24, 900);
    return available / page.getViewport({ scale: 1 }).width;
  }

  async function renderPdf() {
    if (!pdfDoc) return;
    const token = ++renderToken;
    const dpr = window.devicePixelRatio || 1;
    pdfContainer.querySelectorAll('canvas').forEach(c => c.remove());
    pdfStatus.style.display = 'none';

    for (let n = 1; n <= pdfDoc.numPages; n++) {
      if (token !== renderToken) return;
      const page = await pdfDoc.getPage(n);
      const s = scale || fitScale(page);
      const viewport = page.getViewport({ scale: s });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = viewport.width + 'px';
      pdfContainer.appendChild(canvas);
      await page.render({
        canvasContext: canvas.getContext('2d'),
        viewport,
        transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : null
      }).promise;
    }
  }

  async function loadPdf(url) {
    renderToken++;
    pdfDoc = null;
    pdfContainer.querySelectorAll('canvas').forEach(c => c.remove());
    pdfStatus.style.display = '';

    if (!url) {
      pdfStatus.textContent = '本课暂无图书文件，请直接收听音频 🎧';
      return;
    }
    pdfStatus.textContent = '正在加载 PDF…';
    try {
      pdfDoc = await pdfjsLib.getDocument(url).promise;
      await renderPdf();
    } catch (e) {
      pdfStatus.style.display = '';
      pdfStatus.textContent = 'PDF 加载失败，请检查网络后刷新重试';
    }
  }

  document.getElementById('zoomInBtn').onclick = async () => {
    if (!pdfDoc) return;
    const page = await pdfDoc.getPage(1);
    scale = (scale || fitScale(page)) * 1.2;
    renderPdf();
  };
  document.getElementById('zoomOutBtn').onclick = async () => {
    if (!pdfDoc) return;
    const page = await pdfDoc.getPage(1);
    scale = (scale || fitScale(page)) / 1.2;
    renderPdf();
  };
  document.getElementById('zoomFitBtn').onclick = () => {
    scale = 0;
    renderPdf();
  };

  let resizeTimer;
  window.addEventListener('resize', () => {
    if (scale !== 0) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderPdf, 300);
  });

  // ---------- 课程切换（页内切换，不刷新页面） ----------
  function progressKey() {
    return `english:progress:${series.id}:${lesson.no}`;
  }

  function lessonIndex() {
    return series.lessons.indexOf(lesson);
  }

  function loadLesson(l, opts = {}) {
    lesson = l;
    const idx = lessonIndex();

    document.title = `${lesson.title} - 英语学习资料库`;
    lessonTitle.textContent = `${lesson.no}. ${lesson.title}`;
    history.replaceState(null, '', `reader.html?series=${encodeURIComponent(series.id)}&lesson=${lesson.no}`);
    localStorage.setItem('english:lastRead', JSON.stringify({ series: series.id, lesson: lesson.no }));

    prevBtn.disabled = idx <= 0;
    nextBtn.disabled = idx >= series.lessons.length - 1;

    drawerList.querySelectorAll('a').forEach(a => {
      a.classList.toggle('active', parseInt(a.dataset.no, 10) === lesson.no);
    });

    scale = 0;
    loadPdf(lesson.pdf);

    audio.src = lesson.audio;
    seekBar.value = 0;
    seekBar.style.setProperty('--played', '0%');
    curTime.textContent = '0:00';
    durTime.textContent = '0:00';
    if (opts.autoplay) {
      audio.play().catch(() => {});
    }
  }

  prevBtn.onclick = () => {
    const idx = lessonIndex();
    if (idx > 0) loadLesson(series.lessons[idx - 1]);
  };
  nextBtn.onclick = () => {
    const idx = lessonIndex();
    if (idx < series.lessons.length - 1) loadLesson(series.lessons[idx + 1]);
  };

  // ---------- 课程抽屉 ----------
  document.getElementById('drawerTitle').textContent = series.title;
  drawerList.innerHTML = series.lessons.map(l => `
    <li>
      <a href="reader.html?series=${encodeURIComponent(series.id)}&lesson=${l.no}" data-no="${l.no}">
        <span class="no">${l.no}</span><span>${l.title}</span>
      </a>
    </li>`).join('');

  function closeDrawer() {
    drawer.classList.remove('open');
    drawerMask.classList.remove('open');
  }
  document.getElementById('menuBtn').onclick = () => {
    drawer.classList.add('open');
    drawerMask.classList.add('open');
  };
  drawerMask.onclick = closeDrawer;

  drawerList.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    const l = series.lessons.find(x => x.no === parseInt(a.dataset.no, 10));
    if (l && l !== lesson) loadLesson(l);
    closeDrawer();
  });

  // ---------- 音频播放器 ----------
  function fmt(sec) {
    if (!isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  audio.addEventListener('loadedmetadata', () => {
    durTime.textContent = fmt(audio.duration);
    const saved = parseFloat(localStorage.getItem(progressKey()));
    if (saved && saved > 3 && saved < audio.duration - 3) {
      audio.currentTime = saved;
    }
  });

  audio.addEventListener('timeupdate', () => {
    curTime.textContent = fmt(audio.currentTime);
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      seekBar.value = pct;
      seekBar.style.setProperty('--played', pct + '%');
      localStorage.setItem(progressKey(), audio.currentTime);
    }
  });

  audio.addEventListener('play', () => { playBtn.textContent = '⏸'; });
  audio.addEventListener('pause', () => { playBtn.textContent = '▶'; });

  audio.addEventListener('ended', () => {
    playBtn.textContent = '▶';
    localStorage.removeItem(progressKey());
    const idx = lessonIndex();
    if (autoNext && idx < series.lessons.length - 1) {
      loadLesson(series.lessons[idx + 1], { autoplay: true });
    }
  });

  playBtn.onclick = () => (audio.paused ? audio.play() : audio.pause());

  seekBar.addEventListener('input', () => {
    if (audio.duration) {
      audio.currentTime = (seekBar.value / 100) * audio.duration;
      seekBar.style.setProperty('--played', seekBar.value + '%');
    }
  });

  document.getElementById('backBtn').onclick = () => {
    audio.currentTime = Math.max(0, audio.currentTime - 15);
  };
  document.getElementById('fwdBtn').onclick = () => {
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 15);
  };

  const rates = [1, 1.25, 0.75];
  let rateIdx = 0;
  rateBtn.onclick = () => {
    rateIdx = (rateIdx + 1) % rates.length;
    audio.playbackRate = rates[rateIdx];
    rateBtn.textContent = rates[rateIdx] + 'x';
  };

  // 空格键播放/暂停
  document.addEventListener('keydown', e => {
    if (e.code === 'Space' && e.target === document.body) {
      e.preventDefault();
      playBtn.onclick();
    }
  });

  // ---------- 初始化 ----------
  loadLesson(lesson);
})();
