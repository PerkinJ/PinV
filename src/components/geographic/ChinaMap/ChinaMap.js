import { h, Component } from 'preact'
import * as d3 from 'd3'
import topojson from 'topojson'

export default class ChinaMap extends Component {
	componentDidMount() {
		let canvas = document.getElementById("mycanvas")
		let ctx = canvas.getContext("2d")
		let width = canvas.width
		let height = canvas.height

		let img = new Image()
		// img.src = "./data/southchinasea_white.png"
		img.onload = function () {
			ctx.drawImage(img, 710, 440)
		}

		let projection = d3.geoMercator()
			.center([107, 31])
			.scale(650)
			.translate([width / 1.9, height / 1.6])

		let path = d3.geoPath()
			.projection(projection)
			.context(ctx)

		// let color = d3.scaleOrdinal(d3.schemeCategory20)

		let mouseX = 0
		let mouseY = 0


		d3.json('./data/china.topojson', function (error, toporoot) {
			if (error)
				return console.error(error)

			//将TopoJSON对象转换成GeoJSON，保存在georoot中
			let georoot = topojson.feature(toporoot, toporoot.objects.china)

			render()


			d3.select(canvas).on("click", function () {
				mouseX = d3.event.offsetX
				mouseY = d3.event.offsetY
				render()
			})

			function render() {
				ctx.fillStyle = "white"
				ctx.fillRect(0, 0, width, height)

				//填充各区域
				georoot.features.forEach(function (d) {
					ctx.beginPath()
					path(d)
					if (ctx.isPointInPath(mouseX, mouseY)) {
						ctx.fillStyle = "steelblue"
					} else {
						ctx.fillStyle = "white"
					}
					ctx.fill()
				})


				//描边各区域
				ctx.strokeStyle = "black"
				ctx.beginPath()
				georoot.features.forEach(function (d) {
					path(d)
				})
				ctx.stroke()

				//绘制南海诸岛
				ctx.drawImage(img, 710, 440)
			}


		})
	}
	render() {
		return (
			<div>
				<canvas id="mycanvas" width="960" height="600" />
			</div>
		)
	}
}
