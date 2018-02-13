'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _AxisTicks = require('./AxisTicks');

var _AxisTicks2 = _interopRequireDefault(_AxisTicks);

var _AxisLine = require('./AxisLine');

var _AxisLine2 = _interopRequireDefault(_AxisLine);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XAxis = (_temp = _class = function (_Component) {
	_inherits(XAxis, _Component);

	function XAxis() {
		_classCallCheck(this, XAxis);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	XAxis.prototype.render = function render() {
		var props = this.props;

		var t = 'translate(0 ,' + (props.xAxisOffset + props.height) + ')';

		var tickArguments = void 0;
		if (typeof props.xAxisTickCount !== 'undefined') {
			tickArguments = [props.xAxisTickCount];
		}

		if (typeof props.xAxisTickInterval !== 'undefined') {
			tickArguments = [d3.timeFormat[props.xAxisTickInterval.unit], props.xAxisTickInterval.interval];
		}

		return (0, _preact.h)(
			'g',
			{
				className: props.xAxisClassName,
				transform: t
			},
			(0, _preact.h)(_AxisTicks2.default, {
				tickValues: props.xAxisTickValues,
				tickFormatting: props.tickFormatting,
				tickArguments: tickArguments,
				tickStroke: props.tickStroke,
				tickTextStroke: props.tickTextStroke,
				innerTickSize: props.tickSize,
				scale: props.xScale,
				orient: props.xOrient,
				orient2nd: props.yOrient,
				height: props.height,
				width: props.width,
				horizontalChart: props.horizontalChart,
				gridVertical: props.gridVertical,
				gridVerticalStroke: props.gridVerticalStroke,
				gridVerticalStrokeWidth: props.gridVerticalStrokeWidth,
				gridVerticalStrokeDash: props.gridVerticalStrokeDash
			}),
			(0, _preact.h)(_AxisLine2.default, _extends({
				scale: props.xScale,
				stroke: props.stroke,
				orient: props.xOrient,
				outerTickSize: props.tickSize
			}, props)),
			(0, _preact.h)(_Label2.default, {
				horizontalChart: props.horizontalChart,
				label: props.xAxisLabel,
				offset: props.xAxisLabelOffset,
				orient: props.xOrient,
				margins: props.margins,
				width: props.width,
				textColor: props.textColor
			})
		);
	};

	return XAxis;
}(_preact.Component), _class.defaultProps = {
	fill: 'none',
	stroke: 'none',
	strokeWidth: '1',
	tickStroke: '#000',
	tickTextStroke: '#000',
	xAxisClassName: 'rd3-x-axis',
	xAxisLabel: '',
	xAxisLabelOffset: 10,
	xAxisOffset: 0,
	xOrient: 'bottom',
	yOrient: 'left',
	textColor: '#000'
}, _temp);
exports.default = XAxis;
//# sourceMappingURL=XAxis.js.map