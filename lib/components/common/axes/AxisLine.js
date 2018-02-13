'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AxisLine = (_temp = _class = function (_Component) {
	_inherits(AxisLine, _Component);

	function AxisLine() {
		_classCallCheck(this, AxisLine);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	AxisLine.prototype._d3_scaleExtent = function _d3_scaleExtent(domain) {
		var start = domain[0],
		    stop = domain[domain.length - 1];
		return start < stop ? [start, stop] : [stop, start];
	};

	AxisLine.prototype._d3_scaleRange = function _d3_scaleRange(scale) {
		return scale.rangeExtent ? scale.rangeExtent() : this._d3_scaleExtent(scale.range());
	};

	AxisLine.prototype.render = function render(_ref) {
		var orient = _ref.orient,
		    scale = _ref.scale,
		    outerTickSize = _ref.outerTickSize,
		    fill = _ref.fill,
		    stroke = _ref.stroke,
		    strokeWidth = _ref.strokeWidth;

		var sign = orient === "top" || orient === "left" ? -1 : 1;

		var range = this._d3_scaleRange(scale);

		var d = void 0;

		if (orient === "bottom" || orient === "top") {
			d = "M" + range[0] + "," + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize;
		} else {
			d = "M" + sign * outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize;
		}

		return (0, _preact.h)('path', {
			className: 'domain',
			d: d,
			style: { 'shapeRendering': 'crispEdges' },
			fill: fill,
			stroke: stroke,
			strokeWidth: strokeWidth
		});
	};

	return AxisLine;
}(_preact.Component), _class.defaultProps = {
	innerTickSize: 6,
	outerTickSize: 6,
	tickPadding: 3,
	fill: 'none',
	tickArguments: [10],
	tickValues: null,
	tickFormat: null
}, _temp);
exports.default = AxisLine;
//# sourceMappingURL=AxisLine.js.map