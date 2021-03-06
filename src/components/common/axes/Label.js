import { h, Component } from 'preact'

class Label extends Component {
	static defaultProps = {
		horizontalTransform: 'rotate(270)',
		strokeWidth: 0.01,
		textAnchor: 'middle',
		textColor:'#000',
		verticalTransform: 'rotate(0)'
	}
	render() {
		let props = this.props

		if (!props.label) {
			return <text />
		}
		let transform, x, y
		if (props.orient === 'top' || props.orient === 'bottom') {
			transform = props.verticalTransform
			x = props.width / 2
			y = props.offset

			if (props.horizontalChart) {
				transform = `rotate(180 ${x} ${y}) ${transform}`
			}
		} else {  // left, right
			transform = props.horizontalTransform
			x = -props.height / 2
			if (props.orient === 'left') {
				y = -props.offset
			} else {
				y = props.offset
			}
		}


		return (
			<text
				strokeWidth={props.strokeWidth.toString()}
				textAnchor={props.textAnchor}
				transform={transform}
				y={y}
				x={x}
				stroke={props.textColor}
			>
				{props.label}
			</text>
		)
	}
}
export default Label
