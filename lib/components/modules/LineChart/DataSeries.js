'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _VoronoiCircleContainer = require('./VoronoiCircleContainer');

var _VoronoiCircleContainer2 = _interopRequireDefault(_VoronoiCircleContainer);

var _Line = require('./Line');

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataSeries = (_temp = _class = function (_Component) {
	_inherits(DataSeries, _Component);

	function DataSeries() {
		_classCallCheck(this, DataSeries);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	DataSeries.prototype._isDate = function _isDate(d, accessor) {
		return Object.prototype.toString.call(accessor(d)) === '[object Date]';
	};

	DataSeries.prototype.render = function render(_ref) {
		var value = _ref.value,
		    width = _ref.width,
		    height = _ref.height,
		    data = _ref.data,
		    xScale = _ref.xScale,
		    yScale = _ref.yScale,
		    xAccessor = _ref.xAccessor,
		    yAccessor = _ref.yAccessor,
		    colors = _ref.colors,
		    colorAccessor = _ref.colorAccessor,
		    hoverAnimation = _ref.hoverAnimation,
		    circleRadius = _ref.circleRadius,
		    onMouseOver = _ref.onMouseOver,
		    onMouseLeave = _ref.onMouseLeave;

		var interpolatePath = d3.line().y(function (d) {
			return yScale(yAccessor(d));
		});
		// .interpolate(interpolationType)

		if (this._isDate(data[0].values[0], xAccessor)) {
			interpolatePath.x(function (d) {
				return xScale(xAccessor(d).getTime());
			});
		} else {
			interpolatePath.x(function (d) {
				return xScale(xAccessor(d));
			});
		}
		var lines = data.map(function (series, idx) {
			return (0, _preact.h)(_Line2.default, {
				path: interpolatePath(series.values),
				stroke: colors(colorAccessor(series, idx)),
				strokeWidth: series.strokeWidth,
				strokeDashArray: series.strokeDashArray,
				seriesName: series.name,
				key: idx
			});
		});
		var voronoi = d3.voronoi().x(function (d) {
			return xScale(d.coord.x);
		}).y(function (d) {
			return yScale(d.coord.y);
		}).extent([[0, 0], [width, height]]);
		var cx = void 0,
		    cy = void 0,
		    circleFill = void 0;
		var regions = voronoi(value).polygons().map(function (vnode, idx) {
			var point = vnode.data.coord;
			if (Object.prototype.toString.call(xAccessor(point)) === '[object Date]') {
				cx = xScale(xAccessor(point).getTime());
			} else {
				cx = xScale(xAccessor(point));
			}
			if (Object.prototype.toString.call(yAccessor(point)) === '[object Date]') {
				cy = yScale(yAccessor(point).getTime());
			} else {
				cy = yScale(yAccessor(point));
			}
			circleFill = colors(colorAccessor(vnode, vnode.data.seriesIndex));

			return (0, _preact.h)(_VoronoiCircleContainer2.default, {
				key: idx,
				circleFill: circleFill,
				vnode: vnode,
				hoverAnimation: hoverAnimation,
				cx: cx, cy: cy,
				circleRadius: circleRadius,
				onMouseOver: onMouseOver,
				onMouseLeave: onMouseLeave,
				dataPoint: { xValue: xAccessor(point), yValue: yAccessor(point), seriesName: vnode.data.series.name }
			});
		});
		return (0, _preact.h)(
			'g',
			null,
			(0, _preact.h)(
				'g',
				null,
				regions
			),
			(0, _preact.h)(
				'g',
				null,
				lines
			)
		);
	};

	return DataSeries;
}(_preact.Component), _class.defaultProps = {
	data: [],
	xAccessor: function xAccessor(d) {
		return d.x;
	},
	yAccessor: function yAccessor(d) {
		return d.y;
	},
	interpolationType: 'linear',
	hoverAnimation: false
}, _temp);
exports.default = DataSeries;
//# sourceMappingURL=DataSeries.js.map