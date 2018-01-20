import { h, Component } from 'preact'

class Circle extends Component {
	static defaultProps = {
		fill: '#1f77b4'
	}
	getInitialState() {
		// state for animation usage
		return {
			circleRadius: this.props.r,
			circleColor: this.props.fill
		}
	}
	componentDidMount() {
		let props = this.props
		// The circle reference is observed when both it is set to
		// active, and to inactive, so we have to check which one
		props.voronoiRef.observe(() => {
			let circleStatus = props.voronoiRef.cursor().deref()
			let seriesName = props.id.split('-')[0]
			if (circleStatus === 'active') {
				this._animateCircle(props.id)
				let voronoiSeriesCursor = props.structure.cursor('voronoiSeries')
				if (voronoiSeriesCursor) {
					voronoiSeriesCursor.cursor(seriesName).update(() => 'active')
				}
			} else if (circleStatus === 'inactive') {
				this._restoreCircle(props.id)
				props.structure.cursor('voronoiSeries').cursor(seriesName).update(() => 'inactive')
			}
		})
	}
	componentWillUnmount() {
		this.props.voronoiRef.destroy()
	}
	_animateCircle() {
		this.setState({
			circleRadius: this.state.circleRadius * (5 / 4)
		})
	}
	_restoreCircle() {
		this.setState({
			circleRadius: this.props.r
		})
	}
	render() {
		let props = this.props
		return (
			<circle
				cx={props.cx}
				cy={props.cy}
				r={this.state.circleRadius}
				fill={this.state.circleColor}
				id={props.id}
				className={props.className}
			/>
		)
	}
}
export default Circle
