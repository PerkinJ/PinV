'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _preact = require('preact');

var _LegendChart = require('./LegendChart');

var _LegendChart2 = _interopRequireDefault(_LegendChart);

var _BasicChart = require('./BasicChart');

var _BasicChart2 = _interopRequireDefault(_BasicChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chart = (_temp = _class = function (_Component) {
	_inherits(Chart, _Component);

	function Chart() {
		_classCallCheck(this, Chart);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Chart.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
		return nextProps.shouldUpdate;
	};

	Chart.prototype.render = function render() {
		var props = this.props;
		if (props.legend) {
			return (0, _preact.h)(_LegendChart2.default, _extends({
				svgClassName: props.svgClassName,
				titleClassName: props.titleClassName
			}, this.props));
		}
		return (0, _preact.h)(_BasicChart2.default, _extends({
			svgClassName: props.svgClassName,
			titleClassName: props.titleClassName
		}, this.props));
	};

	return Chart;
}(_preact.Component), _class.defaultProps = {
	legend: false,
	svgClassName: 'rd3-chart',
	titleClassName: 'rd3-chart-title',
	shouldUpdate: true
}, _temp);
exports.default = Chart;
//# sourceMappingURL=Chart.js.map