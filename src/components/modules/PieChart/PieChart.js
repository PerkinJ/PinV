import { h, Component } from 'preact'
import { Chart, Tooltip } from '../../common'
import DataSeries from './DataSeries'
import * as d3 from 'd3'

class PieChart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tooltip: {
				x: 0,
				y: 0,
				child: '',
				show: false
			},
			changeState: false
		}
	}
	static defaultProps = {
		data: [],
		title: '',
		colors: d3.scaleOrdinal(d3.schemeCategory10),
		colorAccessor: (d, idx) => idx,
		valueTextFormatter: (val) => `${val}%`,
		hoverAnimation: true,
		// default tooltip
		showTooltip: true,
		tooltipFormat: (d) =>`${d.seriesName}:${d.yValue}`,
		tooltipColor:'white'
	}
	componentWillReceiveProps() {
		this.setState({
			changeState: false
		})
	}
	// tooltip mouseover
	onMouseOver = (x, y, dataPoint) => {
		if (!this.props.showTooltip)
			return
		this.setState({
			tooltip: {
				x,
				y,
				child: this.props.tooltipFormat.call(this, dataPoint,  this.props.unit ? this.props.unit : ''),
				show: true
			},
			changeState: true
		})
	}
	onMouseLeave = () => {
		if (!this.props.showTooltip)
			return
		this.setState({
			tooltip: {
				x: 0,
				y: 0,
				child: '',
				show: false
			},
			changeState: true
		})
	}

	render() {
		let props = this.props
		let transform = `translate(${props.cx || props.width / 2},${props.cy || props.height / 2})`

		let values = props.data.map((item) => item.value)
		let labels = props.data.map((item) => item.label)
		return (
			<span>
				<Chart
					width={props.width}
					height={props.height}
					title={props.title}
					shouldUpdate={!this.state.changeState}
				>
					<g className='piechart'>
						<DataSeries
							labelTextFill={props.labelTextFill}
							valueTextFill={props.valueTextFill}
							valueTextFormatter={props.valueTextFormatter}
							data={props.data}
							values={values}
							labels={labels}
							colors={props.colors}
							colorAccessor={props.colorAccessor}
							transform={transform}
							width={props.width}
							height={props.height}
							radius={props.radius}
							innerRadius={props.innerRadius}
							showInnerLabels={props.showInnerLabels}
							showOuterLabels={props.showOuterLabels}
							sectorBorderColor={props.sectorBorderColor}
							hoverAnimation={props.hoverAnimation}
							onMouseOver={this.onMouseOver}
							onMouseLeave={this.onMouseLeave}
						/>
					</g>
				</Chart>
				{(props.showTooltip ? <Tooltip 	tooltipColor={this.props.tooltipColor} {...this.state.tooltip} /> : null)}
			</span>
		)
	}
}
export default PieChart
