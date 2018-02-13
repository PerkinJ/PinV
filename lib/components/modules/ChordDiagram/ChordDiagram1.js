'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;
// import { legendColor } from 'd3-svg-legend'


var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

var _Tooltip = require('../../basic/Tooltip');

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

		_this.renderData = function () {
			var _this$props = _this.props,
			    padAngle = _this$props.padAngle,
			    data = _this$props.data;

			var chord = d3.chord().padAngle(padAngle > 0.1 ? 0.1 : padAngle < 0 ? 0 : padAngle).sortSubgroups(d3.descending);

			var chordData = chord(data);
			// 生成数据
			_this.setState({ chords: chordData });
			// 生出弧
			_this.setState({ groups: chordData.groups });
		};

		_this.handleText = function (d, outerRadius) {
			// 为绑定的数据添加变量，设置弧的中心角度
			d.angle = (d.startAngle + d.endAngle) / 2;
			// 先旋转d.angle度
			var result = 'rotate(' + d.angle * 180 / Math.PI + ')';
			// 平移到外半径之外
			result += 'translate(0,' + (-1.0 * outerRadius - 15) + ')';
			// 对位于弦图下方的文字，翻转180度，为了防止是倒着的
			if (d.angle > Math.PI * 3 / 4 && d.angle < Math.PI * 5 / 4) result += 'rotate(180)';
			return result;
		};

		_this.handleArcMouseOver = function (e, d) {
			var _this$props2 = _this.props,
			    category = _this$props2.category,
			    data = _this$props2.data;

			var obj = {};
			obj.key = category[d.index] + '\u603B\u91CF';
			obj.value = d.value;
			var contentArr = [];
			contentArr.push(obj);

			data[d.index].forEach(function (d, index) {
				var obj = {};
				obj.key = category[index];
				obj.value = d;
				contentArr.push(obj);
			});

			_this.setState({
				activeIndex: d.index,
				contentArr: contentArr,
				tooltipStyle: {
					left: e.clientX + 20,
					top: e.clientY,
					opacity: 0.9
				}
			});
		};

		_this.handleChordMouseOver = function (e, d) {
			var category = _this.props.category;

			e = e || window.event;
			// 比较source跟target的value值大小，从而设置activeIndex
			var activeIndex = -1,
			    contentArr = [];
			if (d.source.value >= d.target.value) {
				activeIndex = d.source.index;
			} else {
				activeIndex = d.target.index;
			}
			var key1 = category[d.source.index] + '-' + category[d.source.subindex],
			    value1 = ' ' + d.target.value,
			    key2 = category[d.target.index] + '-' + category[d.target.subindex],
			    value2 = ' ' + d.source.value;

			contentArr.push({ key: key1, value: value1 }, { key: key2, value: value2 });
			_this.setState({
				activeIndex: activeIndex,
				contentArr: contentArr,
				tooltipStyle: {
					left: e.clientX + 20,
					top: e.clientY,
					opacity: 0.9
				}
			});
		};

		_this.handleMouseOut = function () {
			_this.setState({
				activeIndex: -1,
				tooltipStyle: {
					opacity: 0
				}
			});
		};

		_this.state = {
			chords: [],
			groups: [],
			activeIndex: -1, // 默认为-1，表示全部显示
			content: ''
		};
		return _this;
	}

	ChordDiagram.prototype.componentDidMount = function componentDidMount() {
		this.renderData();
		// let svg = d3.select("svg")

		// let quantize = d3.scaleQuantize()
		// 	.domain([0, 0.15])
		// 	.range(d3.range(9).map(function (i) { return "q" + i + "-9" }))

		// svg.append("g")
		// 	.attr("class", "legendQuant")
		// 	.attr("transform", "translate(20,20)")

		// let colorLegend = d3.legendColor()
		// 	.labelFormat(d3.format(".2f"))
		// 	.useClass(true)
		// 	.scale(quantize)
		// console.log(colorLegend)
	};
	// 处理鼠标移到弧上


	// 处理鼠标移到任意弦上


	ChordDiagram.prototype.render = function render(_ref, _ref2) {
		var _this2 = this;

		var width = _ref.width,
		    height = _ref.height,
		    arcWidth = _ref.arcWidth,
		    padding = _ref.padding,
		    interactive = _ref.interactive,
		    category = _ref.category;
		var chords = _ref2.chords,
		    groups = _ref2.groups,
		    activeIndex = _ref2.activeIndex,
		    content = _ref2.content,
		    tooltipStyle = _ref2.tooltipStyle,
		    contentArr = _ref2.contentArr;

		var outerRadius = Math.min(width, height) * 0.5 - (padding > Math.min(width, height) / 3 ? Math.min(width, height) / 3 : padding < 0 ? 0 : padding),
		    innerRadius = outerRadius - (arcWidth > Math.min(width, height) / 3 ? Math.min(width, height) / 3 : arcWidth < 0 ? 0 : arcWidth);
		var ribbon = d3.ribbon().radius(innerRadius);
		var arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
		var color = d3.scaleOrdinal().domain(d3.range(5)).range(["#2196F3", "#66BB6A", "#FF7043", "#FFEB3B", "#795548"]);
		interactive = category ? interactive : false;
		return (0, _preact.h)(
			'div',
			null,
			(0, _preact.h)(_Tooltip2.default, {
				contentArr: contentArr,
				content: content,
				tooltipStyle: tooltipStyle
			}),
			(0, _preact.h)(
				'svg',
				{ ref: function ref(el) {
						return _this2.chordDiagram = el;
					}, width: width, height: height },
				(0, _preact.h)(
					'g',
					{ transform: 'translate(' + width / 2 + ',' + height / 2 + ')' },
					(0, _preact.h)(
						'g',
						{ 'class': _index2.default.groups },
						groups.map(function (d, index) {
							return (0, _preact.h)(
								'g',
								{ key: index, 'class': 'outerPath' },
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
									{ dy: '.35em',
										transform: _this2.handleText(d, outerRadius)
									},
									category && category[d.index]
								)
							);
						})
					),
					(0, _preact.h)(
						'g',
						{ 'class': _index2.default.ribbons },
						chords.map(function (d, index) {
							return (0, _preact.h)(
								'g',
								{ key: index },
								(0, _preact.h)('path', { d: ribbon(d),
									onMouseOver: interactive ? function (e) {
										return _this2.handleChordMouseOver(e, d);
									} : null,
									onMouseMove: interactive ? function (e) {
										return _this2.handleChordMouseOver(e, d);
									} : null,
									onMouseOut: interactive ? _this2.handleMouseOut : null,
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
	width: 500,
	height: 500,
	arcWidth: 10, //外弧的宽度，最大不超过宽度/高度的1/3
	padding: 40, // padding，最大不超过宽度/高度的1/3
	padAngle: 0.03, // 弦的间隔，[0,0.1]
	interactive: true
}, _temp);
exports.default = ChordDiagram;
//# sourceMappingURL=ChordDiagram1.js.map