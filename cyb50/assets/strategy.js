(function () {
	'use strict';

	const { loadJSON, pct, signClass, showError } = window.Site;
	const $ = (id) => document.getElementById(id);

	const SERIES_COLORS = { pure: '#5b8def', bh: '#7b8494', hb: '#f0b43c', cq: '#a78bfa', ccb: '#22d3ee' };
	const EXTRA_KEYS = ['hb', 'cq', 'ccb'];
	const RULES =
		'买入：收盘 > MA20×1.02、收盘 > MA60、MA20 较 5 日前上升，三项条件由假变真当天须放量（成交量 > 20 日均量）；' +
		'卖出：跌破 MA20×0.98。信号日收盘判断，次一交易日开盘执行。X 比值不参与。' +
		'每年重新从空仓起跑，“蓄水”版本把空仓资金停靠到指定资产。';

	let data = null;
	let chart = null;
	const activeSeries = new Set(['pure', 'bh']);

	const isPartialYear = (row) => row.last_day < row.year + '-12-25';
	const yearLabel = (row) => row.year + (isPartialYear(row) ? '*' : '');
	const cell = (value) => '<td class="' + signClass(value) + '">' + pct(value) + '</td>';

	function renderKpis() {
		const t = data.total;
		const winRate = t.trades ? (t.wins / t.trades * 100).toFixed(1) + '%' : '—';
		const kpi = (label, main, sub, value) =>
			'<div class="kpi"><div class="label">' + label + '</div><div class="value ' + signClass(value) + '">' +
			main + '</div><div class="vs">' + sub + '</div></div>';
		$('kpiTitle').textContent = data.start + ' ～ ' + data.end + ' · 毛收益，未扣佣金/价差/滑点';
		$('kpis').innerHTML =
			kpi('自然时间年化', pct(t.annualized.pure), '买入持有 ' + pct(t.annualized.bh), t.annualized.pure) +
			kpi('最大回撤', pct(t.dd.pure), '买入持有 ' + pct(t.dd.bh), t.dd.pure) +
			kpi('年度复利累计', pct(t.ret.pure, 1), '买入持有 ' + pct(t.ret.bh, 1), t.ret.pure) +
			kpi('交易胜率', winRate, t.wins + ' 胜 / ' + t.trades + ' 笔（含期末估值）', 0);
		$('warn').textContent =
			'累计为各年度独立试验净值连乘，并非不中断持仓的连续实盘账户；每年重新空仓起跑，结果不能与连续持仓账户互换。';
	}

	function renderChips() {
		const wrap = $('seriesChips');
		wrap.innerHTML = Object.keys(data.labels).map((key) =>
			'<button type="button" class="chip' + (activeSeries.has(key) ? ' on' : '') + '" data-key="' + key + '">' +
			'<span class="dot" style="background:' + SERIES_COLORS[key] + '"></span>' + data.labels[key] + '</button>'
		).join('');
		wrap.addEventListener('click', (e) => {
			const btn = e.target.closest('.chip');
			if (!btn) return;
			const key = btn.dataset.key;
			if (activeSeries.has(key)) {
				if (activeSeries.size === 1) return; // 至少保留一个系列
				activeSeries.delete(key);
			} else {
				activeSeries.add(key);
			}
			btn.classList.toggle('on', activeSeries.has(key));
			updateChart();
		});
	}

	function datasets() {
		return Object.keys(data.labels).filter((k) => activeSeries.has(k)).map((key) => ({
			label: data.labels[key],
			data: data.rows.map((r) => r.ret[key] * 100),
			backgroundColor: SERIES_COLORS[key],
			borderRadius: 3,
		}));
	}

	function buildChart() {
		chart = new Chart($('barChart').getContext('2d'), {
			type: 'bar',
			data: { labels: data.rows.map(yearLabel), datasets: datasets() },
			options: {
				responsive: true,
				maintainAspectRatio: false,
				animation: false,
				interaction: { mode: 'index', intersect: false },
				plugins: {
					legend: { display: false },
					tooltip: {
						backgroundColor: 'rgba(20,24,31,0.95)',
						borderColor: '#2a303b',
						borderWidth: 1,
						callbacks: { label: (i) => i.dataset.label + ' ' + pct(i.parsed.y / 100) },
					},
				},
				scales: {
					x: { grid: { display: false }, ticks: { color: '#8b94a3' } },
					y: {
						grid: { color: (c) => (c.tick.value === 0 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.06)') },
						ticks: { color: '#8b94a3', callback: (v) => v + '%' },
					},
				},
			},
		});
	}

	function updateChart() {
		chart.data.datasets = datasets();
		chart.update();
	}

	function detailsHtml(row) {
		if (!row.details.length) return '<div class="muted small" style="padding:12px 16px">该年度无交易信号，全年空仓。</div>';
		const body = row.details.map((d) =>
			'<tr><td>' + d.signal + '</td><td>' + d.day + '</td><td>' + d.action + '</td>' +
			'<td>' + d.price.toFixed(4) + '</td>' + cell(d.return) +
			'<td>' + (d.days === null ? '—' : d.days) + '</td></tr>').join('');
		return '<table class="details-table"><thead><tr><th>信号日</th><th>执行/估值日</th><th>操作</th>' +
			'<th>价格</th><th>收益</th><th>持有自然日</th></tr></thead><tbody>' + body + '</tbody></table>';
	}

	function renderTable() {
		const t = data.total;
		const extraHead = EXTRA_KEYS.map((k) => '<th class="extra">' + data.labels[k] + '</th>').join('');
		const extraCells = (ret) => EXTRA_KEYS.map((k) => '<td class="extra ' + signClass(ret[k]) + '">' + pct(ret[k]) + '</td>').join('');
		const head =
			'<thead><tr><th>年份</th><th>策略</th>' + extraHead +
			'<th>买入持有</th><th>超额</th><th>策略回撤</th><th>交易</th></tr></thead>';

		const summary =
			'<tr class="total"><td>复利合计</td>' + cell(t.ret.pure) + extraCells(t.ret) +
			cell(t.ret.bh) + cell(t.ret.pure - t.ret.bh) + cell(t.dd.pure) + '<td>' + t.trades + '</td></tr>' +
			'<tr class="total"><td>自然时间年化</td>' + cell(t.annualized.pure) + extraCells(t.annualized) +
			cell(t.annualized.bh) + cell(t.annualized.pure - t.annualized.bh) + '<td>—</td><td>—</td></tr>';

		const rows = data.rows.map((r) =>
			'<tr class="year-row" data-year="' + r.year + '"><td><span class="caret">▸</span>' + yearLabel(r) + '</td>' +
			cell(r.ret.pure) + extraCells(r.ret) + cell(r.ret.bh) + cell(r.ret.pure - r.ret.bh) +
			cell(r.dd.pure) + '<td>' + r.trades + '</td></tr>' +
			'<tr class="details-row" data-year="' + r.year + '" hidden><td class="details-cell" colspan="7"><div class="details-inner">' +
			detailsHtml(r) + '</div></td></tr>').join('');

		$('annualTable').className = '';
		$('annualTable').innerHTML = head + '<tbody>' + summary + rows + '</tbody>';
		const partial = data.rows.filter(isPartialYear).map((r) => r.year + ' 年截至 ' + r.last_day);
		$('tableNote').textContent = (partial.length ? '* 不完整年度：' + partial.join('、') + '。' : '') +
			'“交易”含年末未平仓的期末估值；超额 = 策略 − 买入持有。';
	}

	function syncVisibleWidth() {
		const wrap = $('annualTable').parentElement;
		wrap.style.setProperty('--visible-width', wrap.clientWidth + 'px');
	}

	function setExtra(on) {
		const table = $('annualTable');
		table.querySelectorAll('.extra').forEach((el) => { el.style.display = on ? '' : 'none'; });
		table.querySelectorAll('.details-cell').forEach((el) => { el.colSpan = on ? 10 : 7; });
		$('extraToggle').classList.toggle('on', on);
		$('extraToggle').textContent = on ? '隐藏蓄水版本' : '显示蓄水版本';
	}

	function renderNotes() {
		$('rules').textContent = RULES;
		const dd = EXTRA_KEYS.concat(['pure', 'bh']).map((k) => data.labels[k] + ' ' + pct(data.total.dd[k])).join(' ｜ ');
		const notes = [
			'年化按实际起止日期折算（' + data.years.toFixed(2) + ' 年），不是按年份个数；使用未四舍五入的净值，手动连乘表内两位小数会有微小误差。',
			'全期拼接最大回撤：' + dd + '。',
			'蓄水：策略卖出后，空仓资金停靠在红利低波(512890)、长江电力(600900)或建设银行(601939)，策略买入信号次日卖出停靠资产再买回。',
			'长江电力、建设银行为新浪前复权价格，未额外叠加股息率，前复权不等于逐笔派息到账与再投资的真实资金流水。',
			'红利低波于 2019-01-18 上市，此前停现金；停靠资产停牌期间只延续估值，不按旧价成交。',
			'年末仅按收盘估值，不是策略卖出信号，也不是次年必须重新买入的生产指令。',
			'数据来源：' + data.source + '；页面数据更新于 ' + data.generated_at + '。',
		];
		$('notes').innerHTML = notes.map((n) => '<li>' + n + '</li>').join('');
	}

	async function init() {
		try {
			data = await loadJSON('annual.json');
		} catch (e) {
			showError($('app'), e);
			return;
		}
		renderKpis();
		renderChips();
		buildChart();
		renderTable();
		setExtra(false);
		renderNotes();
		syncVisibleWidth();
		window.addEventListener('resize', syncVisibleWidth);

		$('extraToggle').addEventListener('click', () => setExtra($('extraToggle').textContent === '显示蓄水版本'));
		$('annualTable').addEventListener('click', (e) => {
			const row = e.target.closest('.year-row');
			if (!row) return;
			const detail = $('annualTable').querySelector('.details-row[data-year="' + row.dataset.year + '"]');
			detail.hidden = !detail.hidden;
			row.classList.toggle('open', !detail.hidden);
		});
	}

	init();
})();
