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
let category = ['亚洲', '欧洲', '非洲', '美洲', '大洋洲']
let pieData = [
	{label: 'xiaomi', value: 20.0},
	{label: 'sumsung', value: 55.0},
	{label: 'huawei', value: 25.0 }
]
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
		{ label: 'apple', value: 1000 + Math.floor(Math.random() * 1000) },
		{ label: 'huawei', value: 800 + Math.floor(Math.random() * 1000) },
		{ label: 'sansung', value: 1200 + Math.floor(Math.random() * 1000) },
		{ label: 'xiaomi', value: 700 + Math.floor(Math.random() * 1000) },
		{ label: 'oppo', value: 800 + Math.floor(Math.random() * 1000) },
		{ label: 'vivo', value: 500 + Math.floor(Math.random() * 1000) },
		{ label: 'others', value: 1300 + Math.floor(Math.random() * 1000) }
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
let areaData = [
    {
      "name" : "North America" ,
      "values" : [ [ 1025409600000 , 23.041422681023] , [ 1028088000000 , 19.854291255832] , [ 1030766400000 , 21.02286281168] , [ 1033358400000 , 22.093608385173] , [ 1036040400000 , 25.108079299458] , [ 1038632400000 , 26.982389242348] , [ 1041310800000 , 19.828984957662] , [ 1043989200000 , 19.914055036294] , [ 1046408400000 , 19.436150539916] , [ 1049086800000 , 21.558650338602] , [ 1051675200000 , 24.395594061773] , [ 1054353600000 , 24.747089309384] , [ 1056945600000 , 23.491755498807] , [ 1059624000000 , 23.376634878164] , [ 1062302400000 , 24.581223154533] , [ 1064894400000 , 24.922476843538] , [ 1067576400000 , 27.357712939042] , [ 1070168400000 , 26.503020572593] , [ 1072846800000 , 26.658901244878] , [ 1075525200000 , 27.065704156445] , [ 1078030800000 , 28.735320452588] , [ 1080709200000 , 31.572277846319] , [ 1083297600000 , 30.932161503638] , [ 1085976000000 , 31.627029785554] , [ 1088568000000 , 28.728743674232] , [ 1091246400000 , 26.858365172675] , [ 1093924800000 , 27.279922830032] , [ 1096516800000 , 34.408301211324] , [ 1099195200000 , 34.794362930439] , [ 1101790800000 , 35.609978198951] , [ 1104469200000 , 33.574394968037] , [ 1107147600000 , 31.979405070598] , [ 1109566800000 , 31.19009040297] , [ 1112245200000 , 31.083933968994] , [ 1114833600000 , 29.668971113185] , [ 1117512000000 , 31.490638014379] , [ 1120104000000 , 31.818617451128] , [ 1122782400000 , 32.960314008183] , [ 1125460800000 , 31.313383196209] , [ 1128052800000 , 33.125486081852] , [ 1130734800000 , 32.791805509149] , [ 1133326800000 , 33.506038030366] , [ 1136005200000 , 26.96501697216] , [ 1138683600000 , 27.38478809681] , [ 1141102800000 , 27.371377218209] , [ 1143781200000 , 26.309915460827] , [ 1146369600000 , 26.425199957518] , [ 1149048000000 , 26.823411519396] , [ 1151640000000 , 23.850443591587] , [ 1154318400000 , 23.158355444054] , [ 1156996800000 , 22.998689393695] , [ 1159588800000 , 27.9771285113] , [ 1162270800000 , 29.073672469719] , [ 1164862800000 , 28.587640408904] , [ 1167541200000 , 22.788453687637] , [ 1170219600000 , 22.429199073597] , [ 1172638800000 , 22.324103271052] , [ 1175313600000 , 17.558388444187] , [ 1177905600000 , 16.769518096208] , [ 1180584000000 , 16.214738201301] , [ 1183176000000 , 18.729632971229] , [ 1185854400000 , 18.814523318847] , [ 1188532800000 , 19.789986451358] , [ 1191124800000 , 17.070049054933] , [ 1193803200000 , 16.121349575716] , [ 1196398800000 , 15.141659430091] , [ 1199077200000 , 17.175388025297] , [ 1201755600000 , 17.286592443522] , [ 1204261200000 , 16.323141626568] , [ 1206936000000 , 19.231263773952] , [ 1209528000000 , 18.446256391095] , [ 1212206400000 , 17.822632399764] , [ 1214798400000 , 15.53936647598] , [ 1217476800000 , 15.255131790217] , [ 1220155200000 , 15.660963922592] , [ 1222747200000 , 13.254482273698] , [ 1225425600000 , 11.920796202299] , [ 1228021200000 , 12.122809090924] , [ 1230699600000 , 15.691026271393] , [ 1233378000000 , 14.720881635107] , [ 1235797200000 , 15.387939360044] , [ 1238472000000 , 13.765436672228] , [ 1241064000000 , 14.631445864799] , [ 1243742400000 , 14.292446536221] , [ 1246334400000 , 16.170071367017] , [ 1249012800000 , 15.948135554337] , [ 1251691200000 , 16.612872685134] , [ 1254283200000 , 18.778338719091] , [ 1256961600000 , 16.756026065421] , [ 1259557200000 , 19.385804443146] , [ 1262235600000 , 22.950590240168] , [ 1264914000000 , 23.61159018141] , [ 1267333200000 , 25.708586989581] , [ 1270008000000 , 26.883915999885] , [ 1272600000000 , 25.893486687065] , [ 1275278400000 , 24.678914263176] , [ 1277870400000 , 25.937275793024] , [ 1280548800000 , 29.461381693838] , [ 1283227200000 , 27.357322961861] , [ 1285819200000 , 29.057235285673] , [ 1288497600000 , 28.549434189386] , [ 1291093200000 , 28.506352379724] , [ 1293771600000 , 29.449241421598] , [ 1296450000000 , 25.796838168807] , [ 1298869200000 , 28.740145449188] , [ 1301544000000 , 22.091744141872] , [ 1304136000000 , 25.07966254541] , [ 1306814400000 , 23.674906973064] , [ 1309406400000 , 23.418002742929] , [ 1312084800000 , 23.24364413887] , [ 1314763200000 , 31.591854066817] , [ 1317355200000 , 31.497112374114] , [ 1320033600000 , 26.67238082043] , [ 1322629200000 , 27.297080015495] , [ 1325307600000 , 20.174315530051] , [ 1327986000000 , 19.631084213898] , [ 1330491600000 , 20.366462219461] , [ 1333166400000 , 19.284784434185] , [ 1335758400000 , 19.157810257624]]
    },

    {
      "name" : "Africa" ,
      "values" : [ [ 1025409600000 , 7.9356392949025] , [ 1028088000000 , 7.4514668527298] , [ 1030766400000 , 7.9085410566608] , [ 1033358400000 , 5.8996782364764] , [ 1036040400000 , 6.0591869346923] , [ 1038632400000 , 5.9667815800451] , [ 1041310800000 , 8.65528925664] , [ 1043989200000 , 8.7690763386254] , [ 1046408400000 , 8.6386160387453] , [ 1049086800000 , 5.9895557449743] , [ 1051675200000 , 6.3840324338159] , [ 1054353600000 , 6.5196511461441] , [ 1056945600000 , 7.0738618553114] , [ 1059624000000 , 6.5745957367133] , [ 1062302400000 , 6.4658359184444] , [ 1064894400000 , 2.7622758754954] , [ 1067576400000 , 2.9794782986241] , [ 1070168400000 , 2.8735432712019] , [ 1072846800000 , 1.6344817513645] , [ 1075525200000 , 1.5869248754883] , [ 1078030800000 , 1.7172279157246] , [ 1080709200000 , 1.9649927409867] , [ 1083297600000 , 2.0261695079196] , [ 1085976000000 , 2.0541261923929] , [ 1088568000000 , 3.9466318927569] , [ 1091246400000 , 3.7826770946089] , [ 1093924800000 , 3.9543021004028] , [ 1096516800000 , 3.8309891064711] , [ 1099195200000 , 3.6340958946166] , [ 1101790800000 , 3.5289755762525] , [ 1104469200000 , 5.702378559857] , [ 1107147600000 , 5.6539569019223] , [ 1109566800000 , 5.5449506370392] , [ 1112245200000 , 4.7579993280677] , [ 1114833600000 , 4.4816139372906] , [ 1117512000000 , 4.5965558568606] , [ 1120104000000 , 4.3747066116976] , [ 1122782400000 , 4.4588822917087] , [ 1125460800000 , 4.4460351848286] , [ 1128052800000 , 3.7989113035136] , [ 1130734800000 , 3.7743883140088] , [ 1133326800000 , 3.7727852823828] , [ 1136005200000 , 7.2968111448895] , [ 1138683600000 , 7.2800122043237] , [ 1141102800000 , 7.1187787503354] , [ 1143781200000 , 8.351887016482] , [ 1146369600000 , 8.4156698763993] , [ 1149048000000 , 8.1673298604231] , [ 1151640000000 , 5.5132447126042] , [ 1154318400000 , 6.1152537710599] , [ 1156996800000 , 6.076765091942] , [ 1159588800000 , 4.6304473798646] , [ 1162270800000 , 4.6301068469402] , [ 1164862800000 , 4.3466656309389] , [ 1167541200000 , 6.830104897003] , [ 1170219600000 , 7.241633040029] , [ 1172638800000 , 7.1432372054153] , [ 1175313600000 , 10.608942063374] , [ 1177905600000 , 10.914964549494] , [ 1180584000000 , 10.933223880565] , [ 1183176000000 , 8.3457524851265] , [ 1185854400000 , 8.1078413081882] , [ 1188532800000 , 8.2697185922474] , [ 1191124800000 , 8.4742436475968] , [ 1193803200000 , 8.4994601179319] , [ 1196398800000 , 8.7387319683243] , [ 1199077200000 , 6.8829183612895] , [ 1201755600000 , 6.984133637885] , [ 1204261200000 , 7.0860136043287] , [ 1206936000000 , 4.3961787956053] , [ 1209528000000 , 3.8699674365231] , [ 1212206400000 , 3.6928925238305] , [ 1214798400000 , 6.7571718894253] , [ 1217476800000 , 6.4367313362344] , [ 1220155200000 , 6.4048441521454] , [ 1222747200000 , 5.4643833239669] , [ 1225425600000 , 5.3150786833374] , [ 1228021200000 , 5.3011272612576] , [ 1230699600000 , 4.1203601430809] , [ 1233378000000 , 4.0881783200525] , [ 1235797200000 , 4.1928665957189] , [ 1238472000000 , 7.0249415663205] , [ 1241064000000 , 7.006530880769] , [ 1243742400000 , 6.994835633224] , [ 1246334400000 , 6.1220222336254] , [ 1249012800000 , 6.1177436137653] , [ 1251691200000 , 6.1413396231981] , [ 1254283200000 , 4.8046006145874] , [ 1256961600000 , 4.6647600660544] , [ 1259557200000 , 4.544865006255] , [ 1262235600000 , 6.0488249316539] , [ 1264914000000 , 6.3188669540206] , [ 1267333200000 , 6.5873958262306] , [ 1270008000000 , 6.2281189839578] , [ 1272600000000 , 5.8948915746059] , [ 1275278400000 , 5.5967320482214] , [ 1277870400000 , 0.99784432084837] , [ 1280548800000 , 1.0950794175359] , [ 1283227200000 , 0.94479734407491] , [ 1285819200000 , 1.222093988688] , [ 1288497600000 , 1.335093106856] , [ 1291093200000 , 1.3302565104985] , [ 1293771600000 , 1.340824670897] , [ 1296450000000 , 0] , [ 1298869200000 , 0] , [ 1301544000000 , 0] , [ 1304136000000 , 0] , [ 1306814400000 , 0] , [ 1309406400000 , 0] , [ 1312084800000 , 0] , [ 1314763200000 , 0] , [ 1317355200000 , 4.4583692315] , [ 1320033600000 , 3.6493043348059] , [ 1322629200000 , 3.8610064091761] , [ 1325307600000 , 5.5144800685202] , [ 1327986000000 , 5.1750695220791] , [ 1330491600000 , 5.6710066952691] , [ 1333166400000 , 5.5611890039181] , [ 1335758400000 , 5.5979368839939]]
    }
]

export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: randomData(),
			areData: getRandomPhoneData(),
			streamData: generateStreamData(),
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
			areData: getRandomPhoneData()
		})
	}
	componentWillMount() {

		// d3.json("./stackedAreaData.json", function(error, data) {
		// 	this.setState({areaData: data})
		//   }.bind(this))
	}
	render({ }, { data, areData, streamData }) {
		return (
			<div class={style.home}>
				<div class={style.control}>
					{/* <AreaChart
						data={areaData}
						width="100%"
						viewBoxObject={{
							x: 0,
							y: 0,
							height: 400,
							width: 500
						}}
						height={400}
						title="Area Chart"
						xAxisTickInterval={{ unit: 'year', interval: 2 }}
						xAxisLabel="Year"
						yAxisLabel="Share Price"
						xAccessor={(d) => {
							return new Date(d[0])
						}
						}
						yAccessor={(d) => {
							return d[1]
						}}
						domain={{ y: [, 60] }}
					/> */}
				</div>
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
						data={readmeData}
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
					{/* <PieChart
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
					/> */}
					<PieChart
						data={pieData}
						width={600}
						height={400}
						radius={150}
						innerRadius={20}
						title="Pie Chart"
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
