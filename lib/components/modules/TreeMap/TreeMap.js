'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeMap = (_temp = _class = function (_Component) {
	_inherits(TreeMap, _Component);

	function TreeMap(props) {
		_classCallCheck(this, TreeMap);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.sumBySize = function (d) {
			return d[_this.props.value];
		};

		_this.state = {};
		return _this;
	}

	TreeMap.prototype.render = function render(_ref) {
		var data = _ref.data,
		    width = _ref.width,
		    height = _ref.height,
		    paddingInner = _ref.paddingInner;

		var fader = function fader(color) {
			return d3.interpolateRgb(color, "#fff")(0.2);
		},
		    color = d3.scaleOrdinal(d3.schemeCategory20c.map(fader)),
		    format = d3.format(",d");

		var treemap = d3.treemap().tile(d3.treemapResquarify).size([width, height]).round(true).paddingInner(paddingInner);
		var treemapData = [];
		if (JSON.stringify(data) !== '{}') {
			var root = d3.hierarchy(data).eachBefore(function (d) {
				return d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
			}).sum(this.sumBySize).sort(function (a, b) {
				return b.height - a.height || b.value - a.value;
			});

			treemap(root);
			treemapData = root.leaves();
		}

		return (0, _preact.h)(
			'svg',
			{ width: width, height: height, style: { fontSize: 10 } },
			treemapData.length > 0 && treemapData.map(function (d, index) {
				return (0, _preact.h)(
					'g',
					{ key: index, transform: 'translate(' + d.x0 + ',' + d.y0 + ')' },
					(0, _preact.h)('rect', {
						id: d.data.id,
						width: d.x1 - d.x0,
						height: d.y1 - d.y0,
						fill: color(d.parent.data.id) }),
					(0, _preact.h)(
						'clipPath',
						{ id: 'clip-' + d.data.id },
						(0, _preact.h)('use', { href: '#' + d.data.id })
					),
					(0, _preact.h)(
						'text',
						{ 'clip-path': 'url(#clip-' + d.data.id + ')' },
						(0, _preact.h)(
							'tspan',
							{ x: 4, y: 12 },
							d.data.name.split(/(?=[A-Z][^A-Z])/g)
						)
					),
					(0, _preact.h)(
						'title',
						null,
						d.data.id + "\n" + format(d.value)
					)
				);
			})
		);
	};

	return TreeMap;
}(_preact.Component), _class.defaultProps = {
	width: 960,
	height: 600,
	paddingInner: 1,
	value: 'value'
}, _temp);
exports.default = TreeMap;
//# sourceMappingURL=TreeMap.js.map