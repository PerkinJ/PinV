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

var YAxis = (_temp = _class = function (_Component) {
	_inherits(YAxis, _Component);

	function YAxis() {
		_classCallCheck(this, YAxis);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	YAxis.prototype.render = function render() {

		var props = this.props;

		var t = void 0;
		if (props.yOrient === 'right') {
			t = 'translate(' + (props.yAxisOffset + props.width) + ', 0)';
		} else {
			t = 'translate(' + props.yAxisOffset + ', 0)';
		}

		var tickArguments = void 0;
		if (props.yAxisTickCount) {
			tickArguments = [props.yAxisTickCount];
		}

		if (props.yAxisTickInterval) {
			tickArguments = [d3.time[props.yAxisTickInterval.unit], props.yAxisTickInterval.interval];
		}
		return (0, _preact.h)(
			'g',
			{
				className: props.yAxisClassName,
				transform: t
			},
			(0, _preact.h)(_AxisTicks2.default, {
				innerTickSize: props.tickSize,
				orient: props.yOrient,
				orient2nd: props.xOrient,
				tickArguments: tickArguments,
				tickFormatting: props.tickFormatting,
				tickStroke: props.tickStroke,
				tickTextStroke: props.tickTextStroke,
				tickValues: props.yAxisTickValues,
				scale: props.yScale,
				height: props.height,
				width: props.width,
				horizontalChart: props.horizontalChart,
				gridHorizontal: props.gridHorizontal,
				gridHorizontalStroke: props.gridHorizontalStroke,
				gridHorizontalStrokeWidth: props.gridHorizontalStrokeWidth,
				gridHorizontalStrokeDash: props.gridHorizontalStrokeDash
			}),
			(0, _preact.h)(_AxisLine2.default, _extends({
				orient: props.yOrient,
				outerTickSize: props.tickSize,
				scale: props.yScale,
				stroke: props.stroke
			}, props)),
			(0, _preact.h)(_Label2.default, {
				height: props.height,
				horizontalChart: props.horizontalChart,
				label: props.yAxisLabel,
				margins: props.margins,
				offset: props.yAxisLabelOffset,
				orient: props.yOrient,
				textColor: props.textColor
			})
		);
	};

	return YAxis;
}(_preact.Component), _class.defaultProps = {
	fill: 'none',
	stroke: '#000',
	strokeWidth: '1',
	tickStroke: '#000',
	tickTextStroke: '#000',
	yAxisClassName: 'rd3-y-axis',
	yAxisLabel: '',
	yAxisOffset: 0,
	xOrient: 'bottom',
	yOrient: 'left',
	textColor: '#000'
}, _temp);
exports.default = YAxis;
//# sourceMappingURL=YAxis.js.map