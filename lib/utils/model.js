'use strict';

exports.__esModule = true;
exports.getPieData = getPieData;

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getPieData(data, key) {
	var startAngle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	var endAngle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

	// 限制在[0,1]之间
	if (startAngle >= endAngle || startAngle < 0 || startAngle > 1) {
		startAngle = 0;
	}
	if (endAngle <= startAngle || endAngle < 0 || endAngle > 1) {
		endAngle = 1;
	}
	var pie = d3.pie().startAngle(Math.PI * 2 * startAngle).endAngle(Math.PI * 2 * endAngle).value(function (d) {
		return d[key];
	});
	return pie(data);
} // 数据转换函数库
//# sourceMappingURL=model.js.map