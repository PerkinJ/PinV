'use strict';

exports.__esModule = true;

var _preact = require('preact');

var styles = {
	tooltip: {
		position: 'fixed',
		width: 'auto',
		height: 'auto',
		opacity: 0,
		textAlign: 'center',
		borderRadiu: 3,
		background: '#fff',
		padding: '10px 20px',
		border: '1px solid #ccc',
		zIndex: 999
	}
};
var Tooltip = function Tooltip(_ref) {
	var content = _ref.content,
	    tooltipStyle = _ref.tooltipStyle,
	    contentArr = _ref.contentArr;

	return (0, _preact.h)(
		'div',
		{ id: 'tooltip', 'class': styles.tooltip, style: tooltipStyle },
		contentArr && contentArr.map(function (d, index) {
			return (0, _preact.h)(
				'div',
				{ key: index },
				d.key,
				':',
				d.value
			);
		}),
		content && content
	);
};

exports.default = Tooltip;
//# sourceMappingURL=Tooltip.js.map