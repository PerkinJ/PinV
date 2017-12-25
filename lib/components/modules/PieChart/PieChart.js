'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

var _utils = require('../../../utils/utils');

var _model = require('../../../utils/model');

var _Tooltip = require('../../basic/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var calculateArc = function calculateArc(value, arcProps) {
	return d3.arc().cornerRadius(arcProps.cornerRadius).innerRadius(arcProps.innerRadius).outerRadius(arcProps.outerRadius).startAngle(value.startAngle).endAngle(value.endAngle).padAngle(arcProps.padAngle);
};

var PieChart = function (_Component) {
	_inherits(PieChart, _Component);

	function PieChart(props) {
		_classCallCheck(this, PieChart);

		var _this2 = _possibleConstructorReturn(this, _Component.call(this, props));

		_this2.renderTooltip = function () {
			var _this2$props = _this2.props,
			    data = _this2$props.data,
			    dataKey = _this2$props.dataKey,
			    nameKey = _this2$props.nameKey,
			    startAngle = _this2$props.startAngle,
			    endAngle = _this2$props.endAngle,
			    _this2$props$unit = _this2$props.unit,
			    unit = _this2$props$unit === undefined ? '' : _this2$props$unit;

			var pieData = (0, _model.getPieData)(data, dataKey, startAngle, endAngle);

			var pieChart = d3.select(_this2.pieChart);
			var arcs = pieChart.selectAll('g').data(pieData);
			var _this = _this2;
			arcs.on('mouseover', function (d) {
				_this.setState({
					tooltip: d.data[nameKey] + ':' + d.data[dataKey] + unit,
					tooltipStyle: {
						left: d3.event.pageX,
						top: d3.event.clientY + 20,
						opacity: 0.9
					}
				});
			}).on('mousemove', function () {
				_this.setState({
					tooltipStyle: {
						left: d3.event.pageX,
						top: d3.event.clientY + 20,
						opacity: 0.9
					}
				});
			}).on('mouseout', function () {
				_this2.setState({
					tooltipStyle: {
						opacity: 0
					}
				});
			});
		};

		_this2.state = {
			tooltip: '',
			left: 0,
			top: 0
		};
		return _this2;
	}

	PieChart.prototype.componentDidUpdate = function componentDidUpdate() {
		this.renderTooltip();
	};

	PieChart.prototype.componentDidMount = function componentDidMount() {
		this.renderTooltip();
	};

	PieChart.prototype.render = function render(_ref, _ref2) {
		var _this3 = this;

		var _ref$width = _ref.width,
		    width = _ref$width === undefined ? 500 : _ref$width,
		    _ref$height = _ref.height,
		    height = _ref$height === undefined ? 500 : _ref$height,
		    _ref$startAngle = _ref.startAngle,
		    startAngle = _ref$startAngle === undefined ? 0 : _ref$startAngle,
		    _ref$endAngle = _ref.endAngle,
		    endAngle = _ref$endAngle === undefined ? 1 : _ref$endAngle,
		    cx = _ref.cx,
		    cy = _ref.cy,
		    innerRadius = _ref.innerRadius,
		    outerRadius = _ref.outerRadius,
		    cornerRadius = _ref.cornerRadius,
		    padAngle = _ref.padAngle,
		    textColor = _ref.textColor,
		    data = _ref.data,
		    dataKey = _ref.dataKey,
		    nameKey = _ref.nameKey;
		var tooltip = _ref2.tooltip,
		    tooltipStyle = _ref2.tooltipStyle;

		var pieData = (0, _model.getPieData)(data, dataKey, startAngle, endAngle);
		var arcProps = {
			innerRadius: innerRadius && innerRadius < outerRadius ? innerRadius : 0,
			outerRadius: outerRadius || width / 3,
			textColor: textColor || '#000',
			cx: cx || width / 2,
			cy: cy || height / 2,
			cornerRadius: cornerRadius || 0,
			padAngle: padAngle || 0
		};
		return (0, _preact.h)(
			'div',
			{ 'class': _index2.default.container },
			(0, _preact.h)(_Tooltip2.default, { tooltipStyle: tooltipStyle, content: tooltip }),
			(0, _preact.h)(
				'svg',
				{ ref: function ref(el) {
						return _this3.pieChart = el;
					}, width: width, height: height, 'class': _index2.default.chart },
				pieData.map(function (value, index, arr) {
					return (0, _preact.h)(Segment, _extends({}, arcProps, {
						index: index,
						arc: calculateArc(value, arcProps),
						label: data,
						length: arr.length,
						nameKey: nameKey,
						dataKey: dataKey
					}));
				})
			)
		);
	};

	return PieChart;
}(_preact.Component);

var Segment = function Segment(_ref3) {
	var cx = _ref3.cx,
	    cy = _ref3.cy,
	    arc = _ref3.arc,
	    index = _ref3.index,
	    label = _ref3.label,
	    innerRadius = _ref3.innerRadius,
	    outerRadius = _ref3.outerRadius,
	    textColor = _ref3.textColor,
	    length = _ref3.length,
	    nameKey = _ref3.nameKey,
	    dataKey = _ref3.dataKey;

	var colors = (0, _utils.colorGenerator)(length);
	var percent = Number(label[index][dataKey]) / d3.sum(label, function (d) {
		return d[dataKey];
	}) * 100;
	var text = label[index][nameKey];
	return (0, _preact.h)(
		'g',
		{ 'class': _index2.default.segment, transform: 'translate(' + cx + ', ' + cy + ')' },
		(0, _preact.h)('path', { 'class': _index2.default.path, d: arc(), fill: colors(index).toString() }),
		(0, _preact.h)(
			Label,
			{ textColor: textColor, arc: arc.innerRadius(innerRadius).outerRadius(outerRadius) },
			percent.toFixed(2) + '%'
		),
		(0, _preact.h)('line', {
			stroke: 'black',
			x1: arc.centroid()[0] * 2,
			y1: arc.centroid()[1] * 2,
			x2: arc.centroid()[0] * 2.2,
			y2: arc.centroid()[1] * 2.2
		}),
		(0, _preact.h)(
			'text',
			{
				fill: textColor,
				transform: 'translate(' + arc.centroid()[0] * 2.5 + ',' + arc.centroid()[1] * 2.5 + ')',
				'text-anchor': 'middle' },
			text
		)
	);
};

var Label = function Label(_ref4) {
	var children = _ref4.children,
	    arc = _ref4.arc,
	    textColor = _ref4.textColor;
	return (0, _preact.h)(
		'text',
		{ fill: textColor, transform: 'translate(' + arc.centroid() + ')', 'text-anchor': 'middle' },
		children
	);
};

exports.default = PieChart;
//# sourceMappingURL=PieChart.js.map