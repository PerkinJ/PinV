'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

var _AreaContainer = require('./AreaContainer');

var _AreaContainer2 = _interopRequireDefault(_AreaContainer);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

	DataSeries.prototype.render = function render() {
		var props = this.props;

		var area = d3.area().x(function (d) {
			return props.xScale(props.xAccessor(d));
		}).y0(function (d) {
			return props.yScale(d.y0);
		}).y1(function (d) {
			return props.yScale(d.y0 + props.yAccessor(d));
		});
		// .interpolate(props.interpolationType)

		var path = area(props.data);
		return (0, _preact.h)(_AreaContainer2.default, {
			fill: props.fill,
			hoverAnimation: props.hoverAnimation,
			path: path
		});
	};

	return DataSeries;
}(_preact.Component), _class.defaultProps = {
	interpolationType: 'linear'
}, _temp);
exports.default = DataSeries;
//# sourceMappingURL=DataSeries.js.map