import { h, Component } from 'preact';
// import style from './style.less'
import style from './style.less' 
import ScatterPlot from '../ScatterPlot'
import Button from '../Button'
import Input from '../Input'
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
				<ScatterPlot {...this.state} {...styles} />
				<div class={style.control}>
					<h3>Button组件</h3>
					<Button size="small" onClick={() => this.randomizeData()} type="primary">Randomize Data</Button>
					<Button  onClick={() => this.randomizeData()} type="primary">Randomize Data</Button>
					<Button size="large" onClick={() => this.randomizeData()} type="primary">Randomize Data</Button>
					<br/>
					<Button  onClick={() => this.randomizeData()} >Randomize Data</Button>
					<Button  type="ghost" onClick={() => this.randomizeData()} >Randomize Data</Button>
					<Button  type="danger" onClick={() => this.randomizeData()} >Randomize Data</Button>
				</div>
				<div style={{width:'400px',margin:'50px auto'}} class={style.control}>
					<h3>Input组件</h3>
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
					<Input type="textarea"  label="姓名" onChange={(e)=>console.log(e)}  placeholder="这只是测试"/>
					<div>
						<Button style={{background:'#673ab7'}} type="primary">submit</Button>
						<Button>reset</Button>	
					</div>
				</div>
			</div>
		)
	}
}
