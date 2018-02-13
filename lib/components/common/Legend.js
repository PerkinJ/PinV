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

var Legend = (_temp = _class = function (_Component) {
	_inherits(Legend, _Component);

	function Legend() {
		_classCallCheck(this, Legend);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Legend.prototype.render = function render() {
		var props = this.props;

		var textStyle = {
			'color': 'black',
			'fontSize': '50%',
			'verticalAlign': 'top'
		};

		var legendItems = [];

		props.data.forEach(function (series, idx) {
			var itemStyle = {
				'color': props.colors(props.colorAccessor(series, idx)),
				'lineHeight': '60%',
				'fontSize': '200%'
			};
			legendItems.push((0, _preact.h)(
				'li',
				{
					key: idx,
					className: props.itemClassName,
					style: itemStyle
				},
				(0, _preact.h)(
					'span',
					{
						style: textStyle
					},
					series.name
				)
			));
		});

		var topMargin = props.margins.top;

		var legendBlockStyle = {
			'wordWrap': 'break-word',
			'width': props.width,
			'paddingLeft': '0',
			'marginBottom': '0',
			'marginTop': topMargin,
			'listStylePosition': 'inside'
		};

		return (0, _preact.h)(
			'ul',
			{
				className: props.className,
				style: legendBlockStyle
			},
			legendItems
		);
	};

	return Legend;
}(_preact.Component), _class.defaultProps = {
	className: 'rd3-Tooltip',
	colors: d3.scaleOrdinal(d3.schemeCategory20c),
	colorAccessor: function colorAccessor(d, idx) {
		return idx;
	},
	itemClassName: 'rd3-Tooltip-item',
	text: '#000'
}, _temp);
exports.default = Legend;
//# sourceMappingURL=Legend.js.map