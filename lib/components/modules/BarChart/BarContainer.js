'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _preact = require('preact');

var _utils = require('../../../utils/utils');

var _Bar = require('./Bar');

var _Bar2 = _interopRequireDefault(_Bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarContainer = (_temp = _class = function (_Component) {
	_inherits(BarContainer, _Component);

	function BarContainer(props) {
		_classCallCheck(this, BarContainer);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			fill: _this.props.fill
		};
		return _this;
	}

	BarContainer.prototype._animateBar = function _animateBar(event) {
		var e = event || window.event;
		this.props.onMouseOver.call(this, e.x, e.y, this.props.dataPoint);
		this.setState({
			fill: (0, _utils.shade)(this.props.fill, 0.2)
		});
	};

	BarContainer.prototype._restoreBar = function _restoreBar() {
		this.props.onMouseLeave.call(this);
		this.setState({
			fill: this.props.fill
		});
	};

	BarContainer.prototype.render = function render() {
		var props = this.props;

		return (0, _preact.h)(_Bar2.default, _extends({}, props, {
			fill: this.state.fill,
			handleMouseOver: props.hoverAnimation ? this._animateBar : null,
			handleMouseLeave: props.hoverAnimation ? this._restoreBar : null
		}));
	};

	return BarContainer;
}(_preact.Component), _class.defaultProps = {
	fill: '#3182BD'
}, _temp);
exports.default = BarContainer;
//# sourceMappingURL=BarContainer.js.map