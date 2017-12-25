'use strict';

exports.__esModule = true;

var _preact = require('preact');

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tooltip = function Tooltip(_ref) {
	var content = _ref.content,
	    tooltipStyle = _ref.tooltipStyle,
	    contentArr = _ref.contentArr;

	return (0, _preact.h)(
		'div',
		{ 'class': _index2.default.tooltip, style: tooltipStyle },
		contentArr ? contentArr.map(function (d, index) {
			return (0, _preact.h)(
				'div',
				{ key: index },
				d.key,
				':',
				d.value
			);
		}) : content
	);
};

exports.default = Tooltip;
//# sourceMappingURL=Tooltip.js.map