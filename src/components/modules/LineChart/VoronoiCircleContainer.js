import { h, Component } from 'preact'
import { shade } from '../../../utils/utils'
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

	animateCircle = () => {
		let rect = document.querySelector('circle').getBoundingClientRect()
		this.props.onMouseOver.call(this, rect.right, rect.top, this.props.dataPoint)
		this.setState({
			circleRadius: this.props.circleRadius * (6 / 4),
			circleFill: shade(this.props.circleFill, 0.2)
		})
	}
	restoreCircle = () => {
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
		console.log('vnode',vnode)
		return (
			<g>
				<path
					onMouseOver={handleMouseOver}
					onMouseLeave={handleMouseLeave}
					fill='#f00'
					d={this.drawPath(vnode)}
				/>
				<circle
					onMouseOver={handleMouseOver}
					onMouseLeave={handleMouseLeave}
					cx={cx}
					cy={cy}
					r={circleRadius}
					fill={circleFill}
					className="linechart-circle"
				/>
			</g>
		)
	}
}
export default VoronoiCircleContainer
