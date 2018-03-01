import { h, Component } from 'preact'
import { shade } from '../../../utils/utils'
import Arc from './Arc'

class ArcContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fill: this.props.fill
		}
	}
	static defaultProps = {
		fill: '#3182bd'
	}

	_animateArc = (event) => {
		let props = this.props
		if (props.hoverAnimation) {
			let e = event || window.event
			this.props.onMouseOver.call(this, e.x+5, e.y, this.props.dataPoint)
			this.setState({
				fill: shade(this.props.fill, 0.2)
			})
		}
	}
	_restoreArc = () => {
		this.props.onMouseLeave.call(this)
		this.setState({
			fill: this.props.fill
		})
	}
	render() {
		let props = this.props

		return (
			<Arc
				{...this.props}
				fill={this.state.fill}
				handleMouseOver={props.hoverAnimation ? this._animateArc : null}
				handleMouseLeave={props.hoverAnimation ? this._restoreArc : null}
			/>
		)
	}
}


export default ArcContainer
