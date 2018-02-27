import { h, Component } from 'preact'

class Bar extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	static defaultProps = {
		offset: 0,
		className: 'barchart-bar'
	}
	render({ fill, handleMouseOver, handleMouseLeave }) {
		return (
			<rect
				className='barchart-bar'
				{...this.props}
				fill={fill}
				onMouseOver={handleMouseOver}
				onMouseLeave={handleMouseLeave}
			/>
		)
	}
}

export default Bar
