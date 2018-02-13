'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Circle = (_temp = _class = function (_Component) {
	_inherits(Circle, _Component);

	function Circle() {
		_classCallCheck(this, Circle);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Circle.prototype.getInitialState = function getInitialState() {
		// state for animation usage
		return {
			circleRadius: this.props.r,
			circleColor: this.props.fill
		};
	};

	Circle.prototype.componentDidMount = function componentDidMount() {
		var _this2 = this;

		var props = this.props;
		// The circle reference is observed when both it is set to
		// active, and to inactive, so we have to check which one
		props.voronoiRef.observe(function () {
			var circleStatus = props.voronoiRef.cursor().deref();
			var seriesName = props.id.split('-')[0];
			if (circleStatus === 'active') {
				_this2._animateCircle(props.id);
				var voronoiSeriesCursor = props.structure.cursor('voronoiSeries');
				if (voronoiSeriesCursor) {
					voronoiSeriesCursor.cursor(seriesName).update(function () {
						return 'active';
					});
				}
			} else if (circleStatus === 'inactive') {
				_this2._restoreCircle(props.id);
				props.structure.cursor('voronoiSeries').cursor(seriesName).update(function () {
					return 'inactive';
				});
			}
		});
	};

	Circle.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.voronoiRef.destroy();
	};

	Circle.prototype._animateCircle = function _animateCircle() {
		this.setState({
			circleRadius: this.state.circleRadius * (5 / 4)
		});
	};

	Circle.prototype._restoreCircle = function _restoreCircle() {
		this.setState({
			circleRadius: this.props.r
		});
	};

	Circle.prototype.render = function render() {
		var props = this.props;
		return (0, _preact.h)('circle', {
			cx: props.cx,
			cy: props.cy,
			r: this.state.circleRadius,
			fill: this.state.circleColor,
			id: props.id,
			className: props.className
		});
	};

	return Circle;
}(_preact.Component), _class.defaultProps = {
	fill: '#1f77b4'
}, _temp);
exports.default = Circle;
//# sourceMappingURL=Circle.js.map