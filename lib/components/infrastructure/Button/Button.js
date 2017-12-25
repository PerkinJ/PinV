'use strict';

exports.__esModule = true;

var _class, _temp2;

var _preact = require('preact');

var _Button = require('./Button.less');

var _Button2 = _interopRequireDefault(_Button);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = _bind2.default.bind(_Button2.default);

var prefix = 'pinvButton';
var Button = (_temp2 = _class = function (_Component) {
	_inherits(Button, _Component);

	function Button() {
		var _temp, _this, _ret;

		_classCallCheck(this, Button);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleClick = function () {
			var _this$props = _this.props,
			    disabled = _this$props.disabled,
			    onClick = _this$props.onClick;

			if (!disabled && onClick) {
				onClick();
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Button.prototype.render = function render() {
		var _ref;

		var _props = this.props,
		    type = _props.type,
		    htmlType = _props.htmlType,
		    size = _props.size,
		    className = _props.className,
		    disabled = _props.disabled,
		    children = _props.children,
		    style = _props.style;

		var classes = cx([prefix, prefix + '_' + size, prefix + '_' + type, (_ref = {}, _ref[prefix + '_disabled'] = disabled, _ref)], className);
		return (0, _preact.h)(
			'button',
			{
				className: classes,
				type: htmlType,
				onClick: this.handleClick,
				style: style
			},
			children
		);
	};

	return Button;
}(_preact.Component), _class.defaultProps = {
	size: 'default',
	htmlType: 'button',
	type: 'default',
	onClick: function onClick() {
		return null;
	}
}, _temp2);
exports.default = Button;
//# sourceMappingURL=Button.js.map