import { h, Component } from 'preact'
class VoronoiCircle extends Component {
	static defaultProps = {
		circleRadius: 3,
		circleFill: '#1f77b4'
	}
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	render() {
		return (
			<g>
				<path
					onMouseOver={this.props.handleMouseOver}
					onMouseLeave={this.props.handleMouseLeave}
					fill='transparent'
					d={this.props.voronoiPath}
				/>
				<circle
					onMouseOver={this.props.handleMouseOver}
					onMouseLeave={this.props.handleMouseLeave}
					cx={this.props.cx}
					cy={this.props.cy}
					r={this.props.circleRadius}
					fill={this.props.circleFill}
					className="linechart-circle"
				/>
			</g>
		)
	}
}
export default VoronoiCircle
