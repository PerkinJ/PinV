'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

var _preact = require('preact');

var _utils = require('../../../utils/utils');

var _Arc = require('./Arc');

var _Arc2 = _interopRequireDefault(_Arc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArcContainer = (_temp = _class = function (_Component) {
	_inherits(ArcContainer, _Component);

	function ArcContainer(props) {
		_classCallCheck(this, ArcContainer);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			fill: _this.props.fill
		};
		return _this;
	}

	ArcContainer.prototype.render = function render() {
		var props = this.props;

		return (0, _preact.h)(_Arc2.default, _extends({}, this.props, {
			fill: this.state.fill,
			handleMouseOver: props.hoverAnimation ? this._animateArc : null,
			handleMouseLeave: props.hoverAnimation ? this._restoreArc : null
		}));
	};

	return ArcContainer;
}(_preact.Component), _class.defaultProps = {
	fill: '#3182bd'
}, _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this._animateArc = function (event) {
		var props = _this2.props;
		if (props.hoverAnimation) {
			var e = event || window.event;
			_this2.props.onMouseOver.call(_this2, e.x, e.y, _this2.props.dataPoint);
			_this2.setState({
				fill: (0, _utils.shade)(_this2.props.fill, 0.2)
			});
		}
	};

	this._restoreArc = function () {
		_this2.props.onMouseLeave.call(_this2);
		_this2.setState({
			fill: _this2.props.fill
		});
	};
}, _temp);
exports.default = ArcContainer;
//# sourceMappingURL=ArcContainer.js.map