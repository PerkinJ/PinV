'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _preact = require('preact');

var _utils = require('../../../utils/utils');

var _Area = require('./Area');

var _Area2 = _interopRequireDefault(_Area);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AreaContainer = (_temp = _class = function (_Component) {
	_inherits(AreaContainer, _Component);

	function AreaContainer(props) {
		_classCallCheck(this, AreaContainer);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this._animateArea = function () {
			_this.setState({
				fill: (0, _utils.shade)(_this.props.fill, 0.02)
			});
		};

		_this._restoreArea = function () {
			_this.setState({
				fill: _this.props.fill
			});
		};

		_this.state = {
			fill: _this.props.fill
		};
		return _this;
	}

	AreaContainer.prototype.render = function render() {
		var props = this.props;

		// animation controller
		var handleMouseOver = void 0,
		    handleMouseLeave = void 0;
		if (props.hoverAnimation) {
			handleMouseOver = this._animateArea;
			handleMouseLeave = this._restoreArea;
		} else {
			handleMouseOver = handleMouseLeave = null;
		}

		return (0, _preact.h)(_Area2.default, _extends({
			handleMouseOver: handleMouseOver,
			handleMouseLeave: handleMouseLeave
		}, props, {
			fill: this.state.fill
		}));
	};

	return AreaContainer;
}(_preact.Component), _class.defaultProps = {
	fill: '#3182bd'
}, _temp);
exports.default = AreaContainer;
//# sourceMappingURL=AreaContainer.js.map