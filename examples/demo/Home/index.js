import { h, Component } from 'preact'
import style from './style.less'
import Nav from '../Nav'
import {
	ScatterChart, Button, Histogram, LineChart, PieChart,
	TreeLayout, ClusterLayout, TreeMapLayout, PackLayout,
	SunburstLayout, PartitionLayout, ForceDirectedGraph,
	ForceDirectedGraphGL, ChordDiagram, StreamGraph,TreeMap
} from 'pinv'

import {
	sunburstData, partitionData, packData, treeMapData,treeMapLayoutData, clusterData, treeData,
	histogramData, scatterPlotData, lineChartData, pieChartData, forceDirectedData,
	chordDiagramData, streamGraphData
} from '../api'
import * as d3 from 'd3'
import forceData from '../forceData.json'
import flareData from '../flare.json'
import readmeData from '../readme.json'

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
const jsonData = {
	"name": "A1",
	"children": [
		{
			"name": "B1",
			"children": [
				{
					"name": "C1",
					"value": 100
				},
				{
					"name": "C2",
					"value": 300
				},
				{
					"name": "C3",
					"value": 200
				}
			]
		},
		{
			"name": "B2",
			"children": [
				{
					"name": "C4",
					"value": 100
				},
				{
					"name": "C5",
					"value": 300
				}
			]
		},
		{
			"name": "B3",
			"value": 400
		}
	]
}
const randomData = () => d3.range(0, 100, 5)
	.map(key => ({
		key,
		value: Math.round(Math.random() * 80)
	}))
const getRandomPhoneData = () => {
	return [
		{ label: 'apple', value: 1000 + Math.floor(Math.random() * 1000) },
		{ label: 'huawei', value: 800 + Math.floor(Math.random() * 1000) },
		{ label: 'sansung', value: 1200 + Math.floor(Math.random() * 1000) },
		{ label: 'xiaomi', value: 700 + Math.floor(Math.random() * 1000) },
		{ label: 'oppo', value: 800 + Math.floor(Math.random() * 1000) },
		{ label: 'vivo', value: 500 + Math.floor(Math.random() * 1000) },
		{ label: 'others', value: 1300 + Math.floor(Math.random() * 1000) }
	]
}
// stream graph
let n = 20, // number of layers
	m = 200, // number of samples per layer
	k = 10 // number of bumps per layer
// 模拟stream数据
const generateStreamData = () => {
	return d3.transpose(d3.range(n).map(() => bumps(m, k)))
}

// Inspired by Lee Byron’s test data generator.
function bumps(n, m) {
	let a = [], i
	for (i = 0; i < n; ++i) a[i] = 0
	for (i = 0; i < m; ++i) bump(a, n)
	return a
}

function bump(a, n) {
	let x = 1 / (0.1 + Math.random()),
		y = 2 * Math.random() - 0.5,
		z = 10 / (0.1 + Math.random())
	for (let i = 0; i < n; i++) {
		let w = (i / n - y) * z
		a[i] += x * Math.exp(-w * w)
	}
}
export default class Examples extends Component {
	state = {
		data: randomData(),
		phoneData: getRandomPhoneData(),
		streamData: generateStreamData()
	}

	randomizeData = () => {
		this.setState({
			data: randomData(),
			phoneData: getRandomPhoneData()
		})
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ }, { data, phoneData, streamData }) {
		let search = location.search.split('=')[1] || 'streamGraph'
		return (
			<div class={style.home}>
				<Nav />
				<div class={style.container}>
					{search === 'streamGraph' && <div class={style.control}>
						<h3>流式图组件</h3>
						<StreamGraph
							padding={{ top: 0, right: 0, bottom: 0, left: 0 }}
							width="600"
							height="400"
							data={streamData}
							labels={[
								'The Sea and Cake',
								'Andrew Bird',
								'Laura Veirs',
								'Brian Eno',
								'Christopher Willits',
								'Wilco',
								'Edgar Meyer',
								'B\xc3\xa9la Fleck',
								'Fleet Foxes',
								'Kings of Convenience',
								'Brett Dennen',
								'Psapp',
								'The Bad Plus',
								'Feist',
								'Battles',
								'Avishai Cohen',
								'Rachael Yamagata',
								'Norah Jones',
								'B\xc3\xa9la Fleck and the Flecktones',
								'Joshua Redman'
							]}
						/>
						<div class={style.apiContainer}>
							<h3 class={style.title}>
								StreamGraph
							</h3>
							<div class={style.description}>
								流式图组件，一种强调各层数据之间情感联系的堆叠图形。
							</div>
							<div class={style.box}>
								<h3>参数</h3>
								<ul>
									{streamGraphData.map((value, index) =>
										<li key={index} class={style.list}>
											<span class={style.name}>{value.name}</span>
											<span> | </span>
											<span class={style.type}>({value.type})</span>
											{value.default && <div class={style.default}>default:<span>{value.default}</span></div>}
											{value.options && <div class={style.options}>可选:<span style={{ background: '#ccc', padding: 3 }}>{value.options}</span></div>}
											<div class={style.detail} dangerouslySetInnerHTML={{ __html: value.detail }} />
										</li>
									)}

								</ul>
							</div>
						</div>
					</div>}
					{search === 'chordDiagram' && <div class={style.control}>
						<h3>弦图组件</h3>
						{/* <ChordDiagram
							data={data1}
							category={category}
							width="450"
							height="450"
							arcWidth="15"
							padding="20"
							padAngle="0.04"
							interactive={true}
						/> */}
						<ChordDiagram
							data={readmeData}
						/>
						<div class={style.apiContainer}>
							<h3 class={style.title}>
								ChordDiagram
							</h3>
							<div class={style.description}>
								弦图组件,用于表示一组元素之间的联系。源数据是一个方块矩阵（行数跟列数相等,N X N）
							</div>
							<div class={style.box}>
								<h3>参数</h3>
								<ul>
									{chordDiagramData.map((value, index) =>
										<li key={index} class={style.list}>
											<span class={style.name}>{value.name}</span>
											<span> | </span>
											<span class={style.type}>({value.type})</span>
											{value.default && <div class={style.default}>default:<span>{value.default}</span></div>}
											{value.options && <div class={style.options}>可选:<span style={{ background: '#ccc', padding: 3 }}>{value.options}</span></div>}
											<div class={style.detail} dangerouslySetInnerHTML={{ __html: value.detail }} />
										</li>
									)}

								</ul>
							</div>
						</div>
					</div>}
					{search === 'forceDirectedGraphGL' && <div class={style.control}>
						<h3>力导向布局</h3>
						<ForceDirectedGraphGL
							data={forceData}
							width={1000}
							height={500}
						/>
						<div class={style.apiContainer}>
							<h3 class={style.title}>
								ForceDirectedGraph
							</h3>
							<div class={style.description}>
								力导向组件
							</div>
							<div class={style.box}>
								<h3>参数</h3>
								<ul>
									{forceDirectedData.map((value, index) =>
										<li key={index} class={style.list}>
											<span class={style.name}>{value.name}</span>
											<span> | </span>
											<span class={style.type}>({value.type})</span>
											{value.default && <div class={style.default}>default:<span>{value.default}</span></div>}
											{value.options && <div class={style.options}>可选:<span style={{ background: '#ccc', padding: 3 }}>{value.options}</span></div>}
											<div class={style.detail} dangerouslySetInnerHTML={{ __html: value.detail }} />
										</li>
									)}

								</ul>
							</div>
						</div>
					</div>}
					{search === 'forceDirectedGraph' && <div class={style.control}>
						<h3>力导向布局</h3>
						<ForceDirectedGraph
							data={forceData}
							width={800}
							height={500}
							force="ManyBody"
							tooltip={['id', 'group']}
						/>
						<div class={style.apiContainer}>
							<h3 class={style.title}>
								ForceDirectedGraph
							</h3>
							<div class={style.description}>
								力导向组件
							</div>
							<div class={style.box}>
								<h3>参数</h3>
								<ul>
									{forceDirectedData.map((value, index) =>
										<li key={index} class={style.list}>
											<span class={style.name}>{value.name}</span>
											<span> | </span>
											<span class={style.type}>({value.type})</span>
											{value.default && <div class={style.default}>default:<span>{value.default}</span></div>}
											{value.options && <div class={style.options}>可选:<span style={{ background: '#ccc', padding: 3 }}>{value.options}</span></div>}
											<div class={style.detail} dangerouslySetInnerHTML={{ __html: value.detail }} />
										</li>
									)}

								</ul>
							</div>
						</div>
					</div>}
					{search === 'sunburst' && <div class={style.control}>
						<h3>旭日图组件</h3>
						<SunburstLayout
							data={jsonData}
							width="400"
							height="300"
							padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
							dataKey="value"
							nameKey="name"
							interactive={true}
							backgroundColor="rgba(0,105,92,0.8)"
							hoverColor="rgba(38,166,154,0.2)"
							radius={140}
							angle={1}
						/>
						<div class={style.apiContainer}>
							<h3 class={style.title}>
								SunburstLayout
							</h3>
							<div class={style.description}>
								旭日图组件，一种层级结构的可视化组件
							</div>
							<div class={style.box}>
								<h3>参数</h3>
								<ul>
									{sunburstData.map((value, index) =>
										<li key={index} class={style.list}>
											<span class={style.name}>{value.name}</span>
											<span> | </span>
											<span class={style.type}>({value.type})</span>
											{value.default && <div class={style.default}>default:<span>{value.default}</span></div>}
											{value.options && <div class={style.options}>可选:<span style={{ background: '#ccc', padding: 3 }}>{value.options}</span></div>}
											<div class={style.detail} dangerouslySetInnerHTML={{ __html: value.detail }} />
										</li>
									)}

								</ul>
							</div>
						</div>
					</div>}
					{search === 'partition' && <div class={style.control}>
						<h3>分区布局组件</h3>
						<PartitionLayout
							data={jsonData}
							width="400"
							height="300"
							padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
							dataKey="value"
							nameKey="name"
							interactive={true}
							backgroundColor="rgba(186,104,200,0.2)"
							hoverColor="rgba(103,58,183,0.8)"
						/>
						<div class={style.apiContainer}>
							<h3 class={style.title}>
								PartitionLayout
							</h3>
							<div class={style.description}>
								分区布局组件，一种层级结构的可视化组件
							</div>
							<div class={style.box}>
								<h3>参数</h3>
								<ul>
									{partitionData.map((value, index) =>
										<li key={index} class={style.list}>
											<span class={style.name}>{value.name}</span>
											<span> | </span>
											<span class={style.type}>({value.type})</span>
											{value.default && <div class={style.default}>default:<span>{value.default}</span></div>}
											{value.options && <div class={style.options}>可选:<span style={{ background: '#ccc', padding: 3 }}>{value.options}</span></div>}
											<div class={style.detail} dangerouslySetInnerHTML={{ __html: value.detail }} />
										</li>
									)}

								</ul>
							</div>
						</div>
					</div>}
					{search === 'pack' && <div class={style.control}>
						<h3>圆填充组件</h3>
						<PackLayout
							data={jsonData}
							width="400"
							height="300"
							padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
							dataKey="value"
							nameKey="name"
							interactive={true}
							backgroundColor="rgba(38,198,218,0.2)"
							hoverColor="rgba(100,181,246,0.8)"
						/>
						<div class={style.apiContainer}>
							<h3 class={style.title}>
								PackLayout
							</h3>
							<div class={style.description}>
								圆填充组件，一种层级结构的可视化组件
							</div>
							<div class={style.box}>
								<h3>参数</h3>
								<ul>
									{packData.map((value, index) =>
										<li key={index} class={style.list}>
											<span class={style.name}>{value.name}</span>
											<span> | </span>
											<span class={style.type}>({value.type})</span>
											{value.default && <div class={style.default}>default:<span>{value.default}</span></div>}
											{value.options && <div class={style.options}>可选:<span style={{ background: '#ccc', padding: 3 }}>{value.options}</span></div>}
											<div class={style.detail} dangerouslySetInnerHTML={{ __html: value.detail }} />
										</li>
									)}

								</ul>
							</div>
						</div>
					</div>}
					{search === 'treemaplayout' && <div class={style.control}>
						<h3>树矩形组件（偏交互）</h3>
						<TreeMapLayout
							data={jsonData}
							width="400"
							height="300"
							padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
							dataKey="value"
							nameKey="name"
							interactive={true}
							ratio="2"
							backgroundColor="rgba(186,104,200,0.2)"
							hoverColor="rgba(103,58,183,0.8)"
						/>
						<div class={style.apiContainer}>
							<h3 class={style.title}>
								TreeMapLayout
							</h3>
							<div class={style.description}>
								树矩形组件，一种层级结构的可视化组件
							</div>
							<div class={style.box}>
								<h3>参数</h3>
								<ul>
									{treeMapLayoutData.map((value, index) =>
										<li key={index} class={style.list}>
											<span class={style.name}>{value.name}</span>
											<span> | </span>
											<span class={style.type}>({value.type})</span>
											{value.default && <div class={style.default}>default:<span>{value.default}</span></div>}
											{value.options && <div class={style.options}>可选:<span style={{ background: '#ccc', padding: 3 }}>{value.options}</span></div>}
											<div class={style.detail} dangerouslySetInnerHTML={{ __html: value.detail }} />
										</li>
									)}
								</ul>
							</div>
						</div>
					</div>}
					{search === 'treemap' && <div class={style.control}>
						<h3>树矩形组件(偏展示)</h3>
						<TreeMap
							width="660"
							height="400"
							value="size"
							data={flareData}
						/>
						<div class={style.apiContainer}>
							<h3 class={style.title}>
								TreeMap
							</h3>
							<div class={style.description}>
								树矩形组件，一种层级结构的可视化组件
							</div>
							<div class={style.box}>
								<h3>参数</h3>
								<ul>
									{treeMapData.map((value, index) =>
										<li key={index} class={style.list}>
											<span class={style.name}>{value.name}</span>
											<span> | </span>
											<span class={style.type}>({value.type})</span>
											{value.default && <div class={style.default}>default:<span>{value.default}</span></div>}
											{value.options && <div class={style.options}>可选:<span style={{ background: '#ccc', padding: 3 }}>{value.options}</span></div>}
											<div class={style.detail} dangerouslySetInnerHTML={{ __html: value.detail }} />
										</li>
									)}

								</ul>
							</div>
						</div>
					</div>}
					{search === 'cluster' && <div class={style.control}>
						<h3>簇形组件</h3>
						<ClusterLayout
							data={jsonData}
							width="400"
							height="300"
							padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
							dataKey="value"
							nameKey="name"
							interactive={true}
							backgroundColor="#CDDC39"
							hoverColor="rgba(139,195,74,0.8)"
						/>
						<div class={style.apiContainer}>
							<h3 class={style.title}>
								ClusterpLayout
							</h3>
							<div class={style.description}>
								簇形组件，一种层级结构的可视化组件
							</div>
							<div class={style.box}>
								<h3>参数</h3>
								<ul>
									{clusterData.map((value, index) =>
										<li key={index} class={style.list}>
											<span class={style.name}>{value.name}</span>
											<span> | </span>
											<span class={style.type}>({value.type})</span>
											{value.default && <div class={style.default}>default:<span>{value.default}</span></div>}
											{value.options && <div class={style.options}>可选:<span style={{ background: '#ccc', padding: 3 }}>{value.options}</span></div>}
											<div class={style.detail} dangerouslySetInnerHTML={{ __html: value.detail }} />
										</li>
									)}

								</ul>
							</div>
						</div>
					</div>}
					{search === 'tree' && <div class={style.control}>
						<h3>树形组件</h3>
						<TreeLayout
							data={jsonData}
							width="400"
							height="300"
							padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
							dataKey="value"
							nameKey="name"
							interactive={true}
							backgroundColor="#CDDC39"
							hoverColor="rgba(139,195,74,0.8)"
						/>
						<div class={style.apiContainer}>
							<h3 class={style.title}>
								TreeLayout
							</h3>
							<div class={style.description}>
								树形组件，一种层级结构的可视化组件
							</div>
							<div class={style.box}>
								<h3>参数</h3>
								<ul>
									{treeData.map((value, index) =>
										<li key={index} class={style.list}>
											<span class={style.name}>{value.name}</span>
											<span> | </span>
											<span class={style.type}>({value.type})</span>
											{value.default && <div class={style.default}>default:<span>{value.default}</span></div>}
											{value.options && <div class={style.options}>可选:<span style={{ background: '#ccc', padding: 3 }}>{value.options}</span></div>}
											<div class={style.detail} dangerouslySetInnerHTML={{ __html: value.detail }} />
										</li>
									)}

								</ul>
							</div>
						</div>
					</div>}
					{search === 'histogram' && <div class={style.control}>
						<h3>直方图组件</h3>
						<Histogram
							hidden={true}
							XAxis="key"
							YAxis="value"
							data={data}
							width={500}
							height={300}
							padding={{ top: 32, bottom: 32, left: 30, right: 20 }}
						/>
						<Button onClick={this.randomizeData} type="primary">Randomize Data</Button>
						<div class={style.apiContainer}>
							<h3 class={style.title}>
								Histogram
							</h3>
							<div class={style.description}>
								直方图组件
							</div>
							<div class={style.box}>
								<h3>参数</h3>
								<ul>
									{histogramData.map((value, index) =>
										<li key={index} class={style.list}>
											<span class={style.name}>{value.name}</span>
											<span> | </span>
											<span class={style.type}>({value.type})</span>
											{value.default && <div class={style.default}>default:<span>{value.default}</span></div>}
											{value.options && <div class={style.options}>可选:<span style={{ background: '#ccc', padding: 3 }}>{value.options}</span></div>}
											<div class={style.detail} dangerouslySetInnerHTML={{ __html: value.detail }} />
										</li>
									)}

								</ul>
							</div>
						</div>
					</div>}
					{search === 'lineChart' && <div class={style.control}>
						<h3>折线图组件</h3>
						<LineChart
							legend={true}
							data={lineData}
							width={500}
							height={400}
							sideOffset={100}
							legendPosition="top"
							viewBoxObject={{
								x: 0,
								y: 0,
								width: 550,
								height: 400
							}}
							title="折线图"
							yAxisLabel="Altitude"
							xAxisLabel="横坐标"
							domain={{ x: [, 6], y: [-10,] }}
							gridHorizontal={true}
						/>
						<div class={style.apiContainer}>
							<h3 class={style.title}>
								LineChart
							</h3>
							<div class={style.description}>
								折线图组件
							</div>
							<div class={style.box}>
								<h3>参数</h3>
								<ul>
									{lineChartData.map((value, index) =>
										<li key={index} class={style.list}>
											<span class={style.name}>{value.name}</span>
											<span> | </span>
											<span class={style.type}>({value.type})</span>
											{value.default && <div class={style.default}>default:<span>{value.default}</span></div>}
											{value.options && <div class={style.options}>可选:<span style={{ background: '#ccc', padding: 3 }}>{value.options}</span></div>}
											<div class={style.detail} dangerouslySetInnerHTML={{ __html: value.detail }} />
										</li>
									)}

								</ul>
							</div>
						</div>
					</div>}
					{search === 'pieChart' && <div class={style.control}>
						<h3>饼状图组件</h3>
						{/* <PieChart
							data={phoneData}
							width="500"
							height="500"
							innerRadius={0}
							outerRadius={180}
							textColor="#000"
							dataKey="value"
							nameKey="name"
							padAngle={0}
							cornerRadius={0}
							startAngle={0}
							endAngle={1}
							unit="万台"
						/> */}
						<PieChart
							data={phoneData}
							width={600}
							height={400}
							radius={150}
							innerRadius={20}
							title="Pie Chart"
							unit="台"
						/>
						<Button onClick={this.randomizeData} type="primary">Randomize Data</Button>
						<div class={style.apiContainer}>
							<h3 class={style.title}>
								PieChart
							</h3>
							<div class={style.description}>
								饼状图组件
							</div>
							<div class={style.box}>
								<h3>参数</h3>
								<ul>
									{pieChartData.map((value, index) =>
										<li key={index} class={style.list}>
											<span class={style.name}>{value.name}</span>
											<span> | </span>
											<span class={style.type}>({value.type})</span>
											{value.default && <div class={style.default}>default:<span>{value.default}</span></div>}
											{value.options && <div class={style.options}>可选:<span style={{ background: '#ccc', padding: 3 }}>{value.options}</span></div>}
											<div class={style.detail} dangerouslySetInnerHTML={{ __html: value.detail }} />
										</li>
									)}

								</ul>
							</div>
						</div>
					</div>}
					{search === 'scatterPlot' && <div class={style.control}>
						<h3>散点图组件</h3>
						<ScatterChart
							data={scatterData}
							width={500}
							height={400}
							legend={true}
							legendPosition="top"
							domain={{ y: [-15,], y: [-15,] }}
							title="Scatter Chart"
						/>
						{/* <Button onClick={this.randomizeData} type="primary">Randomize Data</Button> */}
						<div class={style.apiContainer}>
							<h3 class={style.title}>
								ScatterPlot
							</h3>
							<div class={style.description}>
								散点图组件
							</div>
							<div class={style.box}>
								<h3>参数</h3>
								<ul>
									{scatterPlotData.map((value, index) =>
										<li key={index} class={style.list}>
											<span class={style.name}>{value.name}</span>
											<span> | </span>
											<span class={style.type}>({value.type})</span>
											{value.default && <div class={style.default}>default:<span>{value.default}</span></div>}
											{value.options && <div class={style.options}>可选:<span style={{ background: '#ccc', padding: 3 }}>{value.options}</span></div>}
											<div class={style.detail} dangerouslySetInnerHTML={{ __html: value.detail }} />
										</li>
									)}

								</ul>
							</div>
						</div>
					</div>}
				</div>
			</div>
		)
	}
}
