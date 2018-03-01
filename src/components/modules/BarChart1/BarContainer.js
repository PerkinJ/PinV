import { h, Component } from 'preact'
import { shade } from '../../../utils/utils'
import Bar from './Bar'

class BarContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fill: this.props.fill
		}
	}
	static defaultProps = {
		fill: '#3182BD'
	}
	_animateBar(event) {
		let e = event || window.event
		this.props.onMouseOver.call(this, e.x, e.y, this.props.dataPoint)
		this.setState({
		  fill: shade(this.props.fill, 0.2)
		})
	  }

	_restoreBar() {
		this.props.onMouseLeave.call(this)
		this.setState({
		  fill: this.props.fill
		})
	  }
	render() {
		let props = this.props

		return (
			<Bar
				{...props}
				fill={this.state.fill}
				handleMouseOver={props.hoverAnimation ? this._animateBar : null}
				handleMouseLeave={props.hoverAnimation ? this._restoreBar : null}
			/>
		)
	}
}


export default BarContainer
