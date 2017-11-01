import { h, Component } from 'preact';
// import style from './style.less'
import style from './style.less' 
import ScatterPlot from '../ScatterPlot'
import Button from '../Button'
import Input from '../Input'
import Histogram from '../Histogram/Histogram'
import d3 from 'd3'
const numDataPoints = 50
const randomNum = () => Math.floor(Math.random() * 1000)
const randomDataSet = () => {
  return Array.apply(null, {length: numDataPoints}).map(() => [randomNum(), randomNum()])
}

const randomizeData = () => {
  return { data: randomDataSet() };
};
const styles = {
	width   : 500,
	height  : 300,
	padding : 30,
	}
const data1 = d3.range(0, 120, 5)
	.map(key => ({
		key,
		value: 500 + Math.random() * 1500
	}));
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { data: randomDataSet() };
	  }
	  randomizeData() {
		this.setState({ data: randomDataSet() });
	  }
	render() {
		return (
			<div class={style.home}>
				<h1>PinV组件展示页</h1>
				<div class={style.control}>
					<h3>散点图组件</h3>
					<ScatterPlot {...this.state} {...styles} />
				</div>
				<div class={style.control}>
					<h3>直方图组件</h3>
					<Histogram data={data1}/>
				</div>
				<div style={{width:'500px',textAlign:'center'}} class={style.control}>
					<h3>Button组件</h3>
					<Button size="small" onClick={() => this.randomizeData()} type="primary">Randomize Data</Button>
					<Button  onClick={() => this.randomizeData()} type="primary">Randomize Data</Button>
					<Button size="large" onClick={() => this.randomizeData()} type="primary">Randomize Data</Button>
					<br/>
					<Button  onClick={() => this.randomizeData()} >Randomize Data</Button>
					<Button  type="ghost" onClick={() => this.randomizeData()} >Randomize Data</Button>
					<Button  type="danger" onClick={() => this.randomizeData()} >Randomize Data</Button>
				</div>
				<div style={{width:'400px'}} class={style.control}>
					<h3 style={{textAlign:'center'}}>Input组件</h3>
					<Input 
						inputStyle={{color:'#000'}} 
						theme="isao" label="姓名" 
						onChange={(e)=>console.log(e)} 
						type="text"  
						placeholder="这只是测试"
					/>				
					<Input
						theme="minor" 
						label="姓名" 
						onChange={(e)=>console.log(e)} 
						type="text"  
						placeholder="这只是测试"
					/>
					<Input 
						textareaStyle={{color:'#000'}} 
						type="textarea" theme="isao" 
						label="姓名" 
						onChange={(e)=>console.log(e)}  
						placeholder="这只是测试"
					/>
					<Input 
						type="textarea"  
						label="姓名" 
						placeholder="这只是测试"
					/>
					<Input type="number" label="数字" placeholder="请输入数字"/>
					<div style={{textAlign:'center'}}>
						<Input type="text" label="账号" placeholder="请输入账号"/>
						<Input type="password" label="密码" placeholder="请输入密码"/>
						<Button style={{background:'#673ab7'}} type="primary">submit</Button>
						<Button>reset</Button>	
					</div>
				</div>
			</div>
		)
	}
}
