'use strict';

exports.__esModule = true;

var _class, _temp2;

var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _Legend = require('../Legend');

var _Legend2 = _interopRequireDefault(_Legend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LegendChart = (_temp2 = _class = function (_Component) {
	_inherits(LegendChart, _Component);

	function LegendChart() {
		var _temp, _this, _ret;

		_classCallCheck(this, LegendChart);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this._renderLegend = function () {
			var props = _this.props;

			if (props.legend) {
				return (0, _preact.h)(_Legend2.default, {
					colors: props.colors,
					colorAccessor: props.colorAccessor,
					data: props.data,
					legendPosition: props.legendPosition,
					margins: props.margins,
					width: props.sideOffset
				});
			}
		}, _this._renderTitle = function () {
			var props = _this.props;

			if (props.title !== '' && props.title !== null) {
				return (0, _preact.h)(
					'h4',
					{
						className: props.titleClassName
					},
					props.title
				);
			}
			return null;
		}, _this._renderChart = function () {
			var props = _this.props;

			return (0, _preact.h)(
				'svg',
				{
					className: props.svgClassName,
					height: '100%',
					viewBox: props.viewBox,
					width: '100%'
				},
				props.children
			);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	LegendChart.prototype.render = function render() {
		var props = this.props;

		return (0, _preact.h)(
			'div',
			{
				className: props.className,
				style: { 'width': props.width, 'height': props.height }
			},
			this._renderTitle(),
			(0, _preact.h)(
				'div',
				{ style: { display: 'table', width: '100%', height: '100%' } },
				(0, _preact.h)(
					'div',
					{ style: { display: 'table-cell' } },
					this._renderChart()
				),
				(0, _preact.h)(
					'div',
					{ style: { display: 'table-cell', width: props.sideOffset, 'verticalAlign': 'top' } },
					this._renderLegend()
				)
			)
		);
	};

	return LegendChart;
}(_preact.Component), _class.defaultProps = {
	className: 'rd3-legend-chart',
	colors: d3.scaleOrdinal(d3.schemeCategory20),
	colorAccessor: function colorAccessor(d, idx) {
		return idx;
	},
	data: [],
	legend: false,
	legendPosition: 'right',
	sideOffset: 100, // legend的长度
	svgClassName: 'rd3-chart',
	titleClassName: 'rd3-chart-title'
}, _temp2);
exports.default = LegendChart;
//# sourceMappingURL=LegendChart.js.map