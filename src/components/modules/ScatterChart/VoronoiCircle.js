import { h, Component } from 'preact'
class VoronoiCircle extends Component {
	static defaultProps = {
		className: 'scatterchart-voronoi-circle',
		pathFill: 'transparent'
	}
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	render() {
		let props = this.props

		return (
			<g>
				{/*VoronoiCircle交互区域*/}
				<path
					d={props.voronoiPath}
					fill={props.pathFill}
					onMouseLeave={props.handleMouseLeave}
					onMouseOver={props.handleMouseOver}
				/>
				<circle
					cx={props.cx}
					cy={props.cy}
					className={props.className}
					fill={props.circleFill}
					onMouseLeave={props.handleMouseLeave}
					onMouseOver={props.handleMouseOver}
					r={props.circleRadius}
				/>
			</g>
		)
	}
}
export default VoronoiCircle
