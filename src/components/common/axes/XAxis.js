import { h, Component } from 'preact'
import * as d3 from 'd3'
import AxisTicks from './AxisTicks'
import AxisLine from './AxisLine'
import Label from './Label'

class XAxis extends Component {
	static defaultProps = {
		fill: 'none',
		stroke: 'none',
		strokeWidth: '1',
		tickStroke: '#000',
		tickTextStroke:'#000',
		xAxisClassName: 'rd3-x-axis',
		xAxisLabel: '',
		xAxisLabelOffset: 10,
		xAxisOffset: 0,
		xOrient: 'bottom',
		yOrient: 'left',
		textColor:'#000'
	}
	render() {
		let props = this.props

		let t = `translate(0 ,${props.xAxisOffset + props.height})`

		let tickArguments
		if (typeof props.xAxisTickCount !== 'undefined') {
			tickArguments = [props.xAxisTickCount]
		}

		if (typeof props.xAxisTickInterval !== 'undefined') {
			tickArguments = [d3.timeFormat[props.xAxisTickInterval.unit], props.xAxisTickInterval.interval]
		}

		return (
			<g
				className={props.xAxisClassName}
				transform={t}
			>
				<AxisTicks
					tickValues={props.xAxisTickValues}
					tickFormatting={props.tickFormatting}
					tickArguments={tickArguments}
					tickStroke={props.tickStroke}
					tickTextStroke={props.tickTextStroke}
					innerTickSize={props.tickSize}
					scale={props.xScale}
					orient={props.xOrient}
					orient2nd={props.yOrient}
					height={props.height}
					width={props.width}
					horizontalChart={props.horizontalChart}
					gridVertical={props.gridVertical}
					gridVerticalStroke={props.gridVerticalStroke}
					gridVerticalStrokeWidth={props.gridVerticalStrokeWidth}
					gridVerticalStrokeDash={props.gridVerticalStrokeDash}
				/>
				<AxisLine
					scale={props.xScale}
					stroke={props.stroke}
					orient={props.xOrient}
					outerTickSize={props.tickSize}
					{...props}
				/>
				<Label
					horizontalChart={props.horizontalChart}
					label={props.xAxisLabel}
					offset={props.xAxisLabelOffset}
					orient={props.xOrient}
					margins={props.margins}
					width={props.width}
					textColor={props.textColor}
				/>
			</g>
		)
	}
}
export default XAxis
