import { h, Component } from 'preact'


class BasicChart extends Component {
	static defaultProps = {
		className: 'rd3-basic-chart',
		svgClassName: 'rd3-chart',
		titleClassName: 'rd3-chart-title'
	}
	_renderTitle() {
		let props = this.props

		if (props.title != '' && props.title != null) {
			return (
				<h4
					className={props.titleClassName}
				>
					{props.title}
				</h4>
			)
		} else {
			return null
		}
	}

	_renderChart() {
		let props = this.props

		return (
			<svg
				className={props.svgClassName}
				height={props.height}
				viewBox={props.viewBox}
				width={props.width}
			>
				{props.children}
			</svg>
		)
	}
	render() {
		let props = this.props

		return (
			<div
				className={props.className}
			>
				{this._renderTitle()}
				{this._renderChart()}
			</div>
		)
	}
}
export default BasicChart
