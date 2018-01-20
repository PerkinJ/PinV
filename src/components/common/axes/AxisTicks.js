import { h, Component } from 'preact'

class AxisTicks extends Component {
	static defaultProps = {
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
	}
	render() {
		let props = this.props

		let tr,
			ticks,
			scale,
			adjustedScale,
			// orient,
			textAnchor,
			textTransform,
			tickFormat,
			y1, y2, dy,  x1, x2

		let gridStrokeWidth,
			gridStroke,
			gridStrokeDashArray,
			x2grid,
			y2grid
		let gridOn = false

		let sign = props.orient === 'top' || props.orient === 'right' ? -1 : 1
		let tickSpacing = Math.max(props.innerTickSize, 0) + props.tickPadding

		scale = props.scale

		if (props.tickValues) {
			ticks = props.tickValues
		} else if (scale.ticks) {
			ticks = scale.ticks.apply(scale, props.tickArguments)
		} else {
			ticks = scale.domain()
		}

		if (props.tickFormatting) {
			tickFormat = props.tickFormatting
		} else if (scale.tickFormat) {
			tickFormat = scale.tickFormat.apply(scale, props.tickArguments)
		} else {
			tickFormat = (d) => d
		}

		adjustedScale = scale.rangeBand ? (d) => { return scale(d) + scale.rangeBand() / 2 } : scale


		// Still working on this
		// Ticks and lines are not fully aligned
		// in some orientations
		switch (props.orient) {
			case 'top':
				tr = (tick) => `translate(${adjustedScale(tick)},0)`
				textAnchor = "middle"
				y2 = props.innerTickSize * sign
				y1 = tickSpacing * sign
				dy = sign < 0 ? "0em" : ".71em"
				x2grid = 0
				y2grid = -props.height
				break
			case 'bottom':
				tr = (tick) => `translate(${adjustedScale(tick)},0)`
				textAnchor = "middle"
				y2 = props.innerTickSize * sign
				y1 = tickSpacing * sign
				dy = sign < 0 ? "0em" : ".71em"
				x2grid = 0
				y2grid = -props.height
				break
			case 'left':
				tr = (tick) => `translate(0,${adjustedScale(tick)})`
				textAnchor = "end"
				x2 = props.innerTickSize * -sign
				x1 = tickSpacing * -sign
				dy = ".32em"
				x2grid = props.width
				y2grid = 0
				break
			case 'right':
				tr = (tick) => `translate(0,${adjustedScale(tick)})`
				textAnchor = "start"
				x2 = props.innerTickSize * -sign
				x1 = tickSpacing * -sign
				dy = ".32em"
				x2grid = -props.width
				y2grid = 0
				break
		}

		if (props.horizontalChart) {
			textTransform = "rotate(-90)" [y1, x1] = [x1, -y1 || 0]

			switch (props.orient) {
				case 'top':
					textAnchor = "start"
					dy = ".32em"
					break
				case 'bottom':
					textAnchor = "end"
					dy = ".32em"
					break
				case 'left':
					textAnchor = 'middle'
					dy = sign < 0 ? ".71em" : "0em"
					break
				case 'right':
					textAnchor = 'middle'
					dy = sign < 0 ? ".71em" : "0em"
					break
			}
		}

		if (props.gridHorizontal) {
			gridOn = true
			gridStrokeWidth = props.gridHorizontalStrokeWidth
			gridStroke = props.gridHorizontalStroke
			gridStrokeDashArray = props.gridHorizontalStrokeDash
		}
		else if (props.gridVertical) {
			gridOn = true
			gridStrokeWidth = props.gridVerticalStrokeWidth
			gridStroke = props.gridVerticalStroke
			gridStrokeDashArray = props.gridVerticalStrokeDash
		}

		// return grid line if grid is enabled and grid line is not on at same position as other axis.
		let gridLine = function (pos) {
			if (gridOn
				&& !(props.orient2nd == 'left' && pos == 0)
				&& !(props.orient2nd == 'right' && pos == props.width)
				&& !((props.orient == 'left' || props.orient == 'right') && pos == props.height)
			) {
				return (
					<line style={{
						strokeWidth: gridStrokeWidth,
						shapeRendering: 'crispEdges',
						stroke: gridStroke,
						strokeDasharray: gridStrokeDashArray
					}} x2={x2grid} y2={y2grid} />
				)
			}
		}

		let optionalTextProps = textTransform ? {
			transform: textTransform
		} : {}

		return (
			<g>
				{ticks.map((tick, idx) => {
					return (
						<g key={idx} className="tick" transform={tr(tick)} >
							{gridLine(adjustedScale(tick))}
							<line style={{ shapeRendering: 'crispEdges', opacity: '1', stroke: props.tickStroke }} x2={x2} y2={y2} />
							<text
								strokeWidth="0.01"
								dy={dy} x={x1} y={y1}
								style={{ stroke: props.tickTextStroke, fill: props.tickTextStroke }}
								textAnchor={textAnchor}
								{...optionalTextProps}
							>
								{tickFormat(tick)}
							</text>
						</g>
					)
				})
				}
			</g>
		)
	}
}
export default AxisTicks
