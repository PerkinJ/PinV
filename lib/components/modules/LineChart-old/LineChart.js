'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _Axis = require('../../basic/Axis');

var _Axis2 = _interopRequireDefault(_Axis);

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

var _Circles = require('../../basic/Circles');

var _Circles2 = _interopRequireDefault(_Circles);

var _Tooltip = require('../../basic/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineChart = (_temp = _class = function (_Component) {
	_inherits(LineChart, _Component);

	function LineChart(props) {
		_classCallCheck(this, LineChart);

		var _this2 = _possibleConstructorReturn(this, _Component.call(this, props));

		_this2.renderData = function () {
			var _this2$props = _this2.props,
			    width = _this2$props.width,
			    height = _this2$props.height,
			    padding = _this2$props.padding,
			    data = _this2$props.data,
			    XAxis = _this2$props.XAxis,
			    YAxis = _this2$props.YAxis;

			var dWidth = width - padding.left - padding.right - data.length / 2,
			    // 这里要减去每个circle的半径
			dHeight = height - padding.top - padding.bottom;

			var xDomain = d3.max(data, function (d) {
				return d[XAxis];
			}),
			    yDomain = d3.max(data, function (d) {
				return d[YAxis];
			});
			var scaleX = d3.scaleLinear().domain([0, xDomain]).range([0, dWidth]);
			var scaleY = d3.scaleLinear().domain([0, yDomain]).range([dHeight, padding.bottom]);
			var lineChart = d3.select(_this2.lineChart);
			var rect = lineChart.selectAll('rect');

			var _this = _this2;

			rect.on('mouseover', function () {
				var mouseX = d3.mouse(this)[0] - padding.left;
				// 通过比例尺的反函数计算原数据中的值
				var x0 = scaleX.invert(mouseX);
				// x0取值应该在[0,xDomain]之间
				x0 = x0 < 0 ? 0 : x0 >= xDomain ? xDomain : Number(Math.round(x0));
				// 查找元素组中x0的值，并返回索引
				var bisect = d3.bisector(function (d) {
					return d[XAxis];
				}).left;
				var index = bisect(data, x0);

				var x1 = data[index][XAxis],
				    y1 = data[index][YAxis];
				_this.setState({
					content: XAxis + '  ' + x1 + ' : ' + YAxis + '  ' + y1,
					tooltipStyle: {
						left: d3.event.pageX,
						top: d3.event.clientY + 20,
						opacity: 0.9
					},
					circleStyle: {
						style: { display: 'none' }
					},
					vLineStyle: {
						style: { display: 'none' }
					},
					hLineStyle: {
						style: { display: 'none' }
					}
				});
			}).on('mouseout', function () {
				_this2.setState({
					tooltipStyle: {
						opacity: 0
					},
					circleStyle: {
						style: { display: 'none' }
					},
					vLineStyle: {
						style: { display: 'none' }
					},
					hLineStyle: {
						style: { display: 'none' }
					}
				});
			}).on('mousemove', function () {
				var mouseX = d3.mouse(this)[0] - padding.left;

				// 通过比例尺的反函数计算原数据中的值
				var x0 = scaleX.invert(mouseX);
				// x0取值应该在[0,xDomain]之间
				x0 = x0 < 0 ? 0 : x0 >= xDomain ? xDomain : Number(Math.round(x0));
				// 查找元素组中x0的值，并返回索引
				var bisect = d3.bisector(function (d) {
					return d[XAxis];
				}).left;
				var index = bisect(data, x0);

				var x1 = data[index][XAxis],
				    y1 = data[index][YAxis];
				var focusX = scaleX(x1) + padding.left + 11,
				    focusY = scaleY(y1) + padding.top;

				_this.setState({
					content: XAxis + '  ' + x1 + ' : ' + YAxis + '  ' + y1,
					tooltipStyle: {
						left: d3.event.pageX,
						top: d3.event.clientY + 20,
						opacity: 0.9
					},
					circleStyle: {
						style: { display: 'block' },
						transform: 'translate(' + focusX + ',' + focusY + ')'
					},
					vLineStyle: {
						style: { display: 'block' },
						x1: focusX,
						y1: focusY,
						x2: focusX,
						y2: height - padding.bottom
					},
					hLineStyle: {
						x1: focusX,
						y1: focusY,
						x2: padding.left,
						y2: focusY
					}
				});
			});
		};

		_this2.state = {
			circleStyle: {
				style: { display: 'none' }
			},
			vLineStyle: {
				style: { display: 'none' }
			},
			hLineStyle: {
				style: { display: 'none' }
			}
		};
		return _this2;
	}

	LineChart.prototype.componentDidMount = function componentDidMount() {
		this.renderData();
	};

	LineChart.prototype.componentDidUpdate = function componentDidUpdate() {
		this.renderData();
	};
	// 主要处理不同数据下，focusLine以及focusCircle的位置以及样式


	LineChart.prototype.render = function render(props, _ref) {
		var _this3 = this;

		var content = _ref.content,
		    tooltipStyle = _ref.tooltipStyle,
		    circleStyle = _ref.circleStyle,
		    vLineStyle = _ref.vLineStyle,
		    hLineStyle = _ref.hLineStyle;
		var interactive = props.interactive,
		    width = props.width,
		    height = props.height,
		    padding = props.padding,
		    data = props.data,
		    XAxis = props.XAxis,
		    YAxis = props.YAxis,
		    _props$tickSize = props.tickSize,
		    tickSize = _props$tickSize === undefined ? 5 : _props$tickSize,
		    tickFormat = props.tickFormat,
		    stroke = props.stroke,
		    shape = props.shape,
		    circleProps = props.circleProps,
		    tipLineProps = props.tipLineProps,
		    circleStroke = props.circleStroke;

		var dWidth = width - padding.left - padding.right - data.length / 2,
		    // 这里要减去每个circle的半径
		dHeight = height - padding.top - padding.bottom;

		var xDomain = d3.max(data, function (d) {
			return d[XAxis];
		}),
		    yDomain = d3.max(data, function (d) {
			return d[YAxis];
		});
		var scaleX = d3.scaleLinear().domain([0, xDomain]).range([0, dWidth]);
		var scaleY = d3.scaleLinear().domain([0, yDomain]).range([dHeight, padding.bottom]);
		var linePath = d3.line().x(function (d) {
			return scaleX(d[XAxis]);
		}).y(function (d) {
			return scaleY(d[YAxis]);
		}).curve(d3[shape]);
		var lineProps = {
			stroke: stroke,
			fill: 'none',
			d: linePath(data),
			transform: 'translate(' + (padding.left + 10) + ',' + padding.top + ')'
		};
		var rectProps = {
			width: width - padding.left,
			height: height - padding.top - padding.bottom,
			transform: 'translate(' + padding.left + ',' + padding.top + ')'
			// v4与v3的区别 v3的interpolate不再使用  https://github.com/d3/d3-shape/blob/master/README.md#curves
		};return (0, _preact.h)(
			'div',
			{ 'class': _index2.default.container },
			(0, _preact.h)(_Tooltip2.default, {
				content: content,
				tooltipStyle: tooltipStyle
			}),
			(0, _preact.h)(
				'svg',
				{ ref: function ref(el) {
						return _this3.lineChart = el;
					}, width: width + padding.left + padding.right, height: height + padding.top + padding.bottom },
				(0, _preact.h)(_Axis2.default, {
					hidden: false,
					type: 'x',
					dataKey: 'key',
					data: data,
					length: dWidth,
					orient: 'bottom',
					stroke: stroke,
					textAnchor: 'middle',
					'class': _index2.default.axis,
					transform: 'translate(' + padding.left + ',' + (height - padding.top) + ' )' }),
				(0, _preact.h)(_Axis2.default, {
					hidden: false,
					type: 'y',
					dataKey: 'value',
					data: data,
					length: dHeight,
					orient: 'left',
					tickSize: tickSize,
					tickFormat: tickFormat,
					textAnchor: 'end',
					stroke: stroke,
					'class': _index2.default.axis,
					transform: 'translate(' + padding.left + ',' + padding.top + ')' }),
				(0, _preact.h)('path', _extends({ 'class': _index2.default.line }, lineProps)),
				(0, _preact.h)(
					'g',
					{ transform: 'translate(' + (padding.left - props.r) + ',0)' },
					(0, _preact.h)(_Circles2.default, _extends({
						xScale: scaleX,
						yScale: scaleY
					}, props, {
						fill: '#fff',
						circleStroke: circleStroke
					}))
				),
				interactive && (0, _preact.h)('rect', _extends({ 'class': _index2.default.overlay }, rectProps)),
				(0, _preact.h)(
					'g',
					_extends({ 'class': 'focusCircle' }, circleStyle),
					(0, _preact.h)('circle', circleProps)
				),
				(0, _preact.h)(
					'g',
					{ 'class': 'focusLine' },
					(0, _preact.h)('line', _extends({ 'stroke-dasharray': '3' }, tipLineProps, vLineStyle)),
					(0, _preact.h)('line', _extends({ 'stroke-dasharray': '3' }, tipLineProps, hLineStyle))
				)
			)
		);
	};

	return LineChart;
}(_preact.Component), _class.defaultProps = {
	width: 600,
	height: 400,
	padding: { top: 32, bottom: 32, left: 20, right: 20 },
	// left: 40,
	tickSize: 5,
	tickFormat: '',
	stroke: '#673ab7',
	shape: 'curveCardinal',
	r: 3,
	interactive: true, // 是否显示交互的效果
	color: 'rgb(255,0,0)',
	circleProps: { //circle的style属性
		r: 5,
		fill: '#666'
	},
	tipLineProps: { //两条虚线的公共样式
		stroke: '#666'
	},
	circleStroke: null
}, _temp);
exports.default = LineChart;
//# sourceMappingURL=LineChart.js.map