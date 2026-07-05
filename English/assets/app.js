(async function () {
  const grid = document.getElementById('seriesGrid');

  let catalog;
  try {
    const res = await fetch('data/catalog.json');
    catalog = await res.json();
  } catch (e) {
    grid.innerHTML = '<p class="loading">资料清单加载失败，请刷新重试</p>';
    return;
  }

  const lastRead = JSON.parse(localStorage.getItem('english:lastRead') || 'null');

  grid.innerHTML = catalog.series.map(series => {
    const lessons = series.lessons.map(lesson => {
      const isLast = lastRead && lastRead.series === series.id && lastRead.lesson === lesson.no;
      return `
        <li>
          <a href="reader.html?series=${encodeURIComponent(series.id)}&lesson=${lesson.no}">
            <span class="no">${lesson.no}</span>
            <span class="name">${lesson.title}${isLast ? ' ·上次' : ''}</span>
          </a>
        </li>`;
    }).join('');

    return `
      <section class="series-card">
        <div class="cover">${series.cover || '📘'}</div>
        <h2>${series.title}</h2>
        <p class="desc">${series.description}（共 ${series.lessons.length} 课）</p>
        <ul class="lesson-list">${lessons}</ul>
      </section>`;
  }).join('');
})();
