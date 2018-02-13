'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Line = (_temp = _class = function (_Component) {
	_inherits(Line, _Component);

	function Line() {
		_classCallCheck(this, Line);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Line.prototype.render = function render(_ref) {
		var path = _ref.path,
		    stroke = _ref.stroke,
		    strokeWidth = _ref.strokeWidth,
		    strokeDashArray = _ref.strokeDashArray,
		    fill = _ref.fill,
		    className = _ref.className;

		return (0, _preact.h)('path', {
			d: path,
			stroke: stroke,
			strokeWidth: strokeWidth,
			strokeDasharray: strokeDashArray,
			fill: fill,
			className: className
		});
	};

	return Line;
}(_preact.Component), _class.defaultProps = {
	stroke: '#673ab7',
	fill: 'none',
	strokeWidth: 1,
	className: 'linechart-path'
}, _temp);
exports.default = Line;
//# sourceMappingURL=Line.js.map