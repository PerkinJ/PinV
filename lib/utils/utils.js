'use strict';

exports.__esModule = true;
exports.bumps = exports.colour = undefined;
exports.handleD3Color = handleD3Color;
exports.colorGenerator = colorGenerator;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// 检测color的格式是否是hsl形式
function handleD3Color(str) {
	if (str && typeof str === 'string') {
		if (str.indexOf('hsl') > -1) {
			return d3.hsl(str);
		} else {
			return d3.rgb(str);
		}
	}
}

// 颜色生成器
function colorGenerator(numberOfSteps) {
	var colors = d3.range(numberOfSteps).map(function (index) {
		return d3.hsl(360 / numberOfSteps * index, 0.8, 0.64);
	});
	return function (index) {
		return colors[index];
	};
}

// 监听器
function addEvent(obj, type, fn) {
	if (obj.attachEvent) {
		obj['e' + type + fn] = fn;
		obj[type + fn] = function () {
			obj['e' + type + fn](window.event);
		};
		obj.attachEvent('on' + type, obj[type + fn]);
	} else obj.addEventListener(type, fn, false);
}

function removeEvent(obj, type, fn) {
	if (obj.detachEvent) {
		obj.detachEvent('on' + type, obj[type + fn]);
		obj[type + fn] = null;
	} else obj.removeEventListener(type, fn, false);
}

/**
 * Color scale generator
 * @returns {function} color generator
 */
var colour = exports.colour = function () {
	var scale = d3.scaleOrdinal(d3.schemeCategory20);
	return function (num) {
		return parseInt(scale(num).slice(1), 16);
	};
}();

// Inspired by Lee Byron’s test data generator.
var bumps = exports.bumps = function bumps(n, m) {
	var a = [],
	    i = void 0;
	for (i = 0; i < n; ++i) {
		a[i] = 0;
	}for (i = 0; i < m; ++i) {
		bump(a, n);
	}return a;
};

function bump(a, n) {
	var x = 1 / (0.1 + Math.random()),
	    y = 2 * Math.random() - 0.5,
	    z = 10 / (0.1 + Math.random());
	for (var i = 0; i < n; i++) {
		var w = (i / n - y) * z;
		a[i] += x * Math.exp(-w * w);
	}
}
//# sourceMappingURL=utils.js.map