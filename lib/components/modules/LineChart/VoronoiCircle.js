'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VoronoiCircle = (_temp = _class = function (_Component) {
	_inherits(VoronoiCircle, _Component);

	function VoronoiCircle(props) {
		_classCallCheck(this, VoronoiCircle);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {};
		return _this;
	}

	VoronoiCircle.prototype.render = function render() {
		return (0, _preact.h)(
			'g',
			null,
			(0, _preact.h)('path', {
				onMouseOver: this.props.handleMouseOver,
				onMouseLeave: this.props.handleMouseLeave,
				fill: 'transparent',
				d: this.props.voronoiPath
			}),
			(0, _preact.h)('circle', {
				onMouseOver: this.props.handleMouseOver,
				onMouseLeave: this.props.handleMouseLeave,
				cx: this.props.cx,
				cy: this.props.cy,
				r: this.props.circleRadius,
				fill: this.props.circleFill,
				className: 'linechart-circle'
			})
		);
	};

	return VoronoiCircle;
}(_preact.Component), _class.defaultProps = {
	circleRadius: 3,
	circleFill: '#1f77b4'
}, _temp);
exports.default = VoronoiCircle;
//# sourceMappingURL=VoronoiCircle.js.map