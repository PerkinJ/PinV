import { h, Component } from 'preact'
import { shade } from '../../../utils/utils'
import VoronoiCircle from './VoronoiCircle'
class VoronoiCircleContainer extends Component {
	static defaultProps = {
		circleFill: '#1f77b4',
		circleRadius: 3,
		circleRadiusMultiplier: 1.5,
		className: 'scatterchart-voronoi-circle-container',
		hoverAnimation: true,
		shadeMultiplier: 0.2
	}
	constructor(props) {
		super(props)
		this.state = {
			circleFill: this.props.circleFill,
			circleRadius: this.props.circleRadius
		}
	}

	animateCircle = (event) => {
		let props = this.props
		// let index = props.vnode.index,
		// 	rect = document.getElementsByTagName('circle')[index].getBoundingClientRect()
		if (props.hoverAnimation) {
			let e = event || window.event
			this.props.onMouseOver.call(this, e.x+5, e.y, this.props.dataPoint)
			// this.props.onMouseOver.call(this, rect.right, rect.top, this.props.dataPoint)
			this.setState({
			  circleFill:   shade(props.circleFill, props.shadeMultiplier),
			  circleRadius: props.circleRadius * props.circleRadiusMultiplier
			})
		}
	}
	restoreCircle = () => {
		this.props.onMouseLeave()
		this.setState({
			circleRadius: this.props.circleRadius,
			circleFill: this.props.circleFill
		})
	}
	drawPath(d) {
		if (d === undefined) {
			return
		}
		return 'M' + d.join("L") + 'Z'
	}
	render({ className, cx, cy, vnode }, { circleRadius, circleFill }) {
		return (
			<g
				className={className}
			>
				<VoronoiCircle
					id="VoronoiCircle"
					circleFill={circleFill}
					circleRadius={circleRadius}
					cx={cx}
					cy={cy}
					handleMouseLeave={this.restoreCircle}
					handleMouseOver={this.animateCircle}
					voronoiPath={this.drawPath(vnode)}
				/>
			</g>
		)
	}
}
export default VoronoiCircleContainer
