'use strict';

exports.__esModule = true;

var _class, _temp2;

var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Arc = (_temp2 = _class = function (_Component) {
	_inherits(Arc, _Component);

	function Arc() {
		var _temp, _this, _ret;

		_classCallCheck(this, Arc);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.renderInnerLabel = function (props, arc) {
			// make value text can be formatted
			var formattedValue = props.valueTextFormatter(Math.round(props.value / props.sum * 100).toFixed(1));
			return (0, _preact.h)(
				'text',
				{
					className: 'piechart-value',
					transform: 'translate(' + arc.centroid() + ')',
					dy: '.35em',
					style: {
						'shapeRendering': 'crispEdges',
						'textAnchor': 'middle',
						'fill': props.valueTextFill
					} },
				formattedValue
			);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Arc.prototype.renderOuterLabel = function renderOuterLabel(props) {

		var rotate = 'rotate(' + (props.startAngle + props.endAngle) / 2 * (180 / Math.PI) + ')';
		// let positions = arc.centroid()
		var radius = props.outerRadius;
		var dist = radius + 35;
		var angle = (props.startAngle + props.endAngle) / 2;
		var x = dist * (1.2 * Math.sin(angle));
		var y = -dist * Math.cos(angle);
		var t = 'translate(' + x + ',' + y + ')';

		return (0, _preact.h)(
			'g',
			null,
			(0, _preact.h)('line', {
				x1: '0',
				x2: '0',
				y1: -radius - 2,
				y2: -radius - 26,
				stroke: props.labelTextFill,
				transform: rotate,
				style: {
					'fill': props.labelTextFill,
					'strokeWidth': 1
				}
			}),
			(0, _preact.h)(
				'text',
				{
					className: 'piechart-label',
					transform: t,
					dy: '.35em',
					style: {
						'textAnchor': 'middle',
						'fill': props.labelTextFill,
						'shapeRendering': 'crispEdges'
					} },
				props.label
			)
		);
	};

	Arc.prototype.render = function render() {
		var props = this.props;

		var arc = d3.arc().innerRadius(props.innerRadius).outerRadius(props.outerRadius).startAngle(props.startAngle).endAngle(props.endAngle);

		return (0, _preact.h)(
			'g',
			{ className: 'piechart-arc' },
			(0, _preact.h)('path', {
				d: arc(),
				fill: props.fill,
				stroke: props.sectorBorderColor,
				onMouseOver: props.handleMouseOver,
				onMouseLeave: props.handleMouseLeave
			}),
			props.showOuterLabels ? this.renderOuterLabel(props, arc) : null,
			props.showInnerLabels ? this.renderInnerLabel(props, arc) : null
		);
	};

	return Arc;
}(_preact.Component), _class.defaultProps = {
	labelTextFill: 'black',
	valueTextFill: 'white',
	showInnerLabels: true,
	showOuterLabels: true
}, _temp2);
exports.default = Arc;
//# sourceMappingURL=Arc.js.map