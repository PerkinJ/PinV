import { h, Component } from 'preact'
import * as d3 from 'd3'

class TreeMap extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	static defaultProps = {
		width: 960,
		height: 600,
		paddingInner: 1,
		value: 'value'
	}
	sumBySize = (d) => d[this.props.value]
	render({ data, width, height, paddingInner }) {
		let fader = function (color) { return d3.interpolateRgb(color, "#fff")(0.2) },
			color = d3.scaleOrdinal(d3.schemeCategory20c.map(fader)),
			format = d3.format(",d")

		let treemap = d3.treemap()
			.tile(d3.treemapResquarify)
			.size([width, height])
			.round(true)
			.paddingInner(paddingInner)
		let treemapData = []
		if (JSON.stringify(data) !== '{}') {
			let root = d3.hierarchy(data)
				.eachBefore(d => d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name)
				.sum(this.sumBySize)
				.sort((a, b) => b.height - a.height || b.value - a.value)

			treemap(root)
			treemapData = root.leaves()
		}

		return (
			<svg width={width} height={height} style={{ fontSize: 10 }}>
				{treemapData.length > 0 &&treemapData.map((d, index) => (
					<g key={index} transform={`translate(${d.x0},${d.y0})`}>
						<rect
							id={d.data.id}
							width={d.x1 - d.x0}
							height={d.y1 - d.y0}
							fill={color(d.parent.data.id)} />
						<clipPath id={`clip-${d.data.id}`}>
							<use href={`#${d.data.id}`} />
						</clipPath>
						<text clip-path={`url(#clip-${d.data.id})`}>
							<tspan x={4} y={12}>{d.data.name.split(/(?=[A-Z][^A-Z])/g)}</tspan>
						</text>
						<title>{d.data.id + "\n" + format(d.value)}</title>
					</g>
				))}
			</svg>
		)
	}
}

export default TreeMap
