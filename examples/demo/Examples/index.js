import { h, Component } from 'preact'
import styles from './style.less'
import { TreeMap, PieChart, Histogram, LineChart,ScatterChart } from 'pinv'
import * as d3 from 'd3'
import flareData from '../flare.json'
let phoneData = [
	{ label: 'apple', value: 1000 + Math.floor(Math.random() * 1000) },
	{ label: 'huawei', value: 800 + Math.floor(Math.random() * 1000) },
	{ label: 'sansung', value: 1200 + Math.floor(Math.random() * 1000) },
	{ label: 'xiaomi', value: 700 + Math.floor(Math.random() * 1000) },
	{ label: 'oppo', value: 800 + Math.floor(Math.random() * 1000) },
	{ label: 'vivo', value: 500 + Math.floor(Math.random() * 1000) },
	{ label: 'others', value: 1300 + Math.floor(Math.random() * 1000) }
]
const randomData = () => d3.range(0, 100, 5)
	.map(key => ({
		key,
		value: Math.round(Math.random() * 80)
	}))
let catgegoryData = randomData()
let lineData = [
	{
		name: 'series1',
		values: [{ x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 }],
		strokeWidth: 3,
		strokeDashArray: "5,5"
	},
	{
		name: 'series2',
		values: [{ x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 }]
	},
	{
		name: 'series3',
		values: [{ x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 }]
	}
]
let scatterData = [
	{
		name: "series1",
		values: [{ x: 0, y: 20 }, { x: 5, y: 7 }, { x: 8, y: 3 }, { x: 13, y: 33 }, { x: 12, y: 10 }, { x: 13, y: 15 }, { x: 24, y: 8 }, { x: 25, y: 15 }, { x: 16, y: 10 }, { x: 16, y: 10 }, { x: 19, y: 30 }, { x: 14, y: 30 }]
	},
	{
		name: "series2",
		values: [{ x: 40, y: 30 }, { x: 35, y: 37 }, { x: 48, y: 37 }, { x: 38, y: 33 }, { x: 52, y: 60 }, { x: 51, y: 55 }, { x: 54, y: 48 }, { x: 45, y: 45 }, { x: 46, y: 50 }, { x: 66, y: 50 }, { x: 39, y: 36 }, { x: 54, y: 30 }]
	},
	{
		name: "series3",
		values: [{ x: 80, y: 78 }, { x: 71, y: 58 }, { x: 78, y: 68 }, { x: 81, y: 47 }, { x: 72, y: 70 }, { x: 70, y: 88 }, { x: 81, y: 90 }, { x: 92, y: 80 }, { x: 81, y: 72 }, { x: 99, y: 95 }, { x: 67, y: 81 }, { x: 96, y: 78 }]
	}
]
class Examples extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	render() {
		return (
			<div class={styles.main}>
				<div class={styles.container}>
					<div class={styles.left}>
						<div class={styles.area}>
							<span class={styles.desc}>地区占比</span>
							<PieChart
								data={phoneData}
								width={300}
								height={250}
								radius={80}
								innerRadius={20}
								unit="台"
								labelTextFill="rgb(243,198,76)"
								valueTextFill="rgb(243,198,76)"
								tooltipColor='rgb(0,0,0)'
							/>
						</div>
						<div class={styles.category}>
							<span class={styles.desc}>类型划分</span>
							<Histogram
								hidden={true}
								XAxis="key"
								YAxis="value"
								stroke="rgb(243,198,76)"
								tooltipColor='rgb(0,0,0)'
								data={catgegoryData}
								width={300}
								height={250}
								padding={{ top: 32, bottom: 32, left: 30, right: 20 }}
							/>
						</div>
					</div>
					<div class={styles.center}>
						<h2 class={styles.title}>Top250全球电影可视化分析</h2>
						<div class={styles.treemap}>
							<TreeMap
								width="660"
								height="490"
								value="size"
								data={flareData}
							/>
						</div>
					</div>
					<div class={styles.right}>
						<div class={styles.score}>
							<span class={styles.desc}>评分走势</span>
							<LineChart
								data={lineData}
								width='100%'
								height={250}
								viewBoxObject={{
									x: 0,
									y: 0,
									width: 400,
									height: 250
								}}
								domain={{ x: [, 6], y: [-10,] }}
								gridHorizontal={true}
								axesColor="rgb(243,198,76)"
								tickTextStroke='rgb(243,198,76)'
								tickStroke='rgb(243,198,76)'
								textColor='rgb(243,198,76)'
								tooltipColor='rgb(0,0,0)'
							/>
						</div>
						<div class={styles.scatter}>
							<span class={styles.desc}>关系图</span>
							<ScatterChart
								data={scatterData}
								width={300}
								height={250}
								viewBoxObject={{
									x: 0,
									y: 0,
									width: 400,
									height: 250
								}}
								axesColor="rgb(243,198,76)"
								tickTextStroke='rgb(243,198,76)'
								tickStroke='rgb(243,198,76)'
								textColor='rgb(243,198,76)'
								tooltipColor='rgb(0,0,0)'
								domain={{ y: [-15,], y: [-15,] }}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default Examples
