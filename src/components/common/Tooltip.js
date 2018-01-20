import { h, Component } from 'preact'

class Tooltip extends Component {
	constructor(props){
		super(props)
	}
	render() {
		let props = this.props
		let display = this.props.show ? 'inherit' : 'none'
		let containerStyles = { position: 'fixed', top: props.y, left: props.x, display, opacity: 0.8 }
		//TODO: add 'right: 0px' style when tooltip is off the chart
		let tooltipStyles = {
			position: 'absolute',
			backgroundColor: 'white',
			border: '1px solid',
			borderColor: '#ddd',
			borderRadius: '2px',
			padding: '10px',
			marginLeft: '10px',
			marginRight: '10px',
			marginTop: '-15px'
		}
		return (
			<div style={containerStyles}>
				<div style={tooltipStyles}>
					{props.child}
				</div>
			</div>
		)
	}
}
export default Tooltip
