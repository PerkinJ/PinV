import { h } from 'preact'
import * as d3 from 'd3'
let hsl = d3.hsl(183,0.9,0.6)
let minColor = hsl.brighter(),
	maxColor= hsl.darker()
let color = d3.interpolate(minColor,maxColor)
// let color = d3.scaleOrdinal(d3.schemeCategory10)

const renderCircles = (props) => {
	let max = 1.2*d3.max(props.data,(d)=>d.value)
	return (coords, index) => {
		let delta = props.width / props.data.length
		const circleProps = {
			cx: props.xScale(coords[props.XAxis]) + delta/2,
			cy: props.yScale(coords[props.YAxis]),
			r: 4,
			key: index,
			fill:color(props.yScale(coords[props.YAxis])/max)
		}
		return <circle {...circleProps} />
	}
}

export default (props) => {
	return <g transform={`translate(0 ,${props.padding.top})`}>{props.data.map(renderCircles(props))}</g>
}
