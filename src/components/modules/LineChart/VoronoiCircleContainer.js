import { h, Component } from 'preact'
import { shade } from '../../../utils/utils'
import VoronoiCircle from './VoronoiCircle'
class VoronoiCircleContainer extends Component {
	static defaultProps = {
		circleRadius: 3,
		circleFill: '#673ab7',
		hoverAnimation: true
	}
	constructor(props) {
		super(props)
		this.state = {
			circleRadius: this.props.circleRadius,
			circleFill: this.props.circleFill
		}
		this.voronoiCircle = null
	}

	animateCircle = (event) => {
		let e = event || window.event
		this.props.onMouseOver.call(this, e.x, e.y, this.props.dataPoint)
		this.setState({
			circleRadius: this.props.circleRadius * (6 / 4),
			circleFill: shade(this.props.circleFill, 0.2)
		})
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
		return 'M' + d.halfedges.join(',') + 'Z'
	}
	render({ hoverAnimation, cx, cy, vnode }, { circleRadius, circleFill }) {
		// 处理动画
		let handleMouseOver, handleMouseLeave
		if (hoverAnimation) {
			handleMouseOver = this.animateCircle
			handleMouseLeave = this.restoreCircle
		} else {
			handleMouseOver = handleMouseLeave = null
		}
		return (
			<g>
				<VoronoiCircle
					handleMouseOver={handleMouseOver}
					handleMouseLeave={handleMouseLeave}
					voronoiPath={this.drawPath(vnode)}
					cx={cx}
					cy={cy}
					circleRadius={circleRadius}
					circleFill={circleFill}
				/>
			</g>
		)
	}
}
export default VoronoiCircleContainer
