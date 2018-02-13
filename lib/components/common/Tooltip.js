'use strict';

exports.__esModule = true;

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tooltip = function (_Component) {
	_inherits(Tooltip, _Component);

	function Tooltip(props) {
		_classCallCheck(this, Tooltip);

		return _possibleConstructorReturn(this, _Component.call(this, props));
	}

	Tooltip.prototype.render = function render() {
		var props = this.props;
		var display = this.props.show ? 'inherit' : 'none';
		var containerStyles = { position: 'fixed', top: props.y, left: props.x, display: display, opacity: 0.8
			//TODO: add 'right: 0px' style when tooltip is off the chart
		};var tooltipStyles = {
			position: 'absolute',
			backgroundColor: 'white',
			border: '1px solid',
			borderColor: '#ddd',
			borderRadius: '2px',
			padding: '10px',
			marginLeft: '10px',
			marginRight: '10px',
			marginTop: '-15px'
		};
		return (0, _preact.h)(
			'div',
			{ style: containerStyles },
			(0, _preact.h)(
				'div',
				{ style: tooltipStyles },
				props.child
			)
		);
	};

	return Tooltip;
}(_preact.Component);

exports.default = Tooltip;
//# sourceMappingURL=Tooltip.js.map