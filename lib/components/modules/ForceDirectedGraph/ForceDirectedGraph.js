'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ForceDirecteddata = (_temp = _class = function (_Component) {
	_inherits(ForceDirecteddata, _Component);

	function ForceDirecteddata(props) {
		_classCallCheck(this, ForceDirecteddata);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.renderData = function () {
			var color = d3.scaleOrdinal(d3.schemeCategory20);

			var _this$props = _this.props,
			    data = _this$props.data,
			    width = _this$props.width,
			    height = _this$props.height,
			    interactive = _this$props.interactive,
			    velocityDecay = _this$props.velocityDecay,
			    strength = _this$props.strength,
			    collide = _this$props.collide,
			    distance = _this$props.distance;


			var simulation = d3.forceSimulation().velocityDecay(velocityDecay).force("link", d3.forceLink().id(function (d) {
				return d.id;
			})).force("charge", d3.forceManyBody().strength(strength)).force("center", d3.forceCenter(width / 2, height / 2)).force('collide', d3.forceCollide(collide));

			var svg = d3.select(_this.forceDirected);
			var link = svg.append("g").attr("class", "links").selectAll("line").data(data.links).enter().append("line").attr("stroke-width", function (d) {
				return Math.sqrt(d.value);
			}).attr('stroke', '#999').attr('stroke-opacity', 0.6);

			var node = svg.append("g").attr("class", "nodes").selectAll("circle").data(data.nodes).enter().append("circle").attr("r", 5).attr("fill", function (d) {
				return color(d.group);
			}).attr('stroke', '#fff').attr('stroke-width', '1.5').call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)).on('mouseover', interactive ? function (d) {
				return _this.handleMouseOver(d);
			} : null).on('mouseout', interactive ? _this.handleMouseOut : null).on('mousemove', interactive ? function (d) {
				return _this.handleMouseOver(d);
			} : null);

			simulation.nodes(data.nodes).on("tick", ticked);

			simulation.force("link").links(data.links).distance(distance);

			function ticked() {
				link.attr("x1", function (d) {
					return d.source.x;
				}).attr("y1", function (d) {
					return d.source.y;
				}).attr("x2", function (d) {
					return d.target.x;
				}).attr("y2", function (d) {
					return d.target.y;
				});

				node.attr("cx", function (d) {
					return d.x;
				}).attr("cy", function (d) {
					return d.y;
				});
			}

			function dragstarted(d) {
				if (!d3.event.active) simulation.alphaTarget(0.3).restart();
				d.fx = d.x;
				d.fy = d.y;
			}

			function dragged(d) {
				d.fx = d3.event.x;
				d.fy = d3.event.y;
			}

			function dragended(d) {
				if (!d3.event.active) simulation.alphaTarget(0);
				d.fx = null;
				d.fy = null;
			}
		};

		_this.handleMouseOver = function (value) {
			var tooltip = _this.props.tooltip;

			var contentArr = [];
			if (tooltip && tooltip.length > 0) {
				tooltip.forEach(function (d) {
					var str = d + ':' + value[d];
					contentArr.push(str);
				});
			}
			var tool = d3.select(_this.tooltip);
			var content = contentArr.join(',');
			tool.html(content).style('left', d3.event.pageX + 10 + 'px').style('top', d3.event.clientY + 'px').style('opacity', 1);
		};

		_this.handleMouseMove = function () {
			var tool = d3.select(_this.tooltip);
			tool.html('').style('left', d3.event.pageX + 10 + 'px').style('top', d3.event.clientY + 'px');
		};

		_this.handleMouseOut = function () {
			var tool = d3.select(_this.tooltip);
			tool.html('').style('opacity', 0);
		};

		_this.state = {};
		return _this;
	}

	ForceDirecteddata.prototype.componentWillUnmount = function componentWillUnmount() {
		// removeEvent(this.nodesContainer, 'mouseleave', this.handleMouseOut)
	};

	ForceDirecteddata.prototype.componentDidMount = function componentDidMount() {
		this.renderData();
		// addEvent(this.nodesContainer, 'mouseleave', this.handleMouseOut)
	};

	ForceDirecteddata.prototype.render = function render(_ref, _ref2) {
		var _this2 = this;

		var width = _ref.width,
		    height = _ref.height;

		_objectDestructuringEmpty(_ref2);

		return (0, _preact.h)(
			'div',
			{ 'class': _index2.default.container },
			(0, _preact.h)('div', { 'class': _index2.default.tooltip, ref: function ref(el) {
					return _this2.tooltip = el;
				} }),
			(0, _preact.h)('svg', { ref: function ref(el) {
					return _this2.forceDirected = el;
				}, width: width, height: height })
		);
	};

	return ForceDirecteddata;
}(_preact.Component), _class.defaultProps = {
	width: 1000,
	height: 500,
	interactive: true,
	tooltip: [],
	velocityDecay: 0.5,
	strength: -50,
	collide: 12.5,
	distance: 20
}, _temp);
exports.default = ForceDirecteddata;
//# sourceMappingURL=ForceDirectedGraph.js.map