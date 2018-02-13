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
		var props = this.props;

		return (0, _preact.h)(
			'g',
			null,
			(0, _preact.h)('path', {
				d: props.voronoiPath,
				fill: props.pathFill,
				onMouseLeave: props.handleMouseLeave,
				onMouseOver: props.handleMouseOver
			}),
			(0, _preact.h)('circle', {
				cx: props.cx,
				cy: props.cy,
				className: props.className,
				fill: props.circleFill,
				onMouseLeave: props.handleMouseLeave,
				onMouseOver: props.handleMouseOver,
				r: props.circleRadius
			})
		);
	};

	return VoronoiCircle;
}(_preact.Component), _class.defaultProps = {
	className: 'scatterchart-voronoi-circle',
	pathFill: 'transparent'
}, _temp);
exports.default = VoronoiCircle;
//# sourceMappingURL=VoronoiCircle.js.map