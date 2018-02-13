'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;
// import { legendColor } from 'd3-svg-legend'


var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _index = require('./index.css');

var _index2 = _interopRequireDefault(_index);

var _Tooltip = require('../../common/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChordDiagram = (_temp = _class = function (_Component) {
	_inherits(ChordDiagram, _Component);

	function ChordDiagram(props) {
		_classCallCheck(this, ChordDiagram);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.handleArcMouseOver = function (e, d) {
			_this.setState({
				activeIndex: d.index,
				tooltip: {
					x: e.clientX + 20,
					y: e.clientY,
					child: d.value,
					show: true
				}
			});
		};

		_this.handleChordMouseOver = function (e, d) {
			e = e || window.event;
			// // 比较source跟target的value值大小，从而设置activeIndex
			var activeIndex = -1,
			    contentArr = [];
			if (d.source.value >= d.target.value) {
				activeIndex = d.source.index;
			} else {
				activeIndex = d.target.index;
			}
			var key1 = _this.state.nameByIndex.get(d.target.index),
			    value1 = ' ' + d.target.value,
			    key2 = _this.state.nameByIndex.get(d.source.index),
			    value2 = ' ' + d.source.value;

			contentArr.push({ key: key1, value: value1 }, { key: key2, value: value2 });
			var child = 'source:' + key1 + ',value:' + value1 + '\ntarget:' + key2 + ',value:' + value2;
			_this.setState({
				activeIndex: activeIndex,
				contentArr: contentArr,
				content: '',
				tooltip: {
					x: e.clientX + 20,
					y: e.clientY,
					child: child,
					show: true
				}
			});
		};

		_this.handleMouseOut = function () {
			_this.setState({
				// contentArr:[],
				// content:'',
				activeIndex: -1,
				tooltip: {
					x: 0,
					y: 0,
					child: '',
					show: false
				}
			});
		};

		_this.state = {
			activeIndex: -1, // 默认为-1，表示全部显示
			content: '',
			tooltip: {}
		};
		return _this;
	}
	// 处理鼠标移到弧上


	// 处理鼠标移到任意弦上


	ChordDiagram.prototype.componentDidMount = function componentDidMount() {
		var indexByName = new Map(),
		    nameByIndex = new Map(),
		    n = 0;
		// Returns the Flare package name for the given class name.
		function name(name) {
			return name.substring(0, name.lastIndexOf(".")).substring(6);
		}
		// Compute a unique index for each package name.
		this.props.data.forEach(function (d) {
			if (!indexByName.has(d = name(d.name))) {
				nameByIndex.set(n, d);
				indexByName.set(d, n++);
			}
		});
		this.setState({ nameByIndex: nameByIndex });
	};

	ChordDiagram.prototype.render = function render(_ref, _ref2) {
		var _this2 = this;

		var width = _ref.width,
		    height = _ref.height,
		    padAngle = _ref.padAngle,
		    interactive = _ref.interactive;
		var activeIndex = _ref2.activeIndex,
		    tooltip = _ref2.tooltip;

		var outerRadius = width / 2,
		    innerRadius = outerRadius - 150;

		var color = d3.scaleOrdinal(d3.schemeCategory20);

		var chord = d3.chord().padAngle(padAngle).sortSubgroups(d3.descending).sortChords(d3.descending);

		var ribbon = d3.ribbon().radius(innerRadius);

		var arc = d3.arc().innerRadius(innerRadius).outerRadius(innerRadius + 20);
		var imports = this.props.data;

		var indexByName = d3.map(),
		    nameByIndex = d3.map(),
		    matrix = [],
		    n = 0;

		// Returns the Flare package name for the given class name.
		function name(name) {
			return name.substring(0, name.lastIndexOf(".")).substring(6);
		}
		// Compute a unique index for each package name.
		imports.forEach(function (d) {
			if (!indexByName.has(d = name(d.name))) {
				nameByIndex.set(n, d);
				indexByName.set(d, n++);
			}
		});
		// Construct a square matrix counting package imports.
		imports.forEach(function (d) {
			var source = indexByName.get(name(d.name)),
			    row = matrix[source];
			if (!row) {
				row = matrix[source] = [];
				for (var i = -1; ++i < n;) {
					row[i] = 0;
				}
			}
			d.imports.forEach(function (d) {
				return row[indexByName.get(name(d))]++;
			});
		});
		var chordData = chord(matrix);
		return (0, _preact.h)(
			'div',
			{ ref: function ref(el) {
					return _this2.chordDiagram = el;
				} },
			(0, _preact.h)(_Tooltip2.default, tooltip),
			(0, _preact.h)(
				'svg',
				{ ref: function ref(el) {
						return _this2.chordDiagram = el;
					}, width: width, height: height },
				(0, _preact.h)(
					'g',
					{ transform: 'translate(' + outerRadius + ',' + outerRadius + ')' },
					(0, _preact.h)(
						'g',
						{ 'class': _index2.default.groups },
						chordData.groups.map(function (d, index) {
							d.angle = (d.startAngle + d.endAngle) / 2;
							return (0, _preact.h)(
								'g',
								{ key: index },
								(0, _preact.h)('path', { d: arc(d),
									onMouseOver: interactive ? function (e) {
										return _this2.handleArcMouseOver(e, d);
									} : null,
									onMouseMove: interactive ? function (e) {
										return _this2.handleArcMouseOver(e, d);
									} : null,
									onMouseOut: interactive ? _this2.handleMouseOut : null,
									fill: color(d.index),
									stroke: d3.rgb(color(d.index)).darker()
								}),
								(0, _preact.h)(
									'text',
									{
										transform: "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + (innerRadius + 26) + ")" + (d.angle > Math.PI ? "rotate(180)" : ""),
										dy: '.2em',
										'text-anchor': d.angle > Math.PI ? "end" : null
									},
									nameByIndex.get(d.index)
								)
							);
						})
					),
					(0, _preact.h)(
						'g',
						{ 'class': _index2.default.ribbons },
						chordData.map(function (d, index) {
							return (0, _preact.h)(
								'g',
								{ key: index },
								(0, _preact.h)('path', {
									onMouseOver: interactive ? function (e) {
										return _this2.handleChordMouseOver(e, d);
									} : null,
									onMouseMove: interactive ? function (e) {
										return _this2.handleChordMouseOver(e, d);
									} : null,
									onMouseOut: interactive ? _this2.handleMouseOut : null,
									d: ribbon(d),
									style: { opacity: activeIndex !== -1 && d.source.index !== activeIndex && d.target.index !== activeIndex ? 0 : 1 },
									fill: color(d.target.index),
									stroke: d3.rgb(color(d.target.index)).darker()
								})
							);
						})
					)
				)
			)
		);
	};

	return ChordDiagram;
}(_preact.Component), _class.defaultProps = {
	width: 700,
	height: 700,
	arcWidth: 10, //外弧的宽度，最大不超过宽度/高度的1/3
	padding: 10, // padding，最大不超过宽度/高度的1/3
	padAngle: 0.03, // 弦的间隔，[0,0.1]
	interactive: true
}, _temp);
exports.default = ChordDiagram;
//# sourceMappingURL=ChordDiagram.js.map