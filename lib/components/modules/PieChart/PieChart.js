'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

var _common = require('../../common');

var _DataSeries = require('./DataSeries');

var _DataSeries2 = _interopRequireDefault(_DataSeries);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PieChart = (_temp = _class = function (_Component) {
	_inherits(PieChart, _Component);

	function PieChart(props) {
		_classCallCheck(this, PieChart);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.onMouseOver = function (x, y, dataPoint) {
			if (!_this.props.showTooltip) return;
			_this.setState({
				tooltip: {
					x: x,
					y: y,
					child: _this.props.tooltipFormat.call(_this, dataPoint, _this.props.unit ? _this.props.unit : ''),
					show: true
				},
				changeState: true
			});
		};

		_this.onMouseLeave = function () {
			if (!_this.props.showTooltip) return;
			_this.setState({
				tooltip: {
					x: 0,
					y: 0,
					child: '',
					show: false
				},
				changeState: true
			});
		};

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

	PieChart.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
		this.setState({
			changeState: false
		});
	};
	// tooltip mouseover


	PieChart.prototype.render = function render() {
		var props = this.props;
		var transform = 'translate(' + (props.cx || props.width / 2) + ',' + (props.cy || props.height / 2) + ')';

		var values = props.data.map(function (item) {
			return item.value;
		});
		var labels = props.data.map(function (item) {
			return item.label;
		});
		return (0, _preact.h)(
			'span',
			null,
			(0, _preact.h)(
				_common.Chart,
				{
					width: props.width,
					height: props.height,
					title: props.title,
					shouldUpdate: !this.state.changeState
				},
				(0, _preact.h)(
					'g',
					{ className: 'piechart' },
					(0, _preact.h)(_DataSeries2.default, {
						labelTextFill: props.labelTextFill,
						valueTextFill: props.valueTextFill,
						valueTextFormatter: props.valueTextFormatter,
						data: props.data,
						values: values,
						labels: labels,
						colors: props.colors,
						colorAccessor: props.colorAccessor,
						transform: transform,
						width: props.width,
						height: props.height,
						radius: props.radius,
						innerRadius: props.innerRadius,
						showInnerLabels: props.showInnerLabels,
						showOuterLabels: props.showOuterLabels,
						sectorBorderColor: props.sectorBorderColor,
						hoverAnimation: props.hoverAnimation,
						onMouseOver: this.onMouseOver,
						onMouseLeave: this.onMouseLeave
					})
				)
			),
			props.showTooltip ? (0, _preact.h)(_common.Tooltip, this.state.tooltip) : null
		);
	};

	return PieChart;
}(_preact.Component), _class.defaultProps = {
	data: [],
	title: '',
	colors: d3.scaleOrdinal(d3.schemeCategory10),
	colorAccessor: function colorAccessor(d, idx) {
		return idx;
	},
	valueTextFormatter: function valueTextFormatter(val) {
		return val + '%';
	},
	hoverAnimation: true,
	// default tooltip
	showTooltip: true,
	tooltipFormat: function tooltipFormat(d) {
		return d.seriesName + ':' + d.yValue;
	}
}, _temp);
exports.default = PieChart;
//# sourceMappingURL=PieChart.js.map