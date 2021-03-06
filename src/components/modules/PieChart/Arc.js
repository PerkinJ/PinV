import { h, Component } from 'preact'
import * as d3 from 'd3'

class Arc extends Component {
	static defaultProps = {
		labelTextFill: 'black',
		valueTextFill: 'white',
		showInnerLabels: true,
		showOuterLabels: true
	}
	renderInnerLabel = (props, arc) => {
		// make value text can be formatted
		let value = (+props.value / props.sum * 100).toFixed(1)
		let formattedValue = props.valueTextFormatter(value)
		return (
			<text
				className='piechart-value'
				transform={`translate(${arc.centroid()})`}
				dy='.35em'
				style={{
					'shapeRendering': 'crispEdges',
					'textAnchor': 'middle',
					'fill': props.valueTextFill,
					fontSize: 12
				}}>
				{value >= 1 && formattedValue}
			</text>
		)
	}

	renderOuterLabel(props) {

		let rotate = `rotate(${(props.startAngle + props.endAngle) / 2 * (180 / Math.PI)})`
		// let positions = arc.centroid()
		let radius = props.outerRadius
		let dist = radius + 35
		let angle = (props.startAngle + props.endAngle) / 2
		let x = dist * (1.1 * Math.sin(angle))
		let y = -dist * Math.cos(angle)
		let t = `translate(${x},${y})`
		let value = (+props.value / props.sum * 100).toFixed(1)
		return (
			<g>
				{value >= 1 ? <g>
					<line
						x1='0'
						x2='0'
						y1={-radius}
						y2={-radius - 20}
						stroke={props.labelTextFill}
						transform={rotate}
						style={{
							'fill': props.labelTextFill,
							'strokeWidth': 1
						}}
					/>
					<text
						className='piechart-label'
						transform={t}
						dy='.35em'
						style={{
							'textAnchor': 'middle',
							'fill': props.labelTextFill,
							'shapeRendering': 'crispEdges',
							fontSize: 12
						}}>
						{props.label}
					</text>
				</g> : null}
			</g>
		)
	}
	render() {
		let props = this.props

		let arc = d3.arc()
			.innerRadius(props.innerRadius)
			.outerRadius(props.outerRadius)
			.startAngle(props.startAngle)
			.endAngle(props.endAngle)

		return (
			<g className='piechart-arc' >
				<path
					d={arc()}
					fill={props.fill}
					stroke={props.sectorBorderColor}
					onMouseOver={props.handleMouseOver}
					onMouseLeave={props.handleMouseLeave}
				/>
				{props.showOuterLabels ? this.renderOuterLabel(props, arc) : null}
				{props.showInnerLabels ? this.renderInnerLabel(props, arc) : null}
			</g>
		)
	}
}
export default Arc
