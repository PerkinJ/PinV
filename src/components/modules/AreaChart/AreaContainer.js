import { h, Component } from 'preact'
import { shade } from '../../../utils/utils'
import Area from './Area'

class AreaContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fill: this.props.fill
		}
	}
	static defaultProps = {
		fill: '#3182bd'
	}
	_animateArea = () => {
		this.setState({
			fill: shade(this.props.fill, 0.02)
		})
	}

	_restoreArea = () => {
		this.setState({
			fill: this.props.fill
		})
	}
	render() {
		let props = this.props

		// animation controller
		let handleMouseOver, handleMouseLeave
		if (props.hoverAnimation) {
			handleMouseOver = this._animateArea
			handleMouseLeave = this._restoreArea
		} else {
			handleMouseOver = handleMouseLeave = null
		}

		return (
			<Area
				handleMouseOver={handleMouseOver}
				handleMouseLeave={handleMouseLeave}
				{...props}
				fill={this.state.fill}
			/>
		)
	}
}


export default AreaContainer
