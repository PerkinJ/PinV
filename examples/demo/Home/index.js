import { h, Component } from 'preact'
import style from './style.less'
import Nav from '../Nav'
import {
	ScatterPlot, Button, Histogram, LineChart, PieChart,
	TreeLayout, ClusterLayout, TreeMapLayout, PackLayout,
	SunburstLayout, PartitionLayout, ForceDirectedGraph,
	ForceDirectedGraphGL,ChordDiagram
} from 'pinv'

import {
	sunburstData, partitionData, packData, treeMapData, clusterData, treeData,
	histogramData, scatterPlotData, lineChartData, pieChartData, forceDirectedData,
	chordDiagramData
} from '../api'
import * as d3 from 'd3'
import forceData from '../forceData.json'
let category = ['亚洲', '欧洲', '非洲', '美洲', '大洋洲']

let data1 = [
	[9000, 870, 3000, 1000, 5200],
	[3400, 8000, 2300, 4922, 374],
	[2000, 2000, 7700, 4881, 1050],
	[3000, 8012, 5531, 500, 400],
	[3540, 4310, 1500, 1900, 300]
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
		let search = location.search.split('=')[1] || 'chordDiagram'
		return (
			<div class={style.home}>
				<Nav />
				<div class={style.container}>
					{search === 'chordDiagram' && <div class={style.control}>
						<h3>弦图组件</h3>
						<ChordDiagram
							data={data1}
							category={category}
							width="450"
							height="450"
							arcWidth="15"
							padding="20"
							padAngle="0.04"
							interactive={true}
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
						<h3>辐射组件</h3>
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
								辐射组件，一种层级结构的可视化组件
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
					{search === 'treemap' && <div class={style.control}>
						<h3>树矩形组件</h3>
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
							XAxis="key"
							YAxis="value"
							data={data}
							width={500}
							height={300}
							shape="curveCardinal"
							padding={{ top: 32, bottom: 32, left: 30, right: 20 }} />
						<Button onClick={this.randomizeData} type="primary">Randomize Data</Button>
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
						<ScatterPlot
							XAxis="key"
							YAxis="value"
							data={data}
							width={500}
							height={300}
							circleStroke="#000"
							padding={{ top: 32, bottom: 32, left: 30, right: 20 }} />
						<Button onClick={this.randomizeData} type="primary">Randomize Data</Button>
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
