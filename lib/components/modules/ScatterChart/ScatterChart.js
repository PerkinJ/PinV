'use strict';

exports.__esModule = true;

var _class, _temp, _initialiseProps;

var _preact = require('preact');

var _common = require('../../common');

var _DataSeries = require('./DataSeries');

var _DataSeries2 = _interopRequireDefault(_DataSeries);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _utils = require('../../../utils/utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineChart = (_temp = _class = function (_Component) {
	_inherits(LineChart, _Component);

	function LineChart(props) {
		_classCallCheck(this, LineChart);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			tooltip: {
				x: 0,
				y: 0,
				child: '',
				show: false
			},
			changeState: false
		};
		return _this;
	}

	LineChart.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
		this.setState({
			changeState: false
		});
	};
	// tooltip mouseover


	LineChart.prototype._calculateScales = function _calculateScales() {
		return _utils.calculateScales.apply(undefined, arguments);
	};
	// certetisian


	LineChart.prototype.render = function render() {
		var props = this.props;
		if (this.props.data && this.props.data.length < 1) {
			return null;
		}

		var _getDimensions = this.getDimensions(),
		    innerWidth = _getDimensions.innerWidth,
		    innerHeight = _getDimensions.innerHeight,
		    trans = _getDimensions.trans,
		    svgMargins = _getDimensions.svgMargins;

		var yOrient = this.getYOrient();
		var domain = props.domain || {};

		if (!Array.isArray(props.data)) {
			props.data = [props.data];
		}

		// Returns an object of flattened allValues, xValues, and yValues
		var flattenedData = (0, _utils.flattenData)(props.data, props.xAccessor, props.yAccessor);

		var allValues = flattenedData.allValues,
		    xValues = flattenedData.xValues,
		    yValues = flattenedData.yValues;
		var scales = this._calculateScales(innerWidth, innerHeight, xValues, yValues, domain.x, domain.y);
		return (0, _preact.h)(
			'span',
			{ onMouseLeave: this.onMouseLeave },
			(0, _preact.h)(
				_common.Chart,
				{
					viewBox: this.getViewBox(),
					legend: props.legend,
					sideOffset: props.sideOffset,
					legendPosition: props.legendPosition,
					data: props.data,
					margins: props.margins,
					colors: props.colors,
					colorAccessor: props.colorAccessor,
					width: props.width,
					height: props.height,
					title: props.title,
					shouldUpdate: !this.state.changeState
				},
				(0, _preact.h)(
					'g',
					{ transform: trans, className: props.className },
					(0, _preact.h)(_common.XAxis, {
						xAxisClassName: props.xAxisClassName,
						strokeWidth: props.xAxisStrokeWidth,
						xAxisTickValues: props.xAxisTickValues,
						xAxisTickInterval: props.xAxisTickInterval,
						xAxisOffset: props.xAxisOffset,
						xScale: scales.xScale,
						xAxisLabel: props.xAxisLabel,
						xAxisLabelOffset: props.xAxisLabelOffset,
						tickFormatting: props.xAxisFormatter,
						xOrient: props.xOrient,
						yOrient: yOrient,
						data: props.data,
						margins: svgMargins,
						width: innerWidth,
						height: innerHeight,
						horizontalChart: props.horizontal,
						stroke: props.axesColor,
						tickStroke: props.tickStroke,
						tickTextStroke: props.tickTextStroke,
						textColor: props.textColor,
						gridVertical: props.gridVertical,
						gridVerticalStroke: props.gridVerticalStroke,
						gridVerticalStrokeWidth: props.gridVerticalStrokeWidth,
						gridVerticalStrokeDash: props.gridVerticalStrokeDash
					}),
					(0, _preact.h)(_common.YAxis, {
						yAxisClassName: props.yAxisClassName,
						strokeWidth: props.yAxisStrokeWidth,
						yScale: scales.yScale,
						yAxisTickValues: props.yAxisTickValues,
						yAxisTickCount: props.yAxisTickCount,
						yAxisOffset: props.yAxisOffset,
						yAxisLabel: props.yAxisLabel,
						yAxisLabelOffset: props.yAxisLabelOffset,
						tickFormatting: props.yAxisFormatter,
						xOrient: props.xOrient,
						yOrient: yOrient,
						margins: svgMargins,
						width: innerWidth,
						height: innerHeight,
						horizontalChart: props.horizontal,
						stroke: props.axesColor,
						tickStroke: props.tickStroke,
						textColor: props.textColor,
						tickTextStroke: props.tickTextStroke,
						gridHorizontal: props.gridHorizontal,
						gridHorizontalStroke: props.gridHorizontalStroke,
						gridHorizontalStrokeWidth: props.gridHorizontalStrokeWidth,
						gridHorizontalStrokeDash: props.gridHorizontalStrokeDash
					}),
					(0, _preact.h)(_DataSeries2.default, {
						xScale: scales.xScale,
						yScale: scales.yScale,
						xAccessor: props.xAccessor,
						yAccessor: props.yAccessor,
						hoverAnimation: props.hoverAnimation,
						circleRadius: props.circleRadius,
						data: props.data,
						value: allValues,
						interpolationType: props.interpolationType,
						colors: props.colors,
						colorAccessor: props.colorAccessor,
						width: innerWidth,
						height: innerHeight,
						onMouseOver: this.onMouseOver,
						onMouseLeave: this.onMouseLeave
					})
				)
			),
			props.showTooltip ? (0, _preact.h)(_common.Tooltip, this.state.tooltip) : null
		);
	};

	return LineChart;
}(_preact.Component), _class.defaultProps = {
	circleRadius: 3,
	className: 'rd3-linechart',
	hoverAnimation: true,
	margins: { top: 10, right: 20, bottom: 50, left: 45 },
	xAxisClassName: 'rd3-linechart-xaxis',
	yAxisClassName: 'rd3-linechart-yaxis',
	// default asccessor
	xAccessor: function xAccessor(d) {
		return d.x;
	},
	yAccessor: function yAccessor(d) {
		return d.y;
	},
	// default cartesian
	axesColor: '#673ab7',
	tickTextStroke: '#673ab7',
	tickStroke: '#673ab7',
	textColor: '#673ab7',
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
	xAxisLabel: '',
	xAxisLabelOffset: 38,
	xAxisOffset: 0,
	xOrient: 'bottom',
	yAxisLabel: '',
	yAxisLabelOffset: 35,
	yAxisOffset: 0,
	yOrient: 'default',
	// default tooltip
	showTooltip: true,
	tooltipFormat: function tooltipFormat(d, x, y) {
		return x + ':' + String(d.xValue) + ',' + y + ':' + String(d.yValue);
	},
	circleRadiusMultiplier: 1.5,
	shadeMultiplier: 0.2

}, _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.onMouseOver = function (x, y, dataPoint) {
		if (!_this2.props.showTooltip) return;
		_this2.setState({
			tooltip: {
				x: x,
				y: y,
				child: _this2.props.tooltipFormat.call(_this2, dataPoint, _this2.props.xAxisLabel ? _this2.props.xAxisLabel : 'x', _this2.props.yAxisLabel ? _this2.props.yAxisLabel : 'y'),
				show: true
			},
			changeState: true
		});
	};

	this.onMouseLeave = function () {
		if (!_this2.props.showTooltip) return;
		_this2.setState({
			tooltip: {
				x: 0,
				y: 0,
				child: '',
				show: false
			},
			changeState: true
		});
	};

	this.getYOrient = function () {
		var yOrient = _this2.props.yOrient;

		if (yOrient === 'default') {
			return _this2.props.horizontal ? 'right' : 'left';
		}

		return yOrient;
	};

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
}, _temp);
exports.default = LineChart;
//# sourceMappingURL=ScatterChart.js.map