(function () {
	'use strict';

	const { loadJSON, pct, signClass, showError } = window.Site;
	const COLORS = { volume: 'rgba(91,141,239,0.55)', volumeLast: '#5b8def', ma: '#e9c77b', cyb: '#f0616d', hb: '#3ecf8e', zero: 'rgba(255,255,255,0.18)', grid: 'rgba(255,255,255,0.06)', tick: '#8b94a3' };
	const MA_WINDOW = 20;

	const $ = (id) => document.getElementById(id);
	let data = null;
	let ma20 = [];
	let volumeChart = null;
	let etfChart = null;

	function xTick() {
		return {
			color: COLORS.tick,
			maxTicksLimit: 5,
			maxRotation: 0,
			callback(value) {
				const d = this.getLabelForValue(value);
				return d.slice(2, 4) + '/' + d.slice(5, 7) + '/' + d.slice(8, 10);
			},
		};
	}

	function baseOptions(yTickFormatter, tooltipCallbacks) {
		return {
			responsive: true,
			maintainAspectRatio: false,
			animation: false,
			interaction: { mode: 'index', intersect: false },
			layout: { padding: { right: 6 } },
			plugins: {
				legend: { display: false },
				tooltip: {
					backgroundColor: 'rgba(20,24,31,0.95)',
					borderColor: '#2a303b',
					borderWidth: 1,
					callbacks: tooltipCallbacks,
				},
			},
			scales: {
				x: { grid: { display: false }, ticks: xTick() },
				y: { grid: { color: COLORS.grid }, ticks: { color: COLORS.tick, callback: yTickFormatter } },
			},
		};
	}

	function movingAverage(values, window) {
		return values.map((_, i) => {
			if (i < window - 1) return null;
			let sum = 0;
			for (let j = i - window + 1; j <= i; j++) sum += values[j];
			return sum / window;
		});
	}

	/** 区间内以首日为基准的累计涨跌幅（小数） */
	function cumulative(series) {
		let nav = 1;
		return series.map((v, i) => {
			if (i > 0) nav *= 1 + v;
			return nav - 1;
		});
	}

	function renderAnalysis() {
		const a = data.analysis;
		const text = $('analysisText');
		const meta = $('analysisMeta');
		if (!a || !a.text) {
			text.textContent = '暂无分析（未配置大模型或生成失败）。';
			text.classList.add('empty');
			meta.textContent = '';
			return;
		}
		text.textContent = a.text;
		meta.textContent = (a.stale ? '今日分析生成失败，当前显示 ' + a.date + ' 的分析 · ' : a.date + ' 收盘后 · ') +
			'由大模型 ' + a.model + ' 依据下方数据生成 · ' + a.generated_at;
	}

	function renderKpis() {
		const s = data.summary;
		const kpi = (label, value, vs, cls) =>
			'<div class="kpi"><div class="label">' + label + '</div><div class="value ' + (cls || '') + '">' + value +
			'</div><div class="vs">' + vs + '</div></div>';
		$('kpiTitle').textContent = s.date.replace(/-/g, '/') + ' 收盘';
		$('kpis').innerHTML =
			kpi('沪深两市成交量', s.volume.toFixed(0) + ' 亿股',
				'前 20 日均量的 ' + s.volume_vs_ma20.toFixed(2) + ' 倍 · 近1年分位 ' + (s.volume_pctile_1y * 100).toFixed(0) + '%') +
			kpi(data.etfs.cyb.name + ' ' + data.etfs.cyb.code, pct(s.cyb_pct),
				'近5日 ' + pct(s.cyb_5d) + ' · 近20日 ' + pct(s.cyb_20d), signClass(s.cyb_pct)) +
			kpi(data.etfs.hb.name + ' ' + data.etfs.hb.code, pct(s.hb_pct),
				'近5日 ' + pct(s.hb_5d) + ' · 近20日 ' + pct(s.hb_20d), signClass(s.hb_pct));
	}

	function sliceStart(days) {
		return days > 0 ? Math.max(0, data.dates.length - days) : 0;
	}

	function buildCharts() {
		const unit = data.volume_unit;
		volumeChart = new Chart($('volumeChart').getContext('2d'), {
			type: 'bar',
			data: {
				labels: [],
				datasets: [
					{
						type: 'line', data: [], borderColor: COLORS.ma, borderWidth: 1.4,
						pointRadius: 0, pointHoverRadius: 0, tension: 0, spanGaps: true, order: 0,
					},
					{
						data: [], backgroundColor: (c) => (c.dataIndex === c.dataset.data.length - 1 ? COLORS.volumeLast : COLORS.volume),
						borderRadius: 2, order: 1,
					},
				],
			},
			options: baseOptions((v) => v.toFixed(0), {
				title: (items) => items[0].label,
				label: (item) => (item.datasetIndex === 0 ? MA_WINDOW + ' 日均量 ' : '成交量 ') +
					item.parsed.y.toFixed(1) + ' ' + unit,
			}),
		});

		const etfOptions = baseOptions((v) => (v * 100).toFixed(0) + '%', {
			title: (items) => items[0].label,
			label: (item) => item.dataset.label + ' 累计 ' + pct(item.parsed.y) +
				'（当日 ' + pct(item.dataset.daily[item.dataIndex]) + '）',
		});
		etfChart = new Chart($('etfChart').getContext('2d'), {
			type: 'line',
			data: {
				labels: [],
				datasets: [
					{ label: data.etfs.cyb.name, data: [], daily: [], borderColor: COLORS.cyb, borderWidth: 1.6, pointRadius: 0, pointHoverRadius: 3, tension: 0 },
					{ label: data.etfs.hb.name, data: [], daily: [], borderColor: COLORS.hb, borderWidth: 1.6, pointRadius: 0, pointHoverRadius: 3, tension: 0 },
				],
			},
			options: etfOptions,
		});

		$('volumeLegend').innerHTML =
			'<span><i style="border-color:' + COLORS.volumeLast + '"></i>成交量（' + unit + '，' +
			Object.values(data.volume_components).join(' + ') + '）</span>' +
			'<span><i style="border-color:' + COLORS.ma + '"></i>' + MA_WINDOW + ' 日均量</span>';
		$('etfLegend').innerHTML =
			'<span><i style="border-color:' + COLORS.cyb + '"></i>' + data.etfs.cyb.name + ' ' + data.etfs.cyb.code + '</span>' +
			'<span><i style="border-color:' + COLORS.hb + '"></i>' + data.etfs.hb.name + ' ' + data.etfs.hb.code + '</span>';
	}

	function setRange(days) {
		const start = sliceStart(days);
		const dates = data.dates.slice(start);
		volumeChart.data.labels = dates;
		volumeChart.data.datasets[0].data = ma20.slice(start);
		volumeChart.data.datasets[1].data = data.volume.slice(start);
		volumeChart.update();

		etfChart.data.labels = dates;
		[['cyb_pct', 0], ['hb_pct', 1]].forEach(([key, idx]) => {
			const daily = data[key].slice(start);
			etfChart.data.datasets[idx].daily = daily;
			etfChart.data.datasets[idx].data = cumulative(daily);
		});
		etfChart.update();

		document.querySelectorAll('#rangeBtns button').forEach((btn) => {
			btn.classList.toggle('active', Number(btn.dataset.days) === days);
		});
	}

	async function init() {
		try {
			data = await loadJSON('market.json');
		} catch (e) {
			showError($('app'), e);
			return;
		}
		ma20 = movingAverage(data.volume, MA_WINDOW);
		renderAnalysis();
		renderKpis();
		buildCharts();
		setRange(63);
		$('notice').textContent = '数据源 ' + data.source + ' · 更新于 ' + data.generated_at +
			'。ETF 涨跌幅按前复权收盘价计算。分析文字由大模型依据所列数据自动生成，仅供参考，不构成投资建议。';
		$('rangeBtns').addEventListener('click', (e) => {
			const btn = e.target.closest('button');
			if (btn) setRange(Number(btn.dataset.days));
		});
	}

	init();
})();
