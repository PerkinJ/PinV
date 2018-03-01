import { h, Component } from 'preact'
import styles from './style.less'
import { TreeMap, PieChart, Histogram,BarChart, LineChart, ScatterChart, SunburstLayout } from 'pinv'
import * as d3 from 'd3'
import movieData from '../data/movie.json'

class Examples extends Component {
	constructor(props) {
		super(props)
		this.state = {
			areaData: [],
			scoreData: [],
			treemapData: [],
			scatterData: [],
			categoryData:[],
			domain:{ x: [8, 10], y: [0, 250] }
		}
	}
	componentWillMount() {
		const areaData = this.handleAreaData(movieData)
		const scoreData = this.handleScoreData(movieData)
		const categoryData = this.handleCategory(movieData)
		const treemapData = this.handleTreeMap(movieData)
		const scatterData = this.handleScatter(movieData)
		this.setState({
			areaData,
			scoreData,
			scatterData,
			categoryData,
			treemapData
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
	// 处理层次型结构
	handleTreeMap = (data) => {
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
	// 处理类型
	handleCategory = (data) => {
		let s = new Set() 		// 获得地区列表
		data.forEach(d => s.add(d.type))
		let categoryData = []
		s.forEach(d => {
			let json = {}
			json.type = d
			json.value = 0
			data.forEach(val => {
				if (d === val.type) {
					++json.value
				}
			})
			categoryData.push(json)
		})
		return categoryData
	}
	// 处理散点
	handleScatter = (data, type = 'ratings-rank') => {
		let newObj = {}, newData = []
		switch (type) {
			case 'score-rank': {
				data.forEach(d => {
					let obj = {
						x: d.score,
						y: d.ranking
					}
					newData.push(obj)
				})
				this.setState({
					domain:{ x: [8, 10], y: [1, 250] },
					label:{
						xAxisLabel:'评分',
						yAxisLabel:'排名'
					}
				})
			}
				break
			case 'ratings-rank': {
				data.forEach(d => {
					let obj = {
						x: +d.ratings,
						y: d.ranking
					}
					newData.push(obj)
				})
				this.setState({
					domain:{ x: [100, 1000000], y: [ 260,1] },
					label:{
						xAxisLabel:'评分人数（万）',
						yAxisLabel:'排名'
					}
				})
			}
				break
			case 'year-rank':{
				data.forEach(d => {
					let obj = {
						x: +d.year,
						y: d.ranking
					}
					newData.push(obj)
				})
				this.setState({
					domain:{ x: [1930, 2020], y: [ 260,1] },
					label:{
						xAxisLabel:'年份',
						yAxisLabel:'排名'
					}
				})
			}
		}

		newObj = {
			name: type,
			values: newData
		}
		let scatterData = []
		scatterData.push(newObj)
		return scatterData
	}
	handleSelect = (e)=>{
		e = e || window.event
		let val = e.target.value,scatterData
		if (val === '1'){
			scatterData = this.handleScatter(movieData,'ratings-rank')
		} else if (val === '2'){
			scatterData = this.handleScatter(movieData,'score-rank')
		} else if (val === '3'){
			scatterData = this.handleScatter(movieData,'year-rank')
		}
		this.setState({scatterData})
	}
	tickFormat = (val)=>{
		if (val > 10000){
			val =  val /10000
		}
		return val
	}
	render({ }, { areaData, scoreData, scatterData,categoryData,treemapData,domain,label }) {
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
							<BarChart
								width={300}
								height={220}
								data={categoryData}
								XAxis="type"
								YAxis="value"
								axesColor="rgb(243,198,76)"
								tickTextStroke='rgb(243,198,76)'
								tickStroke='rgb(243,198,76)'
								stroke='rgb(9,80,145)'
								domain={{y:[0,170]}}
								yAxisLabel="数量"
							/>
							{/* <Histogram
								hidden={true}
								XAxis="key"
								YAxis="value"
								stroke="rgb(243,198,76)"
								tooltipColor='rgb(0,0,0)'
								data={catgegoryData}
								width={300}
								height={250}
								padding={{ top: 32, bottom: 32, left: 30, right: 20 }}
							/> */}
						</div>
					</div>
					<div class={styles.center}>
						<div class={styles.title}>Top250全球电影可视化分析</div>
						<div class={styles.treemap}>
							<div class={styles.pageWrap}>
								<ul class={styles.tabWrap}>
									<li>
										<input type="radio" id="tab-1" name="tab" checked />
										<label for="tab-1">TreeMap</label>
										<article class={styles.tabContent}>
											<TreeMap
												width="660"
												height="490"
												value="score"
												data={treemapData}
											/>
										</article>
									</li>
									<li>
										<input type="radio" id="tab-2" name="tab" />
										<label for="tab-2">Sunburst</label>
										<article class={styles.tabContent}>
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
										</article>
									</li>
								</ul>
							</div>
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
									x: -5,
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
								xAxisLabel="年份"
								yAxisLabel="评分"
							/>
						</div>
						<div class={styles.scatter}>
							<span class={styles.desc}>关系图</span>
							<div class={styles.select}>
								<select name="slct" onChange={this.handleSelect}>
									<option value="1">评分人数与排名</option>
									<option value="2">评分与排名</option>
									<option value="3">年份与排名</option>
								</select>
							</div>
							<ScatterChart
								circleRadius={2}
								data={scatterData}
								width={300}
								height={250}
								viewBoxObject={{
									x: -5,
									y: 0,
									width: 400,
									height: 250
								}}
								axesColor="rgb(243,198,76)"
								tickTextStroke='rgb(243,198,76)'
								tickStroke='rgb(243,198,76)'
								textColor='rgb(243,198,76)'
								tooltipColor='rgb(0,0,0)'
								domain={domain}
								xAxisFormatter={this.tickFormat}
								{...label}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default Examples
