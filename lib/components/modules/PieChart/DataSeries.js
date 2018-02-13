'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

var _ArcContainer = require('./ArcContainer');

var _ArcContainer2 = _interopRequireDefault(_ArcContainer);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataSeries = (_temp = _class = function (_Component) {
	_inherits(DataSeries, _Component);

	function DataSeries(props) {
		_classCallCheck(this, DataSeries);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			fill: _this.props.fill
		};
		return _this;
	}

	DataSeries.prototype.render = function render() {
		var props = this.props;

		var pie = d3.pie().sort(null);

		var arcData = pie(props.values);
		var sum = props.values.reduce(function (total, num) {
			return total + num;
		});
		var arcs = arcData.map(function (arc, idx) {
			return (0, _preact.h)(_ArcContainer2.default, {
				key: idx,
				startAngle: arc.startAngle,
				endAngle: arc.endAngle,
				outerRadius: props.radius,
				innerRadius: props.innerRadius,
				labelTextFill: props.labelTextFill,
				valueTextFill: props.valueTextFill,
				valueTextFormatter: props.valueTextFormatter,
				fill: props.colors(props.colorAccessor(props.data[idx], idx)),
				value: props.values[idx],
				label: props.labels[idx],
				sum: sum,
				width: props.width,
				showInnerLabels: props.showInnerLabels,
				showOuterLabels: props.showOuterLabels,
				sectorBorderColor: props.sectorBorderColor,
				hoverAnimation: props.hoverAnimation,
				onMouseOver: props.onMouseOver,
				onMouseLeave: props.onMouseLeave,
				dataPoint: { yValue: props.values[idx], seriesName: props.labels[idx] }
			});
		});
		return (0, _preact.h)(
			'g',
			{ className: 'rd3-piechart-pie', transform: props.transform },
			arcs
		);
	};

	return DataSeries;
}(_preact.Component), _class.defaultProps = {
	data: [],
	innerRadius: 0,
	colors: d3.scaleOrdinal(d3.schemeCategory20),
	colorAccessor: function colorAccessor(d, idx) {
		return idx;
	}
}, _temp);
exports.default = DataSeries;
//# sourceMappingURL=DataSeries.js.map