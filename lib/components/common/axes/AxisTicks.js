'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AxisTicks = (_temp = _class = function (_Component) {
	_inherits(AxisTicks, _Component);

	function AxisTicks() {
		_classCallCheck(this, AxisTicks);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	AxisTicks.prototype.render = function render() {
		var props = this.props;

		var tr = void 0,
		    ticks = void 0,
		    scale = void 0,
		    adjustedScale = void 0,

		// orient,
		textAnchor = void 0,
		    textTransform = void 0,
		    tickFormat = void 0,
		    y1 = void 0,
		    y2 = void 0,
		    dy = void 0,
		    x1 = void 0,
		    x2 = void 0;

		var gridStrokeWidth = void 0,
		    gridStroke = void 0,
		    gridStrokeDashArray = void 0,
		    x2grid = void 0,
		    y2grid = void 0;
		var gridOn = false;

		var sign = props.orient === 'top' || props.orient === 'right' ? -1 : 1;
		var tickSpacing = Math.max(props.innerTickSize, 0) + props.tickPadding;
		scale = props.scale;

		if (props.tickValues) {
			ticks = props.tickValues;
		} else if (scale.ticks) {
			ticks = scale.ticks.apply(scale, props.tickArguments);
		} else {
			ticks = scale.domain();
		}

		if (props.tickFormatting) {
			tickFormat = props.tickFormatting;
		} else if (scale.tickFormat) {
			tickFormat = scale.tickFormat.apply(scale, props.tickArguments);
		} else {
			tickFormat = function tickFormat(d) {
				return d;
			};
		}

		adjustedScale = scale.rangeBand ? function (d) {
			return scale(d) + scale.rangeBand() / 2;
		} : scale;
		// Still working on this
		// Ticks and lines are not fully aligned
		// in some orientations
		switch (props.orient) {
			case 'top':
				tr = function tr(tick) {
					return 'translate(' + adjustedScale(tick) + ',0)';
				};
				textAnchor = "middle";
				y2 = props.innerTickSize * sign;
				y1 = tickSpacing * sign;
				dy = sign < 0 ? "0em" : ".71em";
				x2grid = 0;
				y2grid = -props.height;
				break;
			case 'bottom':
				tr = function tr(tick) {
					return 'translate(' + adjustedScale(tick) + ',0)';
				};
				textAnchor = "middle";
				y2 = props.innerTickSize * sign;
				y1 = tickSpacing * sign;
				x1 = -10; // 手动添加偏移
				dy = sign < 0 ? "0em" : ".71em";
				x2grid = 0;
				y2grid = -props.height;
				break;
			case 'left':
				tr = function tr(tick) {
					return 'translate(0,' + adjustedScale(tick) + ')';
				};
				textAnchor = "end";
				x2 = props.innerTickSize * -sign;
				x1 = tickSpacing * -sign - 20; // 手动添加偏移
				dy = ".32em";
				x2grid = props.width;
				y2grid = 0;
				break;
			case 'right':
				tr = function tr(tick) {
					return 'translate(0,' + adjustedScale(tick) + ')';
				};
				textAnchor = "start";
				x2 = props.innerTickSize * -sign;
				x1 = tickSpacing * -sign;
				dy = ".32em";
				x2grid = -props.width;
				y2grid = 0;
				break;
		}

		if (props.horizontalChart) {
			textTransform = "rotate(-90)"[(y1, x1)] = [x1, -y1 || 0];

			switch (props.orient) {
				case 'top':
					textAnchor = "start";
					dy = ".32em";
					break;
				case 'bottom':
					textAnchor = "end";
					dy = ".32em";
					break;
				case 'left':
					textAnchor = 'middle';
					dy = sign < 0 ? ".71em" : "0em";
					break;
				case 'right':
					textAnchor = 'middle';
					dy = sign < 0 ? ".71em" : "0em";
					break;
			}
		}

		if (props.gridHorizontal) {
			gridOn = true;
			gridStrokeWidth = props.gridHorizontalStrokeWidth;
			gridStroke = props.gridHorizontalStroke;
			gridStrokeDashArray = props.gridHorizontalStrokeDash;
		} else if (props.gridVertical) {
			gridOn = true;
			gridStrokeWidth = props.gridVerticalStrokeWidth;
			gridStroke = props.gridVerticalStroke;
			gridStrokeDashArray = props.gridVerticalStrokeDash;
		}

		// return grid line if grid is enabled and grid line is not on at same position as other axis.
		var gridLine = function gridLine(pos) {
			if (gridOn && !(props.orient2nd == 'left' && pos == 0) && !(props.orient2nd == 'right' && pos == props.width) && !((props.orient == 'left' || props.orient == 'right') && pos == props.height)) {
				return (0, _preact.h)('line', { style: {
						strokeWidth: gridStrokeWidth,
						shapeRendering: 'crispEdges',
						stroke: gridStroke,
						strokeDasharray: gridStrokeDashArray
					}, x2: x2grid, y2: y2grid });
			}
		};

		var optionalTextProps = textTransform ? {
			transform: textTransform
		} : {};

		return (0, _preact.h)(
			'g',
			null,
			ticks.map(function (tick, idx) {
				return (0, _preact.h)(
					'g',
					{ key: idx, className: 'tick', transform: tr(tick) },
					gridLine(adjustedScale(tick)),
					(0, _preact.h)('line', { style: { shapeRendering: 'crispEdges', opacity: '1', stroke: props.tickStroke }, x2: x2, y2: y2 }),
					(0, _preact.h)(
						'text',
						_extends({
							strokeWidth: '0.01',
							dy: dy, x: x1, y: y1,
							style: { stroke: props.tickTextStroke, fill: props.tickTextStroke },
							textAnchor: textAnchor
						}, optionalTextProps),
						tickFormat(tick)
					)
				);
			})
		);
	};

	return AxisTicks;
}(_preact.Component), _class.defaultProps = {
	innerTickSize: 6,
	outerTickSize: 6,
	tickStroke: '#000',
	tickPadding: 3,
	tickArguments: [10],
	tickValues: null,
	gridHorizontal: false,
	gridVertical: false,
	gridHorizontalStroke: '#D8D7D7',
	gridVerticalStroke: '#D8D7D7',
	gridHorizontalStrokeWidth: 1,
	gridVerticalStrokeWidth: 1,
	gridHorizontalStrokeDash: '5, 5',
	gridVerticalStrokeDash: '5, 5'
}, _temp);
exports.default = AxisTicks;
//# sourceMappingURL=AxisTicks.js.map