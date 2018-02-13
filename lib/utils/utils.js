'use strict';

exports.__esModule = true;
exports.bumps = exports.colour = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

exports.shade = function (hex, percent) {
	var R = void 0,
	    G = void 0,
	    B = void 0,
	    red = void 0,
	    green = void 0,
	    blue = void 0,
	    number = void 0;
	var min = Math.min,
	    round = Math.round;
	if (hex.length !== 7) {
		return hex;
	}
	number = parseInt(hex.slice(1), 16);
	R = number >> 16;
	G = number >> 8 & 0xFF;
	B = number & 0xFF;
	red = min(255, round((1 + percent) * R)).toString(16);
	if (red.length === 1) red = '0' + red;
	green = min(255, round((1 + percent) * G)).toString(16);
	if (green.length === 1) green = '0' + green;
	blue = min(255, round((1 + percent) * B)).toString(16);
	if (blue.length === 1) blue = '0' + blue;
	return '#' + red + green + blue;
};

exports.calculateScales = function (chartWidth, chartHeight, xValues, yValues, xDomain, yDomain) {

	var xScale = void 0,
	    yScale = void 0,
	    xdomain = void 0,
	    ydomain = void 0;
	xDomain = xDomain || [], yDomain = yDomain || [];
	if (xValues.length > 0 && Object.prototype.toString.call(xValues[0]) === '[object Date]') {
		xScale = d3.scaleTime().range([0, chartWidth]);
	} else {
		xScale = d3.scaleLinear().range([0, chartWidth]);
	}
	xdomain = d3.extent(xValues);
	if (xDomain[0] !== undefined && xDomain[0] !== null) xdomain[0] = xDomain[0];
	if (xDomain[1] !== undefined && xDomain[1] !== null) xdomain[1] = xDomain[1];
	xScale.domain(xdomain);

	if (yValues.length > 0 && Object.prototype.toString.call(yValues[0]) === '[object Date]') {
		yScale = d3.scaleTime().range([chartHeight, 0]);
	} else {
		yScale = d3.scaleLinear().range([chartHeight, 0]);
	}

	ydomain = d3.extent(yValues);
	if (yDomain[0] !== undefined && yDomain[0] !== null) ydomain[0] = yDomain[0];
	if (yDomain[1] !== undefined && yDomain[1] !== null) ydomain[1] = yDomain[1];
	yScale.domain(ydomain);

	return {
		xScale: xScale,
		yScale: yScale
	};
};

exports.flattenData = function (data, xAccessor, yAccessor) {

	var allValues = [];
	var xValues = [];
	var yValues = [];
	var coincidentCoordinateCheck = {};

	data.forEach(function (series, i) {
		series.values.forEach(function (item, j) {

			var x = xAccessor(item);

			// Check for NaN since d3's Voronoi cannot handle NaN values
			// Go ahead and Proceed to next iteration since we don't want NaN
			// in allValues or in xValues or yValues
			if (isNaN(x)) {
				return;
			}
			xValues.push(x);

			var y = yAccessor(item);
			// when yAccessor returns an object (as in the case of candlestick)
			// iterate over the keys and push all the values to yValues array
			var yNode = void 0;
			if ((typeof y === 'undefined' ? 'undefined' : _typeof(y)) === 'object' && Object.keys(y).length > 0) {
				Object.keys(y).forEach(function (key) {
					// Check for NaN since d3's Voronoi cannot handle NaN values
					// Go ahead and Proceed to next iteration since we don't want NaN
					// in allValues or in xValues or yValues
					if (isNaN(y[key])) {
						return;
					}
					yValues.push(y[key]);
					// if multiple y points are to be plotted for a single x
					// as in the case of candlestick, default to y value of 0
					yNode = 0;
				});
			} else {
				// Check for NaN since d3's Voronoi cannot handle NaN values
				// Go ahead and Proceed to next iteration since we don't want NaN
				// in allValues or in xValues or yValues
				if (isNaN(y)) {
					return;
				}
				yValues.push(y);
				yNode = y;
			}

			var xyCoords = x + '-' + yNode;
			if (coincidentCoordinateCheck.hasOwnProperty(xyCoords)) {
				// Proceed to next iteration if the x y pair already exists
				// d3's Voronoi cannot handle NaN values or coincident coords
				// But we push them into xValues and yValues above because
				// we still may handle them there (labels, etc.)
				return;
			}
			coincidentCoordinateCheck[xyCoords] = '';

			var pointItem = {
				coord: {
					x: x,
					y: yNode
				},
				d: item,
				id: series.name + j,
				series: series,
				seriesIndex: i
			};
			allValues.push(pointItem);
		});
	});

	return {
		allValues: allValues,
		xValues: xValues,
		yValues: yValues
	};
};
//# sourceMappingURL=utils.js.map