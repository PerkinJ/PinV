import { h } from 'preact'
import * as d3 from 'd3'
import { handleD3Color } from '../../utils/utils'


const renderCircles = (props) => {
	let max = 1.2 * d3.max(props.data, (d) => d.value)
	let colorVal = handleD3Color(props.color)
	let minColor = colorVal.brighter(),
		maxColor = colorVal.darker()
	let color = d3.interpolate(minColor, maxColor)
	return (coords, index) => {
		let delta = props.width / props.data.length
		const circleProps = {
			cx: props.xScale(coords[props.XAxis]) + delta / 2,
			cy: props.yScale(coords[props.YAxis]),
			r: props.r,
			key: index,
			fill: color(props.yScale(coords[props.YAxis]) / max)
		}
		return <circle {...circleProps} />
	}
}

export default (props) => {
	return <g transform={`translate(0 ,${props.padding.top})`}>{props.data.map(renderCircles(props))}</g>
}
