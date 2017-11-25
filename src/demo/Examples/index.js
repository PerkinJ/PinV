import { h, Component } from 'preact'
import style from './style.less'
import Nav from '../Nav'
import {
	ScatterPlot, Button, Histogram, LineChart, PieChart,
	TreeLayout, ClusterLayout, TreeMapLayout, PackLayout,
	SunburstLayout, PartitionLayout
} from 'pinv'
import * as d3 from 'd3'

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
export default class Examples extends Component {
	state = {
		data: randomData(),
		phoneData: getRandomPhoneData()
	}


	randomizeData = () => {
		this.setState({
			data: randomData(),
			phoneData: getRandomPhoneData()
		})
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ }, { data, phoneData }) {
		let search = location.search.split('=')[1] || 'sunburst'
		return (
			<div class={style.home}>
				<Nav />
				<div class={style.container}>
					{search === 'sunburst' && <div class={style.control}>
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
					</div>}
					{search === 'partition' && <div class={style.control}>
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
					</div>}
					{search === 'pack' && <div class={style.control}>
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
					</div>}
					{search === 'treemap' && <div class={style.control}>
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
					</div>}
					{search === 'cluster' && <div class={style.control}>
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
					</div>}
					{search === 'tree' && <div class={style.control}>
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

					</div>}
					{search === 'lineChart' && <div class={style.control}>
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
					</div>}
					{search === 'pieChart' && <div class={style.control}>
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
					</div>}
					{search === 'scatterPlot' && <div class={style.control}>
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
					</div>}
				</div>
			</div>
		)
	}
}
