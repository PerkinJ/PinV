'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _utils = require('../../../utils/utils');

var _index = require('./index.css');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var renderCircles = function renderCircles(props) {
	var max = 1.2 * d3.max(props.data, function (d) {
		return d.value;
	});
	var colorVal = (0, _utils.handleD3Color)(props.color);
	var minColor = colorVal.brighter(),
	    maxColor = colorVal.darker();
	var color = d3.interpolate(minColor, maxColor);
	return function (coords, index) {
		var delta = props.width / props.data.length;
		var circleProps = {
			cx: props.xScale(coords[props.XAxis]) + delta / 2,
			cy: props.yScale(coords[props.YAxis]),
			r: props.r,
			key: index,
			fill: props.fill || color(props.yScale(coords[props.YAxis]) / max),
			stroke: props.circleStroke || color(props.yScale(coords[props.YAxis]) / max),
			strokeWidth: 1
		};
		return (0, _preact.h)('circle', _extends({ 'class': _index2.default.circle }, circleProps));
	};
};

exports.default = function (props) {
	return (0, _preact.h)(
		'g',
		{ transform: 'translate(0 ,' + props.padding.top + ')' },
		props.data.map(renderCircles(props))
	);
};
//# sourceMappingURL=Circles.js.map