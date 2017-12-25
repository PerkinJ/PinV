'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preact = require('preact');

var _HierarchyLayout = require('../../basic/HierarchyLayout');

var _HierarchyLayout2 = _interopRequireDefault(_HierarchyLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeLayout = function TreeLayout(props) {
	return (0, _preact.h)(_HierarchyLayout2.default, _extends({}, props, { type: 'tree' }));
};
exports.default = TreeLayout;
//# sourceMappingURL=TreeLayout.js.map