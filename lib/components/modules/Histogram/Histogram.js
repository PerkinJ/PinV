'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _Axis = require('../../basic/Axis');

var _Axis2 = _interopRequireDefault(_Axis);

var _Tooltip = require('../../common/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _utils = require('../../../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Histogram = (_temp = _class = function (_Component) {
	_inherits(Histogram, _Component);

	function Histogram(props) {
		_classCallCheck(this, Histogram);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.handleMouseOver = function (e, value, index) {
			var _this$props = _this.props,
			    XAxis = _this$props.XAxis,
			    YAxis = _this$props.YAxis;

			e = e || window.event;
			_this.setState({
				tooltip: {
					x: e.screenX + 10,
					y: e.screenY - 140,
					child: XAxis + '  ' + value[XAxis] + ' : ' + YAxis + '  ' + value[YAxis],
					show: true
				},
				activeIdx: index
			});
		};

		_this.handleMouseOut = function () {
			_this.setState({
				tooltip: {
					x: 0,
					y: 0,
					child: '',
					show: false
				},
				activeIdx: '0'
			});
		};

		_this.state = {
			content: 'test',
			tooltipStyle: { left: 0, top: 0 },
			activeIdx: null
		};
		return _this;
	}

	Histogram.prototype.componentDidMount = function componentDidMount() {
		(0, _utils.addEvent)(this.rectContainer, 'mouseleave', this.handleMouseOut);
	};

	Histogram.prototype.componentWillUnmount = function componentWillUnmount() {
		(0, _utils.removeEvent)(this.rectContainer, 'mouseleave', this.handleMouseOut);
	};

	Histogram.prototype.render = function render(_ref, _ref2) {
		var _this2 = this;

		var data = _ref.data,
		    padding = _ref.padding,
		    width = _ref.width,
		    height = _ref.height,
		    XAxis = _ref.XAxis,
		    YAxis = _ref.YAxis,
		    tickSize = _ref.tickSize,
		    tickFormat = _ref.tickFormat,
		    stroke = _ref.stroke,
		    interactive = _ref.interactive;
		var tooltip = _ref2.tooltip,
		    activeIdx = _ref2.activeIdx;

		var dWidth = width - padding.left - padding.right - data.length / 2,
		    dHeight = height - padding.top - padding.bottom;
		var xDomain = d3.max(data, function (d) {
			return d[XAxis];
		}),
		    yDomain = d3.max(data, function (d) {
			return d[YAxis];
		});
		var scaleX = d3.scaleLinear().domain([0, xDomain]).range([0, dWidth]);
		var scaleY = d3.scaleLinear().domain([0, yDomain]).range([dHeight, padding.bottom]);
		var color = d3.scaleOrdinal(d3.schemeCategory10);

		return (0, _preact.h)(
			'div',
			null,
			(0, _preact.h)(_Tooltip2.default, tooltip),
			(0, _preact.h)(
				'svg',
				{ width: width + padding.left + padding.right, height: height + padding.top + padding.bottom },
				(0, _preact.h)(_Axis2.default, {
					type: 'x',
					dataKey: XAxis,
					data: data,
					length: dWidth,
					stroke: stroke,
					orient: 'bottom',
					textAnchor: 'middle',
					transform: 'translate(' + padding.left + ',' + (dHeight + padding.top) + ')' }),
				(0, _preact.h)(_Axis2.default, {
					type: 'y',
					dataKey: YAxis,
					length: dHeight,
					data: data,
					stroke: stroke,
					orient: 'left',
					tickSize: tickSize,
					tickFormat: tickFormat,
					textAnchor: 'end',
					transform: 'translate(' + padding.left + ' ,' + padding.top + ')' }),
				(0, _preact.h)(
					'g',
					{ ref: function ref(el) {
							return _this2.rectContainer = el;
						} },
					data.map(function (d, index) {
						var width = dWidth / data.length;
						// 	这里为了交互效果，增加了一个蒙层rect
						return (0, _preact.h)(
							'g',
							null,
							(0, _preact.h)('rect', {
								key: index + 1,
								ref: function ref(el) {
									return _this2.rect = el;
								},
								width: width,
								height: dHeight - scaleY(d.value),
								transform: 'translate(' + (scaleX(d.key) + padding.left) + ',' + (scaleY(d.value) + padding.top) + ')',
								fill: color(d.value) }),
							(0, _preact.h)('rect', {
								key: index + 1 //这里主要为了让activeIdx有一个默认的0为初始值
								, onMouseOver: interactive ? function (e) {
									return _this2.handleMouseOver(e, d, index);
								} : null,
								onMouseMove: interactive ? function (e) {
									return _this2.handleMouseOver(e, d, index);
								} : null,
								width: width + 2,
								height: dHeight,
								fill: '#000',
								style: { opacity: activeIdx === index ? '0.15' : '0' },
								transform: 'translate(' + (scaleX(d.key) + padding.left - 1) + ',' + padding.top + ')' })
						);
					})
				)
			)
		);
	};

	return Histogram;
}(_preact.Component), _class.defaultProps = {
	width: 600,
	height: 400,
	padding: { top: 32, bottom: 32, left: 20, right: 20 },
	// left: 40,
	tickSize: 5,
	tickFormat: '',
	stroke: '#673ab7',
	interactive: true
}, _temp);
exports.default = Histogram;
//# sourceMappingURL=Histogram.js.map