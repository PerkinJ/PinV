'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

var _Tooltip = require('../../common/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HierarchyLayout = (_temp = _class = function (_Component) {
	_inherits(HierarchyLayout, _Component);

	function HierarchyLayout(props) {
		_classCallCheck(this, HierarchyLayout);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.handleClick = function (e, d, index) {
			var onClick = _this.props.onClick;

			onClick && onClick(e, d, index);
		};

		_this.handleMouseOver = function (e, d, index) {
			var _this$props = _this.props,
			    dataKey = _this$props.dataKey,
			    nameKey = _this$props.nameKey,
			    onMouseOver = _this$props.onMouseOver;

			var isHasVal = Object.keys(d.data).indexOf(dataKey);
			var name = d.data[nameKey];
			var valueStr = isHasVal > -1 ? ',' + dataKey + ':' + d.data[dataKey] : '';
			_this.setState({
				activeIdx: index,
				content: nameKey + ': ' + name + valueStr,
				tooltip: {
					x: e.screenX + 20,
					y: e.screenY - 120,
					child: nameKey + ': ' + name + valueStr,
					show: true
				},
				sunburstHighlight: true
			});
			onMouseOver && onMouseOver();
		};

		_this.handleMouseOut = function () {
			var onMouseOut = _this.props.onMouseOut;

			_this.setState({
				activeIdx: '0',
				content: '',
				tooltip: {
					x: 0,
					y: 0,
					child: '',
					show: false
				},
				sunburstHighlight: false
			});
			onMouseOut && onMouseOut();
		};

		_this.computeTextRotation = function (d) {
			var angle = (d.x0 + d.x1) / Math.PI * 90;
			return angle < 180 ? angle - 90 : angle + 90;
		};

		_this.state = {
			descendantsData: [],
			linkData: [],
			content: '',
			tooltip: {},
			sunburstHighlight: false //sunburst高亮的标志,悬浮某节点时为true，其他节点变暗
		};
		return _this;
	}

	HierarchyLayout.prototype.render = function render(_ref, _ref2) {
		var _this2 = this;

		var width = _ref.width,
		    height = _ref.height,
		    padding = _ref.padding,
		    data = _ref.data,
		    interactive = _ref.interactive,
		    type = _ref.type,
		    backgroundColor = _ref.backgroundColor,
		    hoverColor = _ref.hoverColor;
		var tooltip = _ref2.tooltip,
		    content = _ref2.content,
		    activeIdx = _ref2.activeIdx,
		    sunburstHighlight = _ref2.sunburstHighlight;

		var root = d3.hierarchy(data);
		switch (type) {
			case 'tree':
			case 'cluster':
				{
					var treeLayout = type === 'tree' ? d3.tree() : d3.cluster();
					treeLayout.size([width - padding.left - padding.right, height - padding.top - padding.bottom - 60]);
					treeLayout(root);
					var descendantsData = root.descendants(),
					    linkData = root.links();
					return (0, _preact.h)(
						'div',
						{ 'class': _index2.default.container },
						(0, _preact.h)(_Tooltip2.default, tooltip),
						(0, _preact.h)(
							'svg',
							{
								transform: 'translate(' + padding.left + ',' + padding.top + ')',
								ref: function ref(el) {
									return _this2.tree = el;
								},
								viewBox: '0 0 400 240',
								'class': _index2.default.graph,
								width: width,
								height: height },
							(0, _preact.h)(
								'g',
								null,
								(0, _preact.h)(
									'g',
									{ 'class': _index2.default.links },
									linkData && linkData.map(function (d, index) {
										return (0, _preact.h)(
											'g',
											{ key: index },
											(0, _preact.h)('line', { x1: d.source.x, y1: d.source.y, x2: d.target.x, y2: d.target.y, stroke: '#5f5f5f' })
										);
									})
								),
								(0, _preact.h)(
									'g',
									{ 'class': _index2.default.nodes },
									descendantsData && descendantsData.map(function (d, index) {
										return (0, _preact.h)(
											'g',
											{
												onMouseOut: interactive ? _this2.handleMouseOut : null,
												onMouseMove: interactive ? function (e) {
													return _this2.handleMouseOver(e, d, index);
												} : null,
												onMouseOver: interactive ? function (e) {
													return _this2.handleMouseOver(e, d, index);
												} : null,
												'class': _index2.default.node },
											(0, _preact.h)('circle', {
												'class': _index2.default.solid,
												cx: d.x,
												cy: d.y,
												r: activeIdx === index ? "18" : "14",
												key: index + 1,
												fill: activeIdx === index ? hoverColor : backgroundColor }),
											(0, _preact.h)(
												'text',
												{
													fill: activeIdx === index ? "#fff" : "#000",
													'class': _index2.default.label,
													dx: d.x - 9,
													dy: d.y + 5 },
												d.data.name
											)
										);
									})
								)
							)
						)
					);
				}
			case 'treemap':
			case 'partition':
				{
					var _props = this.props,
					    rectPadding = _props.rectPadding,
					    paddingOuter = _props.paddingOuter,
					    paddingInner = _props.paddingInner,
					    paddingLeft = _props.paddingLeft,
					    paddingRight = _props.paddingRight,
					    paddingTop = _props.paddingTop,
					    paddingBottom = _props.paddingBottom,
					    tile = _props.tile,
					    ratio = _props.ratio;

					var layout = type === 'treemap' ? d3.treemap() : d3.partition();
					layout.size([width, height]);
					if (type === 'treemap') {
						paddingOuter ? layout.paddingOuter(paddingOuter) : '';
						paddingInner ? layout.paddingInner(paddingInner) : '';
						paddingLeft ? layout.paddingLeft(paddingLeft) : '';
						paddingRight ? layout.paddingRight(paddingRight) : '';
						paddingTop ? layout.paddingTop(paddingTop) : '';
						paddingBottom ? layout.paddingBottom(paddingBottom) : '';
						rectPadding ? layout.padding(rectPadding) : '';
						/* paddingTop, paddingRight, Left and Bottom available */
						// treemapDice,treemapSlice,treemapSquarify,treemapResquarify
						switch (tile) {
							case 'treemapBinary':
								layout.tile(d3.treemapBinary);
								break;
							case 'treemapDice':
								layout.tile(d3.treemapDice);
								break;
							case 'treemapSlice':
								layout.tile(d3.treemapSlice);
								break;
							case 'treemapResquarify':
								layout.tile(d3.treemapResquarify);
								break;
							default:
								layout.tile(d3.treemapSquarify.ratio(ratio));
						}
					}
					if (type === 'partition') {
						layout.padding(this.props.partitionPadding);
					}
					root.sum(function (d) {
						return d.value;
					});
					layout(root);
					var _data = root.descendants();
					return (0, _preact.h)(
						'div',
						{ 'class': _index2.default.container },
						(0, _preact.h)(_Tooltip2.default, tooltip),
						(0, _preact.h)(
							'svg',
							{ viewBox: '0 0 405 310', ref: function ref(el) {
									return _this2.treemap = el;
								}, width: width - padding.left - padding.right, height: height - padding.top - padding.bottom },
							(0, _preact.h)(
								'g',
								{ transform: 'translate(1,0)' },
								_data && _data.map(function (d, index) {
									return (0, _preact.h)(
										'g',
										{
											onMouseOut: interactive ? _this2.handleMouseOut : null,
											onMouseMove: interactive ? function (e) {
												return _this2.handleMouseOver(e, d, index);
											} : null,
											onMouseOver: interactive ? function (e) {
												return _this2.handleMouseOver(e, d, index);
											} : null,
											key: index + 1, 'class': _index2.default.node, transform: 'translate(' + [d.x0, d.y0] + ')' },
										(0, _preact.h)('rect', {
											width: d.x1 - d.x0,
											height: d.y1 - d.y0,
											stroke: '#2f2f2f',
											fill: activeIdx === index ? hoverColor : backgroundColor }),
										(0, _preact.h)(
											'text',
											{
												dx: '3',
												dy: '15',
												fill: activeIdx === index ? "#fff" : "#000" },
											d.data.name
										)
									);
								})
							)
						)
					);
				}
			case 'pack':
				{
					var packLayout = d3.pack();
					packLayout.size([width - padding.left - padding.right, height - padding.bottom - padding.top - 20]);
					packLayout.padding(this.props.packPadding);

					root.sum(function (d) {
						return d.value;
					});
					packLayout(root);
					var packData = root.descendants();

					return (0, _preact.h)(
						'div',
						{ 'class': _index2.default.container },
						(0, _preact.h)(_Tooltip2.default, tooltip),
						(0, _preact.h)(
							'svg',
							{ ref: function ref(el) {
									return _this2.pack = el;
								}, width: width, height: height },
							(0, _preact.h)(
								'g',
								{ transform: 'translate(0,10)' },
								packData && packData.map(function (d, index) {
									return (0, _preact.h)(
										'g',
										{
											onMouseOut: interactive ? _this2.handleMouseOut : null,
											onMouseMove: interactive ? function (e) {
												return _this2.handleMouseOver(e, d, index);
											} : null,
											onMouseOver: interactive ? function (e) {
												return _this2.handleMouseOver(e, d, index);
											} : null,
											key: index + 1,
											'class': _index2.default.node,
											transform: 'translate(' + [d.x, d.y] + ')' },
										(0, _preact.h)('circle', {
											r: d.r,
											fill: activeIdx === index ? hoverColor : backgroundColor,
											stroke: '#2f2f2f'
										}),
										(0, _preact.h)(
											'text',
											{
												dy: '4',
												dx: '-10',
												fill: activeIdx === index ? "#fff" : "#000" },
											d.children === undefined ? d.data.name : ''
										)
									);
								})
							)
						)
					);
				}
			case 'sunburst':
				{
					var _props2 = this.props,
					    radius = _props2.radius,
					    angle = _props2.angle,
					    dataKey = _props2.dataKey,
					    _padding = _props2.padding;


					var color = d3.scaleOrdinal(d3.schemeCategory20);
					// 如果没有指定，则默认是长度或者宽度的一半
					radius = radius ? radius : Math.min(width, height) / 2;

					var sunburstLayout = d3.partition();
					sunburstLayout.size([2 * Math.PI * angle, radius * radius]);
					var arc = d3.arc().startAngle(function (d) {
						return d.x0;
					}).endAngle(function (d) {
						return d.x1;
					}).innerRadius(function (d) {
						return Math.sqrt(d.y0);
					}).outerRadius(function (d) {
						return Math.sqrt(d.y1);
					});

					root.sum(function (d) {
						return d[dataKey];
					});

					sunburstLayout(root);
					var sunburstData = root.descendants();
					var top = _padding.top,
					    right = _padding.right,
					    bottom = _padding.bottom,
					    left = _padding.left;

					var contentArr = content.indexOf(',') > -1 ? content.split(',') : [];
					return (0, _preact.h)(
						'div',
						{ 'class': _index2.default.container, style: { padding: top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px' } },
						(0, _preact.h)(_Tooltip2.default, tooltip),
						(0, _preact.h)(
							'ul',
							{ 'class': _index2.default.showText },
							contentArr.length > 0 ? contentArr.map(function (d, index) {
								return (0, _preact.h)(
									'li',
									{ key: index },
									d
								);
							}) : (0, _preact.h)(
								'li',
								null,
								content
							)
						),
						(0, _preact.h)(
							'svg',
							{ ref: function ref(el) {
									return _this2.pack = el;
								}, width: width, height: height },
							(0, _preact.h)(
								'g',
								{ 'class': _index2.default.node, transform: 'translate(' + width / 2 + ', ' + height * .52 + ' )' },
								sunburstData && sunburstData.map(function (d, index) {
									return (0, _preact.h)(
										'g',
										{
											onMouseOut: interactive ? _this2.handleMouseOut : null,
											onMouseMove: interactive ? function (e) {
												return _this2.handleMouseOver(e, d, index);
											} : null,
											onMouseOver: interactive ? function (e) {
												return _this2.handleMouseOver(e, d, index);
											} : null,
											onClick: interactive ? function (e) {
												return _this2.handleClick(e, d, index);
											} : null,
											key: index + 1 },
										(0, _preact.h)('path', {
											style: { display: d.depth === 0 ? 'none' : 'block', opacity: sunburstHighlight && activeIdx !== index ? 0.3 : 1 },
											d: arc(d),
											fill: color((d.children ? d : d.parent).data.name),
											'fill-rule': 'evenodd',
											stroke: '#fff'
										}),
										false && (0, _preact.h)(
											'text',
											{
												transform: 'translate(' + arc.centroid(d) + ') rotate(' + _this2.computeTextRotation(d) + ')',
												dy: '.5em',
												dx: '-8',
												fill: activeIdx === index ? "#fff" : "#000" },
											d.parent ? d.data.name : ''
										)
									);
								})
							)
						)
					);
				}
		}
	};

	return HierarchyLayout;
}(_preact.Component), _class.defaultProps = {
	width: 400,
	height: 300,
	padding: { left: 0, right: 0, top: 0, bottom: 0 },
	dataKey: '',
	nameKey: '',
	type: 'tree',
	tile: 'treemapSquarify', //表示生成矩形树的tiling method 算法
	ratio: 2, // 当tile为 treemapSquarify,才有效，表示生成矩形的理论长宽比
	paddingOuter: 20,
	paddingInner: 0,
	rectPadding: 0,
	paddingLeft: 0,
	paddingRight: 0,
	paddingTop: 0,
	paddingBottom: 0,
	partitionPadding: 0, //partition's padding
	packPadding: 10, // pack's padding
	angle: 1, // SunburstLayout 的angle范围[0-1]
	backgroundColor: '#CDDC39', // 默认背景颜色
	hoverColor: 'rgba(139,195,74,0.8)', // 悬浮颜色
	onClick: null
}, _temp);
exports.default = HierarchyLayout;
//# sourceMappingURL=HierarchyLayout.js.map