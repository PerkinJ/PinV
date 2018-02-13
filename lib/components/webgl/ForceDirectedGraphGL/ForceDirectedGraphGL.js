'use strict';

exports.__esModule = true;

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _preact = require('preact');

var _utils = require('../../../utils/utils');

var _Tooltip = require('../../common/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ForceGLLayout = function (_Component) {
	_inherits(ForceGLLayout, _Component);

	function ForceGLLayout() {
		_classCallCheck(this, ForceGLLayout);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	ForceGLLayout.prototype.componentDidMount = function componentDidMount() {
		var _props = this.props,
		    data = _props.data,
		    width = _props.width,
		    height = _props.height;


		var scene = new THREE.Scene();
		var camera = new THREE.OrthographicCamera(0, width, height, 0, 1, 1000);
		var renderer = new THREE.WebGLRenderer({
			antialias: true,
			precision: 'highp',
			alpha: true
		});
		var container = this.glGontainer;
		renderer.setSize(width, height);
		renderer.setPixelRatio(window.devicePixelRatio);
		container.appendChild(renderer.domElement);
		camera.position.z = 5;

		data.nodes.forEach(function (node) {
			node.geometry = new THREE.CircleBufferGeometry(5, 32);
			node.material = new THREE.MeshBasicMaterial({ color: (0, _utils.colour)(node.id) });
			node.circle = new THREE.Mesh(node.geometry, node.material);
			scene.add(node.circle);
		});

		data.links.forEach(function (link) {
			link.material = new THREE.LineBasicMaterial({ color: 0xAAAAAA });
			link.geometry = new THREE.Geometry();
			link.line = new THREE.Line(link.geometry, link.material);
			scene.add(link.line);
		});

		var simulationGl = d3.forceSimulation().force('link', d3.forceLink().id(function (d) {
			return d.id;
		})).force('charge', d3.forceManyBody()).force('center', d3.forceCenter(width / 2, height / 2));

		simulationGl.nodes(data.nodes).on('tick', ticked);

		simulationGl.force('link').links(data.links);

		d3.select(this.glGontainer).call(d3.drag().container(this.glGontainer).subject(getClosestNode).on('start', dragstarted).on('drag', dragged).on('end', dragended));

		function getClosestNode() {
			return simulationGl.find(d3.event.x, d3.event.y);
		}
		var _this = this;

		function dragstarted() {
			if (!d3.event.active) simulationGl.alphaTarget(0.3).restart();
			d3.event.subject.fx = d3.event.subject.x;
			d3.event.subject.fy = d3.event.subject.y;
			_this.setState({
				tooltip: {
					x: d3.event.subject.x,
					y: d3.event.subject.y,
					child: 'test',
					show: true
				}
			});
		}
		function dragged() {
			d3.event.subject.fx = d3.event.x;
			d3.event.subject.fy = d3.event.y;
		}
		function dragended() {
			if (!d3.event.active) simulationGl.alphaTarget(0);
			d3.event.subject.fx = null;
			d3.event.subject.fy = null;
		}

		function ticked() {
			data.nodes.forEach(function (node) {
				var x = node.x,
				    y = node.y,
				    circle = node.circle;

				circle.position.set(x, y, 0);
			});

			data.links.forEach(function (link) {
				var source = link.source,
				    target = link.target,
				    line = link.line;

				line.geometry.verticesNeedUpdate = true;
				line.geometry.vertices[0] = new THREE.Vector3(source.x, source.y, -1);
				line.geometry.vertices[1] = new THREE.Vector3(target.x, target.y, -1);
			});

			renderer.render(scene, camera);
		}
	};

	ForceGLLayout.prototype.render = function render(_ref, _ref2) {
		var _this3 = this;

		var tooltip = _ref2.tooltip;

		_objectDestructuringEmpty(_ref);

		return (0, _preact.h)(
			'div',
			{ ref: function ref(el) {
					return _this3.glGontainer = el;
				} },
			(0, _preact.h)(_Tooltip2.default, tooltip)
		);
	};

	return ForceGLLayout;
}(_preact.Component);

exports.default = ForceGLLayout;
//# sourceMappingURL=ForceDirectedGraphGL.js.map