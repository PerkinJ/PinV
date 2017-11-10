import { h, Component } from 'preact'
// import style from './style.less'
import style from './style.less'
import ScatterPlot from '../ScatterPlot'
import Button from '../Button'
import Input from '../Input'
import Histogram from '../Histogram'
import LineChart from '../LineChart'
import PieChart from '../PieChart'
import * as d3 from 'd3'

const randomData = ()=> d3.range(0, 100, 5)
	.map(key => ({
		key,
		value: Math.random() * 80
	}))

const phoneData = [
	{ name: 'apple', sales: 2000 },
	{ name: 'huawei', sales: 1800 },
	{ name: 'sansung', sales: 2200 },
	{ name: 'xiaomi', sales: 1600 },
	{ name: 'oppo', sales: 1700 },
	{ name: 'vivo', sales: 1500 },
	{ name: 'others', sales: 2100 }
]
export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = { data:randomData()}
	}
	randomizeData = ()=>{
		this.setState({
			data:randomData()
		})
	}
	render({},{data}) {
		return (
			<div class={style.home}>
				<h1>PinV组件展示页</h1>
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
						padding={{top:32,bottom:32,left:30,right:20}} />
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
						padding={{top:32,bottom:32,left:30,right:20}} />
					<Button onClick={this.randomizeData} type="primary">Randomize Data</Button>
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
						padding={{top:32,bottom:32,left:30,right:20}}
					/>
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
