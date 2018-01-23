import { h, Component } from 'preact'
import * as d3 from 'd3'


class Legend extends Component {
	static defaultProps = {
		className: 'rd3-Tooltip',
		colors: d3.scaleOrdinal(d3.schemeCategory20c),
		colorAccessor: (d, idx) => idx,
		itemClassName: 'rd3-Tooltip-item',
		text: '#000'
	}
	render() {
		let props = this.props

		let textStyle = {
			'color': 'black',
			'fontSize': '50%',
			'verticalAlign': 'top'
		}

		let legendItems = []

		props.data.forEach((series, idx) => {
			let itemStyle = {
				'color': props.colors(props.colorAccessor(series, idx)),
				'lineHeight': '60%',
				'fontSize': '200%'
			}
			legendItems.push(
				<li
					key={idx}
					className={props.itemClassName}
					style={itemStyle}
				>
					<span
						style={textStyle}
					>
						{series.name}
					</span>
				</li>
			)

		})

		let topMargin = props.margins.top

		let legendBlockStyle = {
			'wordWrap': 'break-word',
			'width': props.width,
			'paddingLeft': '0',
			'marginBottom': '0',
			'marginTop': topMargin,
			'listStylePosition': 'inside'
		}

		return (
			<ul
				className={props.className}
				style={legendBlockStyle}
			>
				{legendItems}
			</ul>
		)
	}
}
export default Legend
