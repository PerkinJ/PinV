import { h } from 'preact'

const renderCircles = (props) => {
	return (coords, index) => {
		console.log(props)
		let delta = props.width / props.data.length
		const circleProps = {
			cx: props.xScale(coords[props.XAxis]) + delta/2,
			cy: props.yScale(coords[props.YAxis]),
			r: 2,
			key: index
		}
		return <circle {...circleProps} />
	}
}

export default (props) => {
	return <g transform={`translate(0 ,${props.padding.top})`}>{props.data.map(renderCircles(props))}</g>
}
