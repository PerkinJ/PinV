import { h, Component } from 'preact';
// import style from './style.less'
import style from './style.less' 
import ScatterPlot from '../Scatter-plot'
import Button from '../Button'
const numDataPoints = 50;
const randomNum = () => Math.floor(Math.random() * 1000);
const randomDataSet = () => {
  return Array.apply(null, {length: numDataPoints}).map(() => [randomNum(), randomNum()]);
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
				<h1>Home</h1>
				<ScatterPlot {...this.state} {...styles} />
				<div class={style.control}>
					<Button size="large" onClick={() => this.randomizeData()} type="primary">Randomize Data</Button>
				</div>
			</div>
		);
	}
}
