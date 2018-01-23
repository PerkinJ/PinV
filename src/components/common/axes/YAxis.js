import { h, Component } from 'preact'
import * as d3 from 'd3'
import AxisTicks from './AxisTicks'
import AxisLine from './AxisLine'
import Label from './Label'

class YAxis extends Component {
	static defaultProps = {
		fill: 'none',
		stroke: '#000',
		strokeWidth: '1',
		tickStroke: '#000',
		tickTextStroke:'#000',
		yAxisClassName: 'rd3-y-axis',
		yAxisLabel: '',
		yAxisOffset: 0,
		xOrient: 'bottom',
		yOrient: 'left',
		textColor:'#000'
	}
	render() {

		let props = this.props

		let t
		if (props.yOrient === 'right') {
			t = `translate(${props.yAxisOffset + props.width}, 0)`
		} else {
			t = `translate(${props.yAxisOffset}, 0)`
		}

		let tickArguments
		if (props.yAxisTickCount) {
			tickArguments = [props.yAxisTickCount]
		}

		if (props.yAxisTickInterval) {
			tickArguments = [d3.time[props.yAxisTickInterval.unit], props.yAxisTickInterval.interval]
		}
		return (
			<g
				className={props.yAxisClassName}
				transform={t}
			>
				<AxisTicks
					innerTickSize={props.tickSize}
					orient={props.yOrient}
					orient2nd={props.xOrient}
					tickArguments={tickArguments}
					tickFormatting={props.tickFormatting}
					tickStroke={props.tickStroke}
					tickTextStroke={props.tickTextStroke}
					tickValues={props.yAxisTickValues}
					scale={props.yScale}
					height={props.height}
					width={props.width}
					horizontalChart={props.horizontalChart}
					gridHorizontal={props.gridHorizontal}
					gridHorizontalStroke={props.gridHorizontalStroke}
					gridHorizontalStrokeWidth={props.gridHorizontalStrokeWidth}
					gridHorizontalStrokeDash={props.gridHorizontalStrokeDash}
				/>
				<AxisLine
					orient={props.yOrient}
					outerTickSize={props.tickSize}
					scale={props.yScale}
					stroke={props.stroke}
					{...props}
				/>
				<Label
					height={props.height}
					horizontalChart={props.horizontalChart}
					label={props.yAxisLabel}
					margins={props.margins}
					offset={props.yAxisLabelOffset}
					orient={props.yOrient}
					textColor={props.textColor}
				/>
			</g>
		)
	}
}
export default YAxis
