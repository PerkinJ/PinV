'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _index = require('./index.css');

var _index2 = _interopRequireDefault(_index);

var _Tooltip = require('../../common/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StreamGraph = (_temp = _class = function (_Component) {
	_inherits(StreamGraph, _Component);

	function StreamGraph(props) {
		_classCallCheck(this, StreamGraph);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.handleMouseOver = function (e, value, index) {
			_this.setState({
				activeIdx: index,
				tooltip: {
					x: e.clientX + 20,
					y: e.clientY,
					child: _this.props.labels[index],
					show: true
				}
			});
		};

		_this.handleMouseOut = function () {
			_this.setState({
				activeIndex: -1,
				tooltip: {
					x: 0,
					y: 0,
					child: '',
					show: false
				}
			});
		};

		_this.state = {
			activeIdx: -1,
			tooltip: {}
		};
		return _this;
	}

	StreamGraph.prototype.componentDidMount = function componentDidMount() {};

	StreamGraph.prototype.render = function render(_ref, _ref2) {
		var _this2 = this;

		var width = _ref.width,
		    height = _ref.height,
		    padding = _ref.padding,
		    data = _ref.data,
		    colorRange = _ref.colorRange,
		    interactive = _ref.interactive,
		    labels = _ref.labels;
		var activeIdx = _ref2.activeIdx,
		    tooltip = _ref2.tooltip;

		// generate stack
		var stack = d3.stack().keys(d3.range(data[0].length)).offset(d3.stackOffsetWiggle),
		    layers = stack(data);
		var x = d3.scaleLinear().domain([0, layers[0].length - 1]).range([0, width]);

		var y = d3.scaleLinear().domain([d3.min(layers, stackMin), d3.max(layers, stackMax)]).range([height, 0]);
		// color choice
		var z = colorRange.length > 0 ? d3.scaleOrdinal().range(colorRange) : d3.interpolateRainbow;

		var area = d3.area().x(function (d, i) {
			return x(i);
		}).y0(function (d) {
			return y(d[0]);
		}).y1(function (d) {
			return y(d[1]);
		});

		function stackMax(layer) {
			return d3.max(layer, function (d) {
				return d[1];
			});
		}

		function stackMin(layer) {
			return d3.min(layer, function (d) {
				return d[0];
			});
		}
		return (0, _preact.h)(
			'div',
			null,
			labels.length > 0 && (0, _preact.h)(_Tooltip2.default, tooltip),
			(0, _preact.h)(
				'svg',
				{ width: width, height: height, ref: function ref(el) {
						return _this2.StreamGraph = el;
					} },
				(0, _preact.h)(
					'g',
					{ 'class': _index2.default.path, transform: 'translate(' + padding.left + ',' + padding.top + ')' },
					!!layers && layers.map(function (d, index) {
						return (0, _preact.h)('path', {
							style: { opacity: activeIdx === index ? 1 : 0.85 },
							key: index,
							'stroke-width': '1px',
							stroke: activeIdx === index ? "#fff" : '',
							d: area(d),
							fill: z((index + 1) / layers.length),
							onMouseOver: interactive ? function (e) {
								return _this2.handleMouseOver(e, layers, index);
							} : null,
							onMouseMove: interactive ? function (e) {
								return _this2.handleMouseOver(e, layers, index);
							} : null,
							onMouseOut: interactive ? _this2.handleMouseOut : null
						});
					})
				)
			)
		);
	};

	return StreamGraph;
}(_preact.Component), _class.defaultProps = {
	width: 660,
	height: 600,
	padding: { top: 20, right: 20, bottom: 30, left: 50 },
	colorRange: [],
	interactive: true,
	labels: []
}, _temp);
exports.default = StreamGraph;
//# sourceMappingURL=StreamGraph.js.map