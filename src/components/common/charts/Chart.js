import { h, Component } from 'preact'
import LegendChart from './LegendChart'
import BasicChart from './BasicChart'

class Chart extends Component {
	static defaultProps = {
		legend: false,
		svgClassName: 'rd3-chart',
		titleClassName: 'rd3-chart-title',
		shouldUpdate: true
	}
	shouldComponentUpdate(nextProps) {
		return nextProps.shouldUpdate
	}
	render() {
		let props = this.props
		if (props.legend) {
			return (
				<LegendChart
					svgClassName={props.svgClassName}
					titleClassName={props.titleClassName}
					{...this.props}
				/>
			)
		}
		return (
			<BasicChart
				svgClassName={props.svgClassName}
				titleClassName={props.titleClassName}
				{...this.props}
			/>
		)
	}
}
export default Chart
