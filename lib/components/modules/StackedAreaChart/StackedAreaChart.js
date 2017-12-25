'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StackedAreaChart = (_temp = _class = function (_Component) {
	_inherits(StackedAreaChart, _Component);

	function StackedAreaChart(props) {
		_classCallCheck(this, StackedAreaChart);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.renderData = function () {
			var _this$props = _this.props,
			    width = _this$props.width,
			    height = _this$props.height,
			    padding = _this$props.padding;

			var stackedAreaChart = d3.select(_this.stackedAreaChart),
			    chartWidth = width - padding.left - padding.right,
			    chartHeight = height - padding.top - padding.bottom;

			var parseDate = d3.timeParse("%Y %b %d");

			var x = d3.scaleTime().range([0, chartWidth]),
			    y = d3.scaleLinear().range([chartHeight, 0]),
			    z = d3.scaleOrdinal(d3.schemeCategory10);

			var stack = d3.stack();

			var area = d3.area().x(function (d) {
				return x(d.data.date);
			}).y0(function (d) {
				return y(d[0]);
			}).y1(function (d) {
				return y(d[1]);
			});

			var g = stackedAreaChart.append("g").attr("transform", "translate(" + padding.left + "," + padding.top + ")");

			d3.tsv("../../../demo/mock/stackedArea.tsv", type, function (error, data) {
				if (error) throw error;

				var keys = data.columns.slice(1);

				x.domain(d3.extent(data, function (d) {
					return d.date;
				}));
				z.domain(keys);
				stack.keys(keys);

				var layer = g.selectAll(".layer").data(stack(data)).enter().append("g").attr("class", "layer");

				layer.append("path").attr("class", "area").style("fill", function (d) {
					return z(d.key);
				}).attr("d", area);

				layer.filter(function (d) {
					return d[d.length - 1][1] - d[d.length - 1][0] > 0.01;
				}).append("text").attr("x", chartWidth - 6).attr("y", function (d) {
					return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2);
				}).attr("dy", ".35em").style("font", "10px sans-serif").style("text-anchor", "end").text(function (d) {
					return d.key;
				});

				g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + chartHeight + ")").call(d3.axisBottom(x));

				g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y).ticks(10, "%"));

				_this.setState({
					data: data,
					stackData: stack(data)
				});
			});

			function type(d, i, columns) {
				d.date = parseDate(d.date);
				for (var _i = 1, n = columns.length; _i < n; ++_i) {
					d[columns[_i]] = d[columns[_i]] / 100;
				}return d;
			}
		};

		return _this;
	}

	StackedAreaChart.prototype.componentDidMount = function componentDidMount() {
		this.renderData();
	};

	StackedAreaChart.prototype.render = function render(_ref, _ref2) {
		var _this2 = this;

		var width = _ref.width,
		    height = _ref.height,
		    padding = _ref.padding;
		var stackData = _ref2.stackData;

		var stackedAreaChartProps = {
			width: width,
			height: height
		};
		var chartWidth = width - padding.left - padding.right,
		    chartHeight = height - padding.top - padding.bottom;

		var x = d3.scaleTime().range([0, chartWidth]),
		    y = d3.scaleLinear().range([chartHeight, 0]),
		    z = d3.scaleOrdinal(d3.schemeCategory10);

		var area = d3.area().x(function (d) {
			return x(d.data.date);
		}).y0(function (d) {
			return y(d[0]);
		}).y1(function (d) {
			return y(d[1]);
		});
		return (0, _preact.h)(
			'div',
			null,
			(0, _preact.h)(
				'svg',
				_extends({ ref: function ref(el) {
						return _this2.stackedAreaChart = el;
					} }, stackedAreaChartProps),
				(0, _preact.h)(
					'g',
					{ transfrom: 'translate(' + padding.left + ',' + padding.top },
					!!stackData && stackData.map(function (d, index) {
						return (0, _preact.h)(
							'g',
							{ 'class': 'layer', key: index },
							(0, _preact.h)('path', { 'class': 'area', d: area(d), style: { fill: z(d.key) } })
						);
					})
				)
			)
		);
	};

	return StackedAreaChart;
}(_preact.Component), _class.defaultProps = {
	width: 660,
	height: 600,
	padding: { top: 20, right: 20, bottom: 30, left: 50 }
}, _temp);
exports.default = StackedAreaChart;
//# sourceMappingURL=StackedAreaChart.js.map