import { h, Component } from 'preact'
import AreaContainer from './AreaContainer'
import * as d3 from 'd3'


class DataSeries extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fill: this.props.fill
		}
	}
	static defaultProps = {
		interpolationType: 'linear'
	}

	render() {
		let props = this.props
		let area = d3.area()
			.x((d) => { return props.xScale(props.xAccessor(d)) })
			.y0((d) => { return props.yScale(d.y0) })
			.y1((d) => { return props.yScale(d.y0 + props.yAccessor(d)) })
			// .interpolate(props.interpolationType)

		let path = area(props.data)
		return (
			<AreaContainer
				fill={props.fill}
				hoverAnimation={props.hoverAnimation}
				path={path}
			/>
		)
	}
}


export default DataSeries
