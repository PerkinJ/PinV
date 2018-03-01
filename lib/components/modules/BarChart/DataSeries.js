'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

var _BarContainer = require('./BarContainer');

var _BarContainer2 = _interopRequireDefault(_BarContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataSeries = (_temp = _class = function (_Component) {
	_inherits(DataSeries, _Component);

	function DataSeries(props) {
		_classCallCheck(this, DataSeries);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			fill: _this.props.fill
		};
		return _this;
	}

	DataSeries.prototype._renderBarSeries = function _renderBarSeries() {
		var _this2 = this;

		var _data = this.props._data;


		return _data.map(function (layer, seriesIdx) {
			layer.map(function (d) {
				var segment = d[1] - d[0];

				return _this2._renderBarContainer(segment, seriesIdx);
			});
			// return valuesAccessor(layer)
			// 	.map(segment => this._renderBarContainer(segment, seriesIdx))
		});
	};

	DataSeries.prototype._renderBarContainer = function _renderBarContainer(segment, seriesIdx) {
		console.log('test', segment);
		var _props = this.props,
		    colors = _props.colors,
		    colorAccessor = _props.colorAccessor,
		    hoverAnimation = _props.hoverAnimation,
		    xScale = _props.xScale,
		    yScale = _props.yScale;

		var barHeight = Math.abs(yScale(0) - yScale(segment));
		var y = yScale(segment.y0 + segment.y);
		return (0, _preact.h)(_BarContainer2.default, {
			height: barHeight,
			width: xScale,
			x: xScale(segment.x),
			y: segment.y >= 0 ? y : y - barHeight,
			fill: colors(colorAccessor(segment, seriesIdx)),
			hoverAnimation: hoverAnimation,
			onMouseOver: this.props.onMouseOver,
			onMouseLeave: this.props.onMouseLeave,
			dataPoint: { xValue: segment.x, yValue: segment.y, seriesName: this.props.series[seriesIdx] }
		});
	};

	DataSeries.prototype.render = function render() {
		return (0, _preact.h)(
			'g',
			null,
			this._renderBarSeries()
		);
	};

	return DataSeries;
}(_preact.Component), _class.defaultProps = {
	interpolationType: 'linear'
}, _temp);
exports.default = DataSeries;
//# sourceMappingURL=DataSeries.js.map