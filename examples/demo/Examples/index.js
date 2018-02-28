import { h, Component } from 'preact'
import styles from './style.less'
import { TreeMap, PieChart, Histogram, LineChart, ScatterChart, SunburstLayout } from 'pinv'
import * as d3 from 'd3'
import Tabs from 'preact-material-components/Tabs'
import 'preact-material-components/Tabs/style.css'
import flareData from '../flare.json'
import movieData from '../data/movie.json'
console.log('flareData', flareData)
const randomData = () => d3.range(0, 100, 5)
	.map(key => ({
		key,
		value: Math.round(Math.random() * 80)
	}))
let catgegoryData = randomData()

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
// 处理treeMap
const handleTreeMap = (data) => {
	let treemapData = {
		name: 'movies'
	}
	let s = new Set() 		// 获得地区列表
	data.forEach(d => s.add(d.area))
	let children = []
	s.forEach(d => {
		let childrenObj = {
			name: d
		}
		let childs = []
		data.forEach(val => {
			if (d === val.area) {
				childs.push({
					name: val.name,
					score: val.score
				})
			}
		})
		childrenObj.children = childs
		children.push(childrenObj)
	})
	treemapData.children = children

	return treemapData
}
const treemapData = handleTreeMap(movieData)

class Examples extends Component {
	constructor(props) {
		super(props)
		this.state = {
			areaData: [],
			scoreData: [],
			treemapData: [],
			select: 'treemap'
		}
	}
	componentDidMount() {
		const areaData = this.handleAreaData(movieData)
		const scoreData = this.handleScoreData(movieData)
		// const treemapData = this.handleTreeMap(movieData)
		this.setState({
			areaData,
			scoreData,
			// treemapData
		})
	}
	// 处理地区占比
	handleAreaData = (data) => {
		let s = new Set() 		// 获得地区列表
		data.forEach(d => s.add(d.area))
		let areaData = []
		s.forEach(d => {
			let json = {}
			json.label = d
			json.value = 0
			data.forEach(val => {
				if (d === val.area) {
					++json.value
				}
			})
			json.value * 10
			areaData.push(json)
		})
		return areaData
	}
	// 处理评分走势
	handleScoreData = (data) => {
		let s = new Set() 		// 获得年份
		let scoreData = []
		data.forEach(d => s.add(d.year))
		let array = Array.from(s).sort((a, b) => a - b)
		let json = {
			name: 'Top250平均分数'
		}
		let values = []
		array.forEach(d => {
			let num = 0, total = 0
			let obj = {
				x: d
			}
			data.forEach(val => {
				if (d.toString() === val.year) {
					total += val.score
					++num
				}
			})
			obj.y = +(total / num).toFixed(1)
			values.push(obj)
		})
		json.values = values
		scoreData.push(json)
		// 筛选出中国
		let newArr = []
		data.forEach(val => {
			if (['中国大陆', '香港', '台湾'].indexOf(val.area) > -1) {
				newArr.push(+val.year)
			}
		})
		newArr.sort((a, b) => a - b)
		let json1 = {
			name: '中国电影平均分数'
		}
		let values1 = []
		newArr.forEach(d => {
			let num = 0, total = 0
			let obj = {
				x: +d
			}
			data.forEach(val => {
				if (d.toString() === val.year) {
					total += val.score
					++num
				}
			})
			obj.y = +(total / num).toFixed(1)
			values1.push(obj)
		})
		json1.values = values1
		scoreData.push(json1)
		return scoreData
	}

	render({ }, { areaData, scoreData, select }) {
		return (
			<div class={styles.main}>
				<div class={styles.container}>
					<div class={styles.left}>
						<div class={styles.area}>
							<span class={styles.desc}>地区占比</span>
							<PieChart
								data={areaData}
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
						<div class={styles.title}>Top250全球电影可视化分析</div>
						<div class={styles.treemap}>
							<div className={styles.tabs}>
								<Tabs className='demo-tabs' indicator-accent={false} style={{ float: 'left' }}>
									<Tabs.Tab onClick={() => this.setState({ select: 'treemap' })}
										style={{ color: select === 'treemap' ? 'rgb(243,198,76)' : '#fff' ,borderBottom:select === 'treemap' ? '3px solid rgb(243,198,76)':'none' }}>
										TreeMap
									</Tabs.Tab>
									<Tabs.Tab onClick={() => this.setState({ select: 'sunburst' })}
										style={{ color: select === 'sunburst' ? 'rgb(243,198,76)' : '#fff',borderBottom:select === 'sunburst' ? '3px solid rgb(243,198,76)':'none' }}>
										sunburst
									</Tabs.Tab>
								</Tabs>
							</div>
							{select === 'treemap' ?
								<TreeMap
									width="660"
									height="490"
									value="score"
									data={treemapData}
								/> :
								<SunburstLayout
									data={treemapData}
									width="660"
									height="490"
									padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
									dataKey="score"
									nameKey="name"
									interactive={true}
									radius={230}
									tooltipColor='rgb(0,0,0)'
								/>
							}
						</div>
					</div>
					<div class={styles.right}>
						<div class={styles.score}>
							<span class={styles.desc}>评分走势</span>
							<LineChart
								// legend={true}
								legendPosition="top"
								data={scoreData}
								width='100%'
								height={250}
								viewBoxObject={{
									x: 0,
									y: 0,
									width: 400,
									height: 300
								}}
								domain={{ x: [1930,], y: [8.2,] }}
								gridHorizontal={true}
								axesColor="rgb(243,198,76)"
								tickTextStroke='rgb(243,198,76)'
								tickStroke='rgb(243,198,76)'
								textColor='rgb(243,198,76)'
								tooltipColor='rgb(0,0,0)'
								stroke="rgb(180,36,40)"
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
