'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bar = (_temp = _class = function (_Component) {
	_inherits(Bar, _Component);

	function Bar(props) {
		_classCallCheck(this, Bar);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {};
		return _this;
	}

	Bar.prototype.render = function render(_ref) {
		var fill = _ref.fill,
		    handleMouseOver = _ref.handleMouseOver,
		    handleMouseLeave = _ref.handleMouseLeave;

		return (0, _preact.h)('rect', _extends({
			className: 'barchart-bar'
		}, this.props, {
			fill: fill,
			onMouseOver: handleMouseOver,
			onMouseLeave: handleMouseLeave
		}));
	};

	return Bar;
}(_preact.Component), _class.defaultProps = {
	offset: 0,
	className: 'barchart-bar'
}, _temp);
exports.default = Bar;
//# sourceMappingURL=Bar.js.map