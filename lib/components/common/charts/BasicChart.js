'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicChart = (_temp = _class = function (_Component) {
	_inherits(BasicChart, _Component);

	function BasicChart() {
		_classCallCheck(this, BasicChart);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	BasicChart.prototype._renderTitle = function _renderTitle() {
		var props = this.props;

		if (props.title != '' && props.title != null) {
			return (0, _preact.h)(
				'h4',
				{
					className: props.titleClassName
				},
				props.title
			);
		} else {
			return null;
		}
	};

	BasicChart.prototype._renderChart = function _renderChart() {
		var props = this.props;

		return (0, _preact.h)(
			'svg',
			{
				className: props.svgClassName,
				height: props.height,
				viewBox: props.viewBox,
				width: props.width
			},
			props.children
		);
	};

	BasicChart.prototype.render = function render() {
		var props = this.props;

		return (0, _preact.h)(
			'div',
			{
				className: props.className
			},
			this._renderTitle(),
			this._renderChart()
		);
	};

	return BasicChart;
}(_preact.Component), _class.defaultProps = {
	className: 'rd3-basic-chart',
	svgClassName: 'rd3-chart',
	titleClassName: 'rd3-chart-title'
}, _temp);
exports.default = BasicChart;
//# sourceMappingURL=BasicChart.js.map