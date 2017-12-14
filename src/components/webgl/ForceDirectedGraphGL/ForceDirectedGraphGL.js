
import * as d3 from 'd3'
import * as THREE from 'three'
import { h, Component } from 'preact'
import { colour } from '../../../utils/utils'
import Tooltip from '../../basic/Tooltip'
class ForceGLLayout extends Component {
	componentDidMount() {
		const { data, width, height } = this.props

		const scene = new THREE.Scene()
		const camera = new THREE.OrthographicCamera(0, width, height, 0, 1, 1000)
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			precision: 'highp',
			alpha: true
		})
		let container = this.glGontainer
		renderer.setSize(width, height)
		renderer.setPixelRatio(window.devicePixelRatio)
		container.appendChild(renderer.domElement)
		camera.position.z = 5

		data.nodes.forEach((node) => {
			node.geometry = new THREE.CircleBufferGeometry(5, 32)
			node.material = new THREE.MeshBasicMaterial({ color: colour(node.id) })
			node.circle = new THREE.Mesh(node.geometry, node.material)
			scene.add(node.circle)
		})

		data.links.forEach((link) => {
			link.material = new THREE.LineBasicMaterial({ color: 0xAAAAAA })
			link.geometry = new THREE.Geometry()
			link.line = new THREE.Line(link.geometry, link.material)
			scene.add(link.line)
		})

		const simulationGl = d3.forceSimulation()
			.force('link', d3.forceLink().id((d) => d.id))
			.force('charge', d3.forceManyBody())
			.force('center', d3.forceCenter(width / 2, height / 2))

		simulationGl
			.nodes(data.nodes)
			.on('tick', ticked)

		simulationGl.force('link')
			.links(data.links)

		d3.select(this.glGontainer)
			.call(d3.drag().container(this.glGontainer)
				.subject(getClosestNode)
				.on('start', dragstarted)
				.on('drag',dragged)
				.on('end',dragended))


		function getClosestNode() {
			return simulationGl.find(d3.event.x, d3.event.y)
		}
		const _this = this

		function dragstarted() {
			if (!d3.event.active) simulationGl.alphaTarget(0.3).restart()
			d3.event.subject.fx = d3.event.subject.x
			d3.event.subject.fy = d3.event.subject.y
			_this.setState({
				tooltipStyle:{
					left:d3.event.subject.x,
					top:d3.event.subject.y,
					opacity:0.9
				},
				content:'111'
			})
		}
		function dragged(){
			d3.event.subject.fx = d3.event.x
			d3.event.subject.fy = d3.event.y
		}
		function dragended(){
			if (!d3.event.active)simulationGl.alphaTarget(0)
			d3.event.subject.fx = null
			d3.event.subject.fy = null
		}

		function ticked() {
			data.nodes.forEach((node) => {
				const { x, y, circle } = node
				circle.position.set(x, y, 0)
			})

			data.links.forEach((link) => {
				const { source, target, line } = link
				line.geometry.verticesNeedUpdate = true
				line.geometry.vertices[0] = new THREE.Vector3(source.x, source.y, -1)
				line.geometry.vertices[1] = new THREE.Vector3(target.x, target.y, -1)
			})

			renderer.render(scene, camera)
		}
	}
	render({ }, { content, tooltipStyle }) {
		return (
			<div ref={el => this.glGontainer = el} >
				<Tooltip
					content={content}
					tooltipStyle={tooltipStyle}
				/>
			</div>
		)
	}
}

export default ForceGLLayout
