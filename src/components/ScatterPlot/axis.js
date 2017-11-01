import { h, Component } from 'preact'
import d3 from 'd3'
import styles from './index.less'
export default class Axis extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.renderAxis()
	}

	componentDidUpdate() {
		this.renderAxis()
	}

	renderAxis() {
		const node = document.querySelector('.axis')
		const axis = d3.svg.axis().orient(this.props.orient).ticks(5).scale(this.props.scale)
		d3.select(node).call(axis)
	}

	render() {
		return <g class={styles.axis} transform={this.props.translate}></g>
	}
}
