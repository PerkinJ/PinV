'use strict';

exports.__esModule = true;

var _class, _temp, _initialiseProps;

var _preact = require('preact');

var _utils = require('../../../utils/utils');

var _VoronoiCircle = require('./VoronoiCircle');

var _VoronoiCircle2 = _interopRequireDefault(_VoronoiCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VoronoiCircleContainer = (_temp = _class = function (_Component) {
	_inherits(VoronoiCircleContainer, _Component);

	function VoronoiCircleContainer(props) {
		_classCallCheck(this, VoronoiCircleContainer);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			circleRadius: _this.props.circleRadius,
			circleFill: _this.props.circleFill
		};
		_this.voronoiCircle = null;
		return _this;
	}

	VoronoiCircleContainer.prototype.drawPath = function drawPath(d) {
		if (d === undefined) {
			return;
		}
		return 'M' + d.join("L") + 'Z';
	};

	VoronoiCircleContainer.prototype.render = function render(_ref, _ref2) {
		var hoverAnimation = _ref.hoverAnimation,
		    cx = _ref.cx,
		    cy = _ref.cy,
		    vnode = _ref.vnode;
		var circleRadius = _ref2.circleRadius,
		    circleFill = _ref2.circleFill;

		// 处理动画
		var handleMouseOver = void 0,
		    handleMouseLeave = void 0;
		if (hoverAnimation) {
			handleMouseOver = this.animateCircle;
			handleMouseLeave = this.restoreCircle;
		} else {
			handleMouseOver = handleMouseLeave = null;
		}
		return (0, _preact.h)(
			'g',
			null,
			(0, _preact.h)(_VoronoiCircle2.default, {
				handleMouseOver: handleMouseOver,
				handleMouseLeave: handleMouseLeave,
				voronoiPath: this.drawPath(vnode),
				cx: cx,
				cy: cy,
				circleRadius: circleRadius,
				circleFill: circleFill
			})
		);
	};

	return VoronoiCircleContainer;
}(_preact.Component), _class.defaultProps = {
	circleRadius: 3,
	circleFill: '#673ab7',
	hoverAnimation: true,
	circleRadiusMultiplier: 1.5,
	shadeMultiplier: 0.2
}, _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.animateCircle = function (event) {
		var props = _this2.props;
		if (props.hoverAnimation) {
			var e = event || window.event;
			_this2.props.onMouseOver.call(_this2, e.x, e.y, _this2.props.dataPoint);
			_this2.setState({
				circleFill: (0, _utils.shade)(props.circleFill, props.shadeMultiplier),
				circleRadius: props.circleRadius * props.circleRadiusMultiplier
			});
		}
	};

	this.restoreCircle = function () {
		_this2.props.onMouseLeave();
		_this2.setState({
			circleRadius: _this2.props.circleRadius,
			circleFill: _this2.props.circleFill
		});
	};
}, _temp);
exports.default = VoronoiCircleContainer;
//# sourceMappingURL=VoronoiCircleContainer.js.map