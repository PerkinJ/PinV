'use strict';

exports.__esModule = true;

var _class, _temp, _initialiseProps;

var _preact = require('preact');

var _common = require('../../common');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _DataSeries = require('./DataSeries');

var _DataSeries2 = _interopRequireDefault(_DataSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AreaChart = (_temp = _class = function (_Component) {
	_inherits(AreaChart, _Component);

	function AreaChart(props) {
		_classCallCheck(this, AreaChart);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			fill: _this.props.fill
		};
		return _this;
	}

	AreaChart.prototype.render = function render() {
		var props = this.props;

		var data = props.data;

		var interpolationType = props.interpolationType || (props.interpolate ? 'cardinal' : 'linear');

		var _getDimensions = this.getDimensions(),
		    innerWidth = _getDimensions.innerWidth,
		    innerHeight = _getDimensions.innerHeight,
		    trans = _getDimensions.trans,
		    svgMargins = _getDimensions.svgMargins;

		var yOrient = this.getYOrient();

		if (!Array.isArray(data)) {
			data = [data];
		}

		var yScale = d3.scaleLinear().range([innerHeight, 0]);

		var xValues = [];
		var yValues = [];
		var seriesNames = [];
		var yMaxValues = [];
		var domain = props.domain || {};
		var xDomain = domain.x || [];
		var yDomain = domain.y || [];
		data.forEach(function (series) {
			var upper = 0;
			seriesNames.push(series.name);
			series.values.forEach(function (val) {
				upper = Math.max(upper, props.yAccessor(val));
				xValues.push(props.xAccessor(val));
				yValues.push(props.yAccessor(val));
			});
			yMaxValues.push(upper);
		});

		var xScale = void 0;
		if (xValues.length > 0 && Object.prototype.toString.call(xValues[0]) === '[object Date]' && props.xAxisTickInterval) {
			xScale = d3.scaleTime().range([0, innerWidth]);
		} else {
			xScale = d3.scaleLinear().range([0, innerWidth]);
		}

		var xdomain = d3.extent(xValues);
		if (xDomain[0] !== undefined && xDomain[0] !== null) xdomain[0] = xDomain[0];
		if (xDomain[1] !== undefined && xDomain[1] !== null) xdomain[1] = xDomain[1];
		xScale.domain(xdomain);
		var ydomain = [0, d3.sum(yMaxValues)];
		if (yDomain[0] !== undefined && yDomain[0] !== null) ydomain[0] = yDomain[0];
		if (yDomain[1] !== undefined && yDomain[1] !== null) ydomain[1] = yDomain[1];
		yScale.domain(ydomain);

		props.colors.domain(seriesNames);

		var stack = d3.stack()
		// .keys((d)=>{
		// 	let data = []
		// 	data.push(props.xAccessor(d))
		// 	console.log('222',d,data)
		// 	return data
		// })
		// .value(props.yAccessor)
		.value(function (d) {
			return d.values;
		});

		var layers = stack(data);
		var dataSeries = layers.map(function (d, idx) {
			return (0, _preact.h)(_DataSeries2.default, {
				key: idx,
				seriesName: d.name,
				fill: props.colors(props.colorAccessor(d, idx)),
				index: idx,
				xScale: xScale,
				yScale: yScale,
				data: d.values,
				xAccessor: props.xAccessor,
				yAccessor: props.yAccessor,
				interpolationType: interpolationType,
				hoverAnimation: props.hoverAnimation
			});
		});
		return (0, _preact.h)(
			_common.Chart,
			{
				viewBox: this.getViewBox(),
				legend: props.legend,
				data: data,
				margins: props.margins,
				colors: props.colors,
				colorAccessor: props.colorAccessor,
				width: props.width,
				height: props.height,
				title: props.title
			},
			(0, _preact.h)(
				'g',
				{ transform: trans, className: props.className },
				(0, _preact.h)(_common.XAxis, {
					xAxisClassName: 'areachart-xaxis',
					xScale: xScale,
					xAxisTickValues: props.xAxisTickValues,
					xAxisTickInterval: props.xAxisTickInterval,
					xAxisTickCount: props.xAxisTickCount,
					xAxisLabel: props.xAxisLabel,
					xAxisLabelOffset: props.xAxisLabelOffset,
					tickFormatting: props.xAxisFormatter,
					xOrient: props.xOrient,
					yOrient: yOrient,
					margins: svgMargins,
					width: innerWidth,
					height: innerHeight,
					horizontalChart: props.horizontal,
					gridVertical: props.gridVertical,
					gridVerticalStroke: props.gridVerticalStroke,
					gridVerticalStrokeWidth: props.gridVerticalStrokeWidth,
					gridVerticalStrokeDash: props.gridVerticalStrokeDash
				}),
				(0, _preact.h)(_common.YAxis, {
					yAxisClassName: 'areachart-yaxis',
					yScale: yScale,
					yAxisTickValues: props.yAxisTickValues,
					yAxisTickInterval: props.yAxisTickInterval,
					yAxisTickCount: props.yAxisTickCount,
					yAxisLabel: props.yAxisLabel,
					yAxisLabelOffset: props.yAxisLabelOffset,
					tickFormatting: props.yAxisFormatter,
					xOrient: props.xOrient,
					yOrient: yOrient,
					margins: svgMargins,
					width: innerWidth,
					height: props.height,
					horizontalChart: props.horizontal,
					gridHorizontal: props.gridHorizontal,
					gridHorizontalStroke: props.gridHorizontalStroke,
					gridHorizontalStrokeWidth: props.gridHorizontalStrokeWidth,
					gridHorizontalStrokeDash: props.gridHorizontalStrokeDash
				}),
				dataSeries
			)
		);
	};

	return AreaChart;
}(_preact.Component), _class.defaultProps = {
	margins: { top: 10, right: 20, bottom: 40, left: 45 },
	yAxisTickCount: 4,
	interpolate: false,
	interpolationType: null,
	className: 'areachart',
	hoverAnimation: true,
	//CartesianChartProps
	axesColor: '#000',
	colors: d3.scaleOrdinal(d3.schemeCategory20),
	colorAccessor: function colorAccessor(d, idx) {
		return idx;
	},
	height: 200,
	horizontal: false,
	legend: false,
	legendOffset: 120,
	title: '',
	width: 400,
	// xAxisFormatter: no predefined value right now
	xAxisLabel: '',
	xAxisLabelOffset: 38,
	xAxisOffset: 0,
	// xAxisTickCount: no predefined value right now
	// xAxisTickInterval: no predefined value right now
	// xAxisTickValues: no predefined value right now
	xOrient: 'bottom',
	// yAxisFormatter: no predefined value right now
	yAxisLabel: '',
	yAxisLabelOffset: 35,
	yAxisOffset: 0,
	// yAxisTickCount: no predefined value right now
	// yAxisTickInterval: no predefined value right now
	// yAxisTickValues: no predefined value right now
	yOrient: 'default',
	// defaulr Accessor
	xAccessor: function xAccessor(d) {
		return d.x;
	},
	yAccessor: function yAccessor(d) {
		return d.y;
	}

}, _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.getViewBox = function () {
		if (_this2.props.viewBoxObject) {
			var v = _this2.props.viewBoxObject;
			return [v.x, v.y, v.width, v.height].join(' ');
		} else if (_this2.props.viewBox) {
			return _this2.props.viewBox;
		}
	};

	this.getDimensions = function () {
		var props = _this2.props;
		var horizontal = props.horizontal,
		    margins = props.margins,
		    viewBoxObject = props.viewBoxObject,
		    xOrient = props.xOrient,
		    xAxisOffset = props.xAxisOffset,
		    yAxisOffset = props.yAxisOffset;

		var yOrient = _this2.getYOrient();

		var width = void 0,
		    height = void 0;
		if (viewBoxObject) {
			width = viewBoxObject.width, height = viewBoxObject.height;
		} else {
			width = props.width, height = props.height;
		}

		var svgWidth = void 0,
		    svgHeight = void 0;
		var xOffset = void 0,
		    yOffset = void 0;
		var svgMargins = void 0;
		var trans = void 0;
		if (horizontal) {
			var center = width / 2;
			trans = 'rotate(90 ' + center + ' ' + center + ') ';
			svgWidth = height;
			svgHeight = width;
			svgMargins = {
				left: margins.top,
				top: margins.right,
				right: margins.bottom,
				bottom: margins.left
			};
		} else {
			trans = '';
			svgWidth = width;
			svgHeight = height;
			svgMargins = margins;
		}

		xAxisOffset = Math.abs(props.xAxisOffset || 0);
		yAxisOffset = Math.abs(props.yAxisOffset || 0);

		xOffset = svgMargins.left + (yOrient === 'left' ? yAxisOffset : 0);
		yOffset = svgMargins.top + (xOrient === 'top' ? xAxisOffset : 0);
		trans += 'translate(' + xOffset + ', ' + yOffset + ')';

		return {
			innerHeight: svgHeight - svgMargins.top - svgMargins.bottom - xAxisOffset,
			innerWidth: svgWidth - svgMargins.left - svgMargins.right - yAxisOffset,
			trans: trans,
			svgMargins: svgMargins
		};
	};

	this.getYOrient = function () {
		var yOrient = _this2.props.yOrient;

		if (yOrient === 'default') {
			return _this2.props.horizontal ? 'right' : 'left';
		}

		return yOrient;
	};
}, _temp);
exports.default = AreaChart;
//# sourceMappingURL=AreaChart.js.map