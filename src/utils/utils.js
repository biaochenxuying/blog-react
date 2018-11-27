export function setCookie(cName, value, expiredays) {
	if (expiredays > 0 && expiredays !== '100') {
		let exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = cName + '=' + escape(value) + (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
	}
	if (expiredays === '100') {
		let exdate = new Date('2118-01-01 00:00:00');
		document.cookie = cName + '=' + escape(value) + (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
	}
}
export function getCookie(cName) {
	if (document.cookie.length > 0) {
		let cStart = document.cookie.indexOf(cName + '=');
		if (cStart !== -1) {
			cStart = cStart + cName.length + 1;
			let cEnd = document.cookie.indexOf(';', cStart);
			if (cEnd === -1) cEnd = document.cookie.length;
			return unescape(document.cookie.substring(cStart, cEnd));
		}
	}
	return '';
}

export function delCookie(name) {
	let exp = new Date();
	exp.setTime(exp.getTime() - 1);
	let cval = getCookie(name);
	if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
}

//清除cookie
export function clearCookie(name) {
	setCookie(name, '', -1);
}

//获取QueryString的数组
export function getQueryString() {
	let result = window.location.search.match(new RegExp('[?&][^?&]+=[^?&]+', 'g'));
	if (result == null) {
		return '';
	}
	for (let i = 0; i < result.length; i++) {
		result[i] = result[i].substring(1);
	}
	return result;
}
//根据 QueryString 参数名称获取值
export function getQueryStringByName(name) {
	let result = window.location.search.match(new RegExp('[?&]' + name + '=([^&]+)', 'i'));
	if (result == null || result.length < 1) {
		return '';
	}
	return result[1];
}
//获取页面顶部被卷起来的高度
export function getScrollTop() {
	return Math.max(
		//chrome
		document.body.scrollTop,
		//firefox/IE
		document.documentElement.scrollTop,
	);
}
//获取页面文档的总高度
export function getDocumentHeight() {
	//现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}
//页面浏览器视口的高度
export function getWindowHeight() {
	return document.compatMode === 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight;
}
//// 时间 格式化成 2018-12-12 12:12:00
export function timestampToTime(timestamp, dayMinSecFlag) {
	const date = new Date(timestamp);
	const Y = date.getFullYear() + '-';
	const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
	const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
	const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
	const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	if (!dayMinSecFlag) {
		return Y + M + D;
	}
	return Y + M + D + h + m + s;
}

//判断是移动端还是 pc 端 ，true 表示是移动端，false 表示是 pc 端
export function isMobileOrPc() {
	if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		return true;
	} else {
		return false;
	}
}
