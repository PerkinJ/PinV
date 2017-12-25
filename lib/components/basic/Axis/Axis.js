'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// 计算x轴的长度
var getScaleX = function getScaleX(props) {
	var length = props.length,
	    _props$domain = props.domain,
	    domain = _props$domain === undefined ? '' : _props$domain,
	    data = props.data,
	    dataKey = props.dataKey;

	if (domain) {
		return d3.scale.linear().domain(domain).range([0, length]);
	} else {
		if (!data) console.error("you didn't add data");
		if (!dataKey) console.error("you didn't add dataKey");
		var xDomian = d3.max(data, function (d) {
			return d[dataKey];
		});
		return d3.scaleLinear().domain([0, xDomian]).range([0, length]);
	}
};
// 计算y轴的长度
var getScaleY = function getScaleY(props) {
	var length = props.length,
	    _props$domain2 = props.domain,
	    domain = _props$domain2 === undefined ? '' : _props$domain2,
	    data = props.data,
	    dataKey = props.dataKey;

	if (domain) {
		return d3.scale.linear().domain(domain).range([length, 0]);
	} else {
		if (!data) console.error("you didn't add data");
		if (!dataKey) console.error("you didn't add dataKey");
		var yDomain = 1.2 * d3.max(data, function (d) {
			return d[dataKey];
		});
		return d3.scaleLinear().domain([yDomain, 0]).range([0, length]);
	}
};

var Axis = function Axis(props) {
	var data = props.data,
	    _props$orient = props.orient,
	    orient = _props$orient === undefined ? 'bottom' : _props$orient,
	    _props$tickSize = props.tickSize,
	    tickSize = _props$tickSize === undefined ? null : _props$tickSize,
	    textAnchor = props.textAnchor,
	    unit = props.unit,
	    _props$tickFormat = props.tickFormat,
	    tickFormat = _props$tickFormat === undefined ? '' : _props$tickFormat,
	    _props$type = props.type,
	    type = _props$type === undefined ? 'x' : _props$type,
	    length = props.length,
	    _props$hide = props.hide,
	    hide = _props$hide === undefined ? false : _props$hide,
	    rest = _objectWithoutProperties(props, ['data', 'orient', 'tickSize', 'textAnchor', 'unit', 'tickFormat', 'type', 'length', 'hide']);

	var scale = type === 'x' ? getScaleX(props) : getScaleY(props);
	var ticks = type === 'x' ? scale.ticks(data.length) : scale.ticks(tickSize);
	var delta = Number(length / ticks.length);
	var path = orient === "bottom" ? 'M0.5,6V0.5H' + (length + 1.5 * delta) + 'V6' : 'M-6,' + length + 'H0.5V0.5H-6';
	return (0, _preact.h)(
		'g',
		_extends({}, rest, { fill: 'none' }),
		(0, _preact.h)('path', { 'class': hide ? _index2.default.hidden : _index2.default.show, stroke: props.stroke, d: path }),
		ticks.map(function (d) {
			var space = scale(d);
			if (orient === "bottom") {
				return (0, _preact.h)(
					'g',
					{ 'class': _index2.default.tick, opacity: '1', transform: 'translate( ' + (space + delta / 2) + ',0)' },
					(0, _preact.h)('line', { stroke: '#000', y2: '6' }),
					(0, _preact.h)(
						'text',
						{ 'text-anchor': textAnchor, fill: '#000', y: '9', dy: '0.71em' },
						d,
						unit
					)
				);
			} else {
				return (0, _preact.h)(
					'g',
					{ 'class': _index2.default.tick, opacity: '1', transform: 'translate(0,' + space + ' )' },
					(0, _preact.h)('line', { stroke: '#000', x2: '-6' }),
					(0, _preact.h)(
						'text',
						{ 'text-anchor': textAnchor, fill: '#000', x: '-9', dy: '0.32em' },
						d3.format(tickFormat)(d),
						unit
					)
				);
			}
		})
	);
};

exports.default = Axis;
//# sourceMappingURL=Axis.js.map