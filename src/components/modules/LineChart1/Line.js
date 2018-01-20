import { h, Component } from 'preact'

class Line extends Component {
	static defaultProps = {
		stroke: '#673ab7',
		fill: 'none',
		strokeWidth: 1,
		className: 'linechart-path'
	}
	render({ path, stroke, strokeWidth, strokeDashArray, fill, className }) {
		return (
			<path
				d={path}
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeDasharray={strokeDashArray}
				fill={fill}
				className={className}
			/>
		)
	}
}
export default Line
