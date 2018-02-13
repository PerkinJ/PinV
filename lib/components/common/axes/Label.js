'use strict';

exports.__esModule = true;

var _class, _temp;

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Label = (_temp = _class = function (_Component) {
	_inherits(Label, _Component);

	function Label() {
		_classCallCheck(this, Label);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Label.prototype.render = function render() {
		var props = this.props;

		if (!props.label) {
			return (0, _preact.h)('text', null);
		}
		var transform = void 0,
		    x = void 0,
		    y = void 0;
		if (props.orient === 'top' || props.orient === 'bottom') {
			transform = props.verticalTransform;
			x = props.width / 2;
			y = props.offset;

			if (props.horizontalChart) {
				transform = 'rotate(180 ' + x + ' ' + y + ') ' + transform;
			}
		} else {
			// left, right
			transform = props.horizontalTransform;
			x = -props.height / 2;
			if (props.orient === 'left') {
				y = -props.offset;
			} else {
				y = props.offset;
			}
		}

		return (0, _preact.h)(
			'text',
			{
				strokeWidth: props.strokeWidth.toString(),
				textAnchor: props.textAnchor,
				transform: transform,
				y: y,
				x: x,
				stroke: props.textColor
			},
			props.label
		);
	};

	return Label;
}(_preact.Component), _class.defaultProps = {
	horizontalTransform: 'rotate(270)',
	strokeWidth: 0.01,
	textAnchor: 'middle',
	textColor: '#000',
	verticalTransform: 'rotate(0)'
}, _temp);
exports.default = Label;
//# sourceMappingURL=Label.js.map