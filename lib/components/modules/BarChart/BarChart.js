'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

var _common = require('../../common');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import DataSeries from './DataSeries'

var BarChart = (_temp = _class = function (_Component) {
	_inherits(BarChart, _Component);

	function BarChart(props) {
		_classCallCheck(this, BarChart);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

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

	BarChart.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
		this.setState({
			changeState: false
		});
	};

	BarChart.prototype.getViewBox = function getViewBox() {
		if (this.props.viewBoxObject) {
			var v = this.props.viewBoxObject;
			return [v.x, v.y, v.width, v.height].join(' ');
		} else if (this.props.viewBox) {
			return this.props.viewBox;
		}
	};

	BarChart.prototype.getDimensions = function getDimensions() {
		var props = this.props;
		var horizontal = props.horizontal,
		    margins = props.margins,
		    viewBoxObject = props.viewBoxObject,
		    xOrient = props.xOrient,
		    xAxisOffset = props.xAxisOffset,
		    yAxisOffset = props.yAxisOffset;

		var yOrient = this.getYOrient();

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

	BarChart.prototype.onMouseOver = function onMouseOver(x, y, dataPoint) {
		if (!this.props.showTooltip) return;
		this.setState({
			tooltip: {
				x: x,
				y: y,
				child: this.props.tooltipFormat.call(this, dataPoint),
				show: true
			},
			changeState: true
		});
	};

	BarChart.prototype.onMouseLeave = function onMouseLeave() {
		if (!this.props.showTooltip) return;
		this.setState({
			tooltip: {
				x: 0,
				y: 0,
				child: '',
				show: false
			},
			changeState: true
		});
	};

	BarChart.prototype.getYOrient = function getYOrient() {
		var yOrient = this.props.yOrient;

		if (yOrient === 'default') {
			return this.props.horizontal ? 'right' : 'left';
		}

		return yOrient;
	};

	BarChart.prototype._getStackedValuesMaxY = function _getStackedValuesMaxY(_data) {
		var max = 0;
		d3.max(_data, function (d) {
			d3.max(d, function (val) {
				max = val > max ? val : max;
			});
		});
		return max;
	};

	BarChart.prototype._getStackedValuesMinY = function _getStackedValuesMinY(_data) {
		var min = 0;
		d3.min(_data, function (d) {
			d3.min(d, function (val) {
				min = val < min ? val : min;
			});
		});
		return min;
	};

	BarChart.prototype._getLabels = function _getLabels(series) {
		var data = [];
		series.forEach(function (d) {
			data.push(d.key);
		});
		return data;
	};

	BarChart.prototype._stack = function _stack() {
		// Only support columns with all positive or all negative values
		// https://github.com/mbostock/d3/issues/2265
		// let { stackOffset, xAccessor, yAccessor, valuesAccessor } = this.props
		return d3.stack().keys(["apples", "bananas", "cherries", "dates"]).order(d3.stackOrderNone).offset(d3.stackOffsetNone);
	};

	BarChart.prototype.render = function render() {

		var props = this.props;
		var yOrient = this.getYOrient();

		var _data = this._stack()(props.data);

		var _getDimensions = this.getDimensions(),
		    innerHeight = _getDimensions.innerHeight,
		    innerWidth = _getDimensions.innerWidth,
		    trans = _getDimensions.trans,
		    svgMargins = _getDimensions.svgMargins;

		var xScale = d3.scaleOrdinal().domain(this._getLabels(_data)).range([0, innerWidth], props.rangeRoundBandsPadding);
		var yScale = d3.scaleLinear().range([innerHeight, 0]).domain([Math.min(0, this._getStackedValuesMinY(_data[0])), this._getStackedValuesMaxY(_data[_data.length - 1])]);

		// let series = props.data.map((item) => item.name)

		return (0, _preact.h)(
			'span',
			null,
			(0, _preact.h)(
				_common.Chart,
				{
					viewBox: this.getViewBox(),
					legend: props.legend,
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
					{ transform: trans, className: props.chartClassName },
					(0, _preact.h)(_common.YAxis, {
						yAxisClassName: props.yAxisClassName,
						yAxisTickValues: props.yAxisTickValues,
						yAxisLabel: props.yAxisLabel,
						yAxisLabelOffset: props.yAxisLabelOffset,
						yScale: yScale,
						margins: svgMargins,
						yAxisTickCount: props.yAxisTickCount,
						tickFormatting: props.yAxisFormatter,
						width: innerWidth,
						height: innerHeight,
						horizontalChart: props.horizontal,
						xOrient: props.xOrient,
						yOrient: yOrient,
						gridHorizontal: props.gridHorizontal,
						gridHorizontalStroke: props.gridHorizontalStroke,
						gridHorizontalStrokeWidth: props.gridHorizontalStrokeWidth,
						gridHorizontalStrokeDash: props.gridHorizontalStrokeDash
					}),
					(0, _preact.h)(_common.XAxis, {
						xAxisClassName: props.xAxisClassName,
						xAxisTickValues: props.xAxisTickValues,
						xAxisLabel: props.xAxisLabel,
						xAxisLabelOffset: props.xAxisLabelOffset,
						xScale: xScale,
						margins: svgMargins,
						tickFormatting: props.xAxisFormatter,
						width: innerWidth,
						height: innerHeight,
						horizontalChart: props.horizontal,
						xOrient: props.xOrient,
						yOrient: yOrient,
						gridVertical: props.gridVertical,
						gridVerticalStroke: props.gridVerticalStroke,
						gridVerticalStrokeWidth: props.gridVerticalStrokeWidth,
						gridVerticalStrokeDash: props.gridVerticalStrokeDash
					})
				)
			),
			props.showTooltip ? (0, _preact.h)(_common.Tooltip, this.state.tooltip) : null
		);
	};

	return BarChart;
}(_preact.Component), _class.defaultProps = {
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
	xAccessor: function xAccessor(d) {
		return d.x;
	},
	yAccessor: function yAccessor(d) {
		return d.y;
	},
	showTooltip: true,
	tooltipFormat: function tooltipFormat(d) {
		return String(d.yValue);
	},
	chartClassName: 'rd3-barchart',
	hoverAnimation: true,
	margins: { top: 10, right: 20, bottom: 40, left: 45 },
	rangeRoundBandsPadding: 0.25,
	stackOffset: 'zero',
	valuesAccessor: function valuesAccessor(d) {
		return d.values;
	},
	xAxisClassName: 'rd3-barchart-xaxis',
	yAxisClassName: 'rd3-barchart-yaxis',
	yAxisTickCount: 4
}, _temp);
exports.default = BarChart;
//# sourceMappingURL=BarChart.js.map