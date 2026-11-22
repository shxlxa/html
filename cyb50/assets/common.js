(function () {
	'use strict';

	const base = document.body.dataset.base || './';

	async function loadJSON(name) {
		const resp = await fetch(base + 'data/' + name, { cache: 'no-cache' });
		if (!resp.ok) throw new Error(name + ' 加载失败 (' + resp.status + ')');
		return resp.json();
	}

	/** 小数 -> 带符号百分比，如 0.1234 -> +12.34% */
	function pct(value, digits) {
		if (value === null || value === undefined) return '—';
		const text = (value * 100).toFixed(digits === undefined ? 2 : digits) + '%';
		return value > 0 ? '+' + text : text;
	}

	/** A 股习惯红涨绿跌 */
	function signClass(value) {
		if (value === null || value === undefined || value === 0) return '';
		return value > 0 ? 'up' : 'down';
	}

	function showError(container, error) {
		container.innerHTML = '<div class="error">' + error.message + '</div>';
	}

	window.Site = { loadJSON, pct, signClass, showError };
})();
