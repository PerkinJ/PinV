import { h, Component } from 'preact'
import ArcContainer from './ArcContainer'
import * as d3 from 'd3'


class DataSeries extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fill: this.props.fill
		}
	}
	static defaultProps = {
		data: [],
		innerRadius: 0,
		colors: d3.scaleOrdinal(d3.schemeCategory20),
		colorAccessor: (d, idx) => idx
	}

	render() {
		let props = this.props

		let pie = d3.pie().sort(null)

		let arcData = pie(props.values)
		let sum = props.values.length>0&&props.values.reduce((total,num)=> total+num)
		let arcs = arcData.map((arc, idx) => {
			return (
				<ArcContainer
					key={idx}
					startAngle={arc.startAngle}
					endAngle={arc.endAngle}
					outerRadius={props.radius}
					innerRadius={props.innerRadius}
					labelTextFill={props.labelTextFill}
					valueTextFill={props.valueTextFill}
					valueTextFormatter={props.valueTextFormatter}
					fill={props.colors(props.colorAccessor(props.data[idx], idx))}
					value={props.values[idx]}
					label={props.labels[idx]}
					sum={sum}
					width={props.width}
					showInnerLabels={props.showInnerLabels}
					showOuterLabels={props.showOuterLabels}
					sectorBorderColor={props.sectorBorderColor}
					hoverAnimation={props.hoverAnimation}
					onMouseOver={props.onMouseOver}
					onMouseLeave={props.onMouseLeave}
					dataPoint={{ yValue: props.values[idx], seriesName: props.labels[idx] }}
				/>
			)
		})
		return (
			<g className='rd3-piechart-pie' transform={props.transform} >
				{arcs}
			</g>
		)
	}
}


export default DataSeries
