import { h, Component } from 'preact'
import * as d3 from 'd3'


class StreamGraph extends Component {
	constructor(props) {
		super(props)
	}
	static defaultProps = {
		width: 660,
		height: 600,
		padding: { top: 20, right: 20, bottom: 30, left: 50 }
	}
	componentDidMount() {

	}

	render({width,height,data},{}) {
		// 生成stack函数
		let stack = d3.stack().keys(d3.range(data[0].length)).offset(d3.stackOffsetWiggle),
			layers = stack(data)
		let x = d3.scaleLinear()
			.domain([0, layers[0].length-1])
			.range([0, width])

		let y = d3.scaleLinear()
			.domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
			.range([height, 0])

		let z = d3.interpolateCool

		let area = d3.area()
			.x((d, i) => x(i))
			.y0((d) => y(d[0]))
			.y1(d => y(d[1]))

		function stackMax(layer) {
			return d3.max(layer, (d) => d[1])
		}

		function stackMin(layer) {
			return d3.min(layer, (d) => d[0])
		}
		return (
			<div>
				<svg width={width} height={height} ref={el => this.StreamGraph = el} >
					{!!layers&&layers.map((value,index)=>(
						<path key={index} d={area(value)} fill={z(Math.random())}/>
					))}
				</svg>
			</div>
		)
	}
}

export default StreamGraph
