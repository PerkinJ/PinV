'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Area = (_temp = _class = function (_Component) {
	_inherits(Area, _Component);

	function Area(props) {
		_classCallCheck(this, Area);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {};
		return _this;
	}

	Area.prototype.render = function render(_ref) {
		var path = _ref.path,
		    fill = _ref.fill,
		    handleMouseOver = _ref.handleMouseOver,
		    handleMouseLeave = _ref.handleMouseLeave;

		return (0, _preact.h)('path', {
			className: 'areachart-area',
			d: path,
			fill: fill,
			onMouseOver: handleMouseOver,
			onMouseLeave: handleMouseLeave
		});
	};

	return Area;
}(_preact.Component), _class.defaultProps = {
	fill: '#3182bd'
}, _temp);
exports.default = Area;
//# sourceMappingURL=Area.js.map