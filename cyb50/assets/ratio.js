(function () {
	'use strict';

	const { loadJSON, signClass, showError } = window.Site;
	const COLORS = { line: '#5b8def', high: '#f0616d', low: '#3ecf8e', grid: 'rgba(255,255,255,0.06)', tick: '#8b94a3' };

	const $ = (id) => document.getElementById(id);
	let data = null;
	let chart = null;
	let view = null; // 当前区间切片

	function zoneOf(x, th) {
		if (x >= th.high) return { text: '高估区', cls: 'high' };
		if (x <= th.low) return { text: '低估区', cls: 'low' };
		return { text: '中性区间', cls: 'neutral' };
	}

	function renderHero() {
		const n = data.x.length;
		const last = data.x[n - 1];
		const diff = last - data.x[n - 2];
		const zone = zoneOf(last, data.thresholds);

		$('heroValue').textContent = last.toFixed(4);
		const delta = $('heroDelta');
		delta.textContent = (diff > 0 ? '▲ +' : diff < 0 ? '▼ ' : '') + diff.toFixed(4);
		delta.className = 'delta ' + signClass(diff);
		const pill = $('heroZone');
		pill.textContent = zone.text;
		pill.className = 'pill ' + zone.cls;

		const d = data.last_date.replace(/-/g, '/');
		$('heroMeta').innerHTML =
			d + ' 收盘 · 数据源 ' + data.source + '<br>' +
			data.numerator.name + '(' + data.numerator.code + ') ÷ ' +
			data.denominator.name + '(' + data.denominator.code + ')' +
			' · 更新于 ' + data.generated_at;
	}

	function sliceView(years) {
		let start = 0;
		if (years > 0) {
			const end = new Date(data.last_date + 'T00:00:00');
			end.setFullYear(end.getFullYear() - years);
			const cutoff = end.toISOString().slice(0, 10);
			start = data.dates.findIndex((d) => d >= cutoff);
			if (start < 0) start = 0;
		}
		return {
			dates: data.dates.slice(start),
			x: data.x.slice(start),
			cyb: data.cyb.slice(start),
			hb: data.hb.slice(start),
		};
	}

	/** 在图表区域内绘制高/低估区色带与虚线标注 */
	const zonePlugin = {
		id: 'zones',
		beforeDatasetsDraw(c) {
			const { ctx, chartArea: a, scales: { y } } = c;
			const th = data.thresholds;
			const yHigh = y.getPixelForValue(th.high);
			const yLow = y.getPixelForValue(th.low);
			ctx.save();
			ctx.beginPath();
			ctx.rect(a.left, a.top, a.right - a.left, a.bottom - a.top);
			ctx.clip();
			ctx.fillStyle = 'rgba(240,97,109,0.10)';
			ctx.fillRect(a.left, a.top, a.right - a.left, Math.max(0, yHigh - a.top));
			ctx.fillStyle = 'rgba(62,207,142,0.10)';
			ctx.fillRect(a.left, yLow, a.right - a.left, Math.max(0, a.bottom - yLow));
			ctx.setLineDash([5, 4]);
			ctx.lineWidth = 1;
			ctx.font = '11px -apple-system, "PingFang SC", sans-serif';
			[[yHigh, COLORS.high, th.high.toFixed(2) + ' 高估区', -5],
				[yLow, COLORS.low, th.low.toFixed(2) + ' 低估区', 13]].forEach(([py, color, text, dy]) => {
				ctx.strokeStyle = color;
				ctx.fillStyle = color;
				ctx.beginPath();
				ctx.moveTo(a.left, py);
				ctx.lineTo(a.right, py);
				ctx.stroke();
				ctx.fillText(text, a.left + 4, py + dy);
			});
			ctx.restore();
		},
	};

	function buildChart() {
		const ctx = $('ratioChart').getContext('2d');
		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: view.dates,
				datasets: [{
					data: view.x,
					borderColor: COLORS.line,
					borderWidth: 1.6,
					tension: 0,
					fill: 'start',
					backgroundColor: (c) => {
						const a = c.chart.chartArea;
						if (!a) return 'transparent';
						const g = c.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom);
						g.addColorStop(0, 'rgba(91,141,239,0.28)');
						g.addColorStop(1, 'rgba(91,141,239,0)');
						return g;
					},
					pointRadius: (c) => (c.dataIndex === c.dataset.data.length - 1 ? 4 : 0),
					pointBackgroundColor: '#fff',
					pointBorderColor: COLORS.line,
					pointBorderWidth: 2,
					pointHoverRadius: 4,
				}],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				animation: false,
				interaction: { mode: 'index', intersect: false },
				layout: { padding: { right: 6 } },
				plugins: {
					legend: { display: false },
					tooltip: {
						displayColors: false,
						backgroundColor: 'rgba(20,24,31,0.95)',
						borderColor: '#2a303b',
						borderWidth: 1,
						callbacks: {
							title: (items) => items[0].label,
							label: (item) => 'X 比值 ' + item.parsed.y.toFixed(4),
							afterLabel: (item) => [
								data.numerator.name + ' ' + view.cyb[item.dataIndex].toFixed(2),
								data.denominator.name + ' ' + view.hb[item.dataIndex].toFixed(2),
							],
						},
					},
				},
				scales: {
					x: {
						grid: { display: false },
						ticks: {
							color: COLORS.tick,
							maxTicksLimit: 5,
							maxRotation: 0,
							callback(value) {
								const d = this.getLabelForValue(value);
								return d.slice(2, 4) + '/' + d.slice(5, 7);
							},
						},
					},
					y: {
						grid: { color: COLORS.grid },
						ticks: { color: COLORS.tick, callback: (v) => v.toFixed(2) },
					},
				},
			},
			plugins: [zonePlugin],
		});
	}

	function yBounds() {
		const th = data.thresholds;
		const min = Math.min(...view.x, th.low);
		const max = Math.max(...view.x, th.high);
		const pad = (max - min) * 0.06;
		return { min: Math.max(0, min - pad), max: max + pad };
	}

	function renderStats(years) {
		const xs = view.x;
		const maxV = Math.max(...xs);
		const minV = Math.min(...xs);
		const last = xs[xs.length - 1];
		const below = xs.filter((v) => v <= last).length / xs.length;
		const dateOf = (v) => view.dates[xs.indexOf(v)];
		const high = data.thresholds.high;
		const low = data.thresholds.low;
		const daysHigh = xs.filter((v) => v >= high).length;
		const daysLow = xs.filter((v) => v <= low).length;

		$('statsTitle').textContent = '统计（' + (years ? '近' + years + '年' : '全部历史') + '，' + xs.length + ' 个交易日）';
		const tile = (label, value, sub) =>
			'<div class="stat"><div class="label">' + label + '</div><div class="value">' + value +
			'</div><div class="sub">' + sub + '</div></div>';
		$('stats').innerHTML =
			tile('区间最高', maxV.toFixed(4), dateOf(maxV)) +
			tile('区间最低', minV.toFixed(4), dateOf(minV)) +
			tile('当前分位', (below * 100).toFixed(0) + '%', '低于当前值的天数占比') +
			tile('高估区天数', daysHigh, '占比 ' + (daysHigh / xs.length * 100).toFixed(1) + '%') +
			tile('低估区天数', daysLow, '占比 ' + (daysLow / xs.length * 100).toFixed(1) + '%') +
			tile('区间均值', (xs.reduce((s, v) => s + v, 0) / xs.length).toFixed(4), '算术平均');
	}

	function setRange(years) {
		view = sliceView(years);
		const b = yBounds();
		chart.data.labels = view.dates;
		chart.data.datasets[0].data = view.x;
		chart.options.scales.y.min = b.min;
		chart.options.scales.y.max = b.max;
		chart.update();
		renderStats(years);
		document.querySelectorAll('#rangeBtns button').forEach((btn) => {
			btn.classList.toggle('active', Number(btn.dataset.years) === years);
		});
	}

	function renderLegend() {
		const th = data.thresholds;
		$('legend').innerHTML =
			'<span><i style="border-color:' + COLORS.line + '"></i>比值</span>' +
			'<span><i class="dash" style="border-color:' + COLORS.high + '"></i>高估区 ≥ ' + th.high.toFixed(2) + '</span>' +
			'<span><i class="dash" style="border-color:' + COLORS.low + '"></i>低估区 ≤ ' + th.low.toFixed(2) + '</span>';
	}

	async function init() {
		try {
			data = await loadJSON('ratio.json');
		} catch (e) {
			showError($('app'), e);
			return;
		}
		renderHero();
		renderLegend();
		view = sliceView(0);
		buildChart();
		setRange(0);
		$('rangeBtns').addEventListener('click', (e) => {
			const btn = e.target.closest('button');
			if (btn) setRange(Number(btn.dataset.years));
		});
	}

	init();
})();
