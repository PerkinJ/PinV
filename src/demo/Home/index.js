import { h, Component } from 'preact'
import style from './style.less'
import {
	ScatterPlot, Button, Input, Histogram, LineChart, PieChart,
	TreeLayout, ClusterLayout, TreeMapLayout, PackLayout,
	SunburstLayout, PartitionLayout, ForceDirectedGraphGL, ForceDirectedGraph,
	ChordDiagram
} from 'pinv'
import * as d3 from 'd3'
import forceData from '../forceData'

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

export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: randomData(),
			phoneData: getRandomPhoneData()
		}
	}
	randomizeData = () => {
		this.setState({
			data: randomData(),
			phoneData: getRandomPhoneData()
		})
	}
	render({ }, { data, phoneData }) {
		return (
			<div class={style.home}>
				<div class={style.control}>
					<h3>弦图组件</h3>
					<ChordDiagram />
				</div>
				<div class={style.control}>
					<h3>力导向布局</h3>
					<ForceDirectedGraph
						force="Position-x"
						data={forceData}
						width={1000}
						height={500}
						tooltip={['id','group']}
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
					<h3>辐射组件</h3>
					<SunburstLayout
						data={treeData}
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
				<div class={style.control}>
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
				</div>
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
