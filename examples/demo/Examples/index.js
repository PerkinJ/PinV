import { h, Component } from 'preact'
import style from './style.less'
import {
	ScatterPlot, Button, Input, Histogram, LineChart, PieChart,
	TreeLayout, ClusterLayout, TreeMapLayout, PackLayout,
	SunburstLayout, PartitionLayout, ForceDirectedGraphGL, ForceDirectedGraph,
	ChordDiagram, StreamGraph, ScatterChart
} from 'pinv'
import * as d3 from 'd3'
import forceData from '../forceData.json'
import flareData from '../flare.json'

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
let category = ['亚洲', '欧洲', '非洲', '美洲', '大洋洲']

let data1 = [
	[9000, 870, 3000, 1000, 5200],
	[3400, 8000, 2300, 4922, 374],
	[2000, 2000, 7700, 4881, 1050],
	[3000, 8012, 5531, 500, 400],
	[3540, 4310, 1500, 1900, 300]
]

const randomData = () => d3.range(0, 100, 5)
	.map(key => ({
		key,
		value: Math.round(Math.random() * 80)
	}))
const getRandomPhoneData = () => {
	return [
		{ name: 'apple', sales: 1000 + Math.floor(Math.random() * 1000) },
		{ name: 'huawei', sales: 800 + Math.floor(Math.random() * 1000) },
		{ name: 'sansung', sales: 1200 + Math.floor(Math.random() * 1000) },
		{ name: 'xiaomi', sales: 700 + Math.floor(Math.random() * 1000) },
		{ name: 'oppo', sales: 800 + Math.floor(Math.random() * 1000) },
		{ name: 'vivo', sales: 500 + Math.floor(Math.random() * 1000) },
		{ name: 'others', sales: 1300 + Math.floor(Math.random() * 1000) }
	]
}
const treeData = {
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

export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: randomData(),
			phoneData: getRandomPhoneData(),
			streamData: generateStreamData()
		}
	}
	updateStreamData = () => {
		this.setState({
			streamData: generateStreamData()
		})
	}
	handleClick = (e, node) => {
		confirm(`您点击的值为${node.value}，是否要跳转`) ? window.open('http://csu.edu.cn') : ''
	}
	randomizeData = () => {
		this.setState({
			data: randomData(),
			phoneData: getRandomPhoneData()
		})
	}
	componentDidMount() {


	}
	render({ }, { data, phoneData, streamData }) {
		return (
			<div class={style.home}>
				<div class={style.control}>
					<ScatterChart
						data={scatterData}
						width={500}
						height={400}

						// domain={{ y: [-15,], y: [-15,] }}
						title="Scatter Chart"
					/>
				</div>
				<div class={style.control}>
					<LineChart
						legend={true}
						data={lineData}
						width='80%'
						height={400}
						sideOffset={100}
						// axesColor="#00BCD4"
						// tickStroke="#00BCD4"
						// tickTextStroke="#00BCD4"
						// textColor="#00BCD4"
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
				</div>
				<div class={style.control}>
					<h3>流式布局组件</h3>
					<StreamGraph
						padding={{ top: 0, right: 0, bottom: 30, left: 20 }}
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
					<Button onClick={this.updateStreamData} type="primary">变更数据</Button>
				</div>
				{/* <div class={style.control}>
					<h3>区域面积图</h3>
					<StackedAreaChart
						// data={stackedAreaData}
					/>
				</div> */}
				<div class={style.control}>
					<h3>弦图组件</h3>
					<ChordDiagram
						data={data1}
						category={category}
						width="500"
						height="500"
						arcWidth="15"
						padding="20"
						padAngle="0.04"
						interactive={true}
					/>
				</div>
				<div class={style.control}>
					<h3>力导向布局</h3>
					<ForceDirectedGraph
						data={forceData}
						width={1000}
						height={500}
						tooltip={['id', 'group']}
						velocityDecay="0.5"
					/>
				</div>
				<div class={style.control}>
					<h3>力导向布局-WebGL</h3>
					<ForceDirectedGraphGL
						data={forceData}
						width={1000}
						height={500}
					/>
				</div>
				<div class={style.control}>
					<h3>旭日图组件</h3>
					<SunburstLayout
						data={flareData}
						onClick={this.handleClick}
						width="600"
						height="660"
						padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
						dataKey="size"
						nameKey="name"
						interactive={true}
						backgroundColor="rgba(0,105,92,0.8)"
						hoverColor="rgba(38,166,154,0.2)"
						angle={1}
					/>
				</div>
				<div class={style.control}>
					<h3>分区布局组件</h3>
					<PartitionLayout
						data={treeData}
						width="400"
						height="300"
						padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
						dataKey="value"
						nameKey="name"
						interactive={true}
						backgroundColor="rgba(186,104,200,0.2)"
						hoverColor="rgba(103,58,183,0.8)"
					/>
				</div>
				<div class={style.control}>
					<h3>圆填充组件</h3>
					<PackLayout
						data={treeData}
						width="400"
						height="300"
						padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
						dataKey="value"
						nameKey="name"
						interactive={true}
						backgroundColor="rgba(38,198,218,0.2)"
						hoverColor="rgba(100,181,246,0.8)"
					/>
				</div>
				<div class={style.control}>
					<h3>树矩形组件</h3>
					<TreeMapLayout
						data={treeData}
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
				</div>

				<div class={style.control}>
					<h3>簇形组件</h3>
					<ClusterLayout
						data={treeData}
						width="400"
						height="300"
						padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
						dataKey="value"
						nameKey="name"
						interactive={true}
						backgroundColor="#CDDC39"
						hoverColor="rgba(139,195,74,0.8)"
					/>
				</div>
				<div class={style.control}>
					<h3>树形组件</h3>
					<TreeLayout
						data={treeData}
						width="400"
						height="300"
						padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
						dataKey="value"
						nameKey="name"
						interactive={true}
						backgroundColor="#CDDC39"
						hoverColor="rgba(139,195,74,0.8)"
					/>
				</div>
				<div class={style.control}>
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
				</div>
				{/* <div class={style.control}>
					<h3>折线图组件</h3>
					<LineChart
						XAxis="key"
						YAxis="value"
						data={data}
						width={500}
						height={300}
						shape="curveCardinal"
						padding={{ top: 32, bottom: 32, left: 30, right: 20 }} />
					<Button onClick={this.randomizeData} type="primary">Randomize Data</Button>
				</div> */}
				<div class={style.control}>
					<h3>饼状图组件</h3>
					<PieChart
						data={phoneData}
						width="500"
						height="500"
						innerRadius={0}
						outerRadius={180}
						textColor="#000"
						dataKey="sales"
						nameKey="name"
						padAngle={0}
						cornerRadius={0}
						startAngle={0}
						endAngle={1}
						unit="万台"
					/>
					<Button onClick={this.randomizeData} type="primary">Randomize Data</Button>
				</div>
				<div class={style.control}>
					<h3>散点图组件</h3>
					<ScatterPlot
						XAxis="key"
						YAxis="value"
						data={data}
						width={500}
						height={300}
						circleStroke="#000"
						padding={{ top: 32, bottom: 32, left: 30, right: 20 }} />
					<Button onClick={this.randomizeData} type="primary">Randomize Data</Button>
				</div>
				<div style={{ width: '500px', textAlign: 'center' }} class={style.control}>
					<h3>Button组件</h3>
					<Button size="small" onClick={this.randomizeData} type="primary">Randomize Data</Button>
					<Button onClick={this.randomizeData} type="primary">Randomize Data</Button>
					<Button size="large" onClick={this.randomizeData} type="primary">Randomize Data</Button>
					<br />
					<Button onClick={this.randomizeData} >Randomize Data</Button>
					<Button type="ghost" onClick={this.randomizeData} >Randomize Data</Button>
					<Button type="danger" onClick={this.randomizeData} >Randomize Data</Button>
				</div>
				<div style={{ width: '400px' }} class={style.control}>
					<h3 style={{ textAlign: 'center' }}>Input组件</h3>
					<Input
						inputStyle={{ color: '#000' }}
						theme="isao" label="姓名"
						onChange={(e) => console.log(e)}
						type="text"
						placeholder="这只是测试"
					/>
					<Input
						theme="minor"
						label="姓名"
						onChange={(e) => console.log(e)}
						type="text"
						placeholder="这只是测试"
					/>
					<Input
						textareaStyle={{ color: '#000' }}
						type="textarea" theme="isao"
						label="姓名"
						onChange={(e) => console.log(e)}
						placeholder="这只是测试"
					/>
					<Input
						type="textarea"
						label="姓名"
						placeholder="这只是测试"
					/>
					<Input type="number" label="数字" placeholder="请输入数字" />
					<div style={{ textAlign: 'center' }}>
						<Input type="text" label="账号" placeholder="请输入账号" />
						<Input type="password" label="密码" placeholder="请输入密码" />
						<Button style={{ background: '#673ab7' }} type="primary">submit</Button>
						<Button>reset</Button>
					</div>
				</div>
			</div>
		)
	}
}
