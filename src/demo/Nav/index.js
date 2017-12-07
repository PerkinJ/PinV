import { h, Component } from 'preact'
import style from './style.less'
import { Link } from 'preact-router'

const componentData = [{
	title: '图形结构组件',
	children: [{
		name: 'ChordDiagram',
		key: 'chordDiagram'
	},{
		name: 'ForceDirectedGraph',
		key: 'forceDirectedGraph'
	}]
},{
	title: '层次组件',
	children: [{
		name: 'SunburstLayout',
		key: 'sunburst'
	},{
		name: 'PackLayout',
		key: 'pack'
	},{
		name: 'PartitionLayout',
		key: 'partition'
	},{
		name: 'TreeMapLayout',
		key: 'treemap'
	},{
		name: 'TreeLayout',
		key: 'tree'
	},{
		name: 'ClusterLayout',
		key: 'cluster'
	}]
}, {
	title: '常用可视化组件',
	children: [{
		name: 'Histogram',
		key: 'histogram'
	}, {
		name: 'LineChart',
		key: 'lineChart'
	}, {
		name: 'PieChart',
		key: 'pieChart'
	}, {
		name: 'ScatterPlot',
		key: 'scatterPlot'
	}]
},{
	title: 'WebGL组件',
	children: [{
		name: 'ForceDirectedGraphGL',
		key: 'forceDirectedGraphGL'
	}]
}]

export default class Nav extends Component {
	state = {
		count: 0
	}


	// Note: `user` comes from the URL, courtesy of our router
	render({ }, { }) {
		let search = location.search.split('=')[1]
		return (
			<div class={style.nav}>
				<h1>组件库</h1>
				{componentData.map((value, index) => {
					let title
					if (value.hasOwnProperty('title')) {
						title = value.title
					}
					if (value.hasOwnProperty('children')) {
						return (
							<div key={index}>
								<h3>{title}</h3>
								{value.children.map((val, index) => (
									<Link  style={{color:search=== val.key?'#da7071':'#673ab7'}} class={style.link} href={`/examples?component=${val.key}`} key={index}>{val.name}</Link>
								))}
							</div>
						)
					}
				})}
			</div>
		)
	}
}
