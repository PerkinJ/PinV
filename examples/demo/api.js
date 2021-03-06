let streamGraphData = [{
	name:'data',
	type:'array',
	default:'',
	detail:'数据，要求格式为二维数组，如[[9000, 870, 3000, 1000, 5200],[3400, 8000, 2300, 4922, 374]]',
	options:''
},{
	name:'interactive',
	type:'boolean',
	default:'true',
	detail:'是否显示交互',
	options:''
},{
	name:'width',
	type:'number',
	default:600,
	detail:'图形的宽度',
	options:''
},{
	name:'height',
	type:'number',
	default:600,
	detail:'图形的高度',
	options:''
},{
	name:'tooltip',
	type:'array',
	default:'',
	detail:`tooltip组件默认要显示的字段名，例如['id','group']`,
	options:''
},{
	name:'lables',
	type:'array',
	default:'[]',
	detail:`与data属性对于，表示每一行数据所对应的名称`,
	options:''
},{
	name:'colorRange',
	type:'array',
	default:'[]',
	detail:`array的长度应与流式图的层数一致，若设置该属性，则取消默认流式图的配色`,
	options:''
}]
let chordDiagramData = [{
	name:'data',
	type:'array',
	default:'',
	detail:'数据，要求格式为如下对象，如[[9000, 870, 3000, 1000, 5200],[3400, 8000, 2300, 4922, 374]]',
	options:''
},{
	name:'category',
	type:'array',
	default:'',
	detail:`用于展示数据的分类，顺序与data严格对齐，要求格式为如下对象，如['亚洲', '欧洲', '非洲', '美洲', '大洋洲']`,
	options:''
},{
	name:'interactive',
	type:'boolean',
	default:'true',
	detail:'是否显示交互',
	options:''
},{
	name:'width',
	type:'number',
	default:500,
	detail:'图形的宽度',
	options:''
},{
	name:'height',
	type:'number',
	default:500,
	detail:'图形的高度',
	options:''
},{
	name:'padding',
	type:'number',
	default:`40`,
	detail:'组件的内边距',
	options:''
},{
	name:'arcWidth',
	type:'number',
	default:`10`,
	detail:'弦图弧的宽度',
	options:''
},{
	name:'padAngle',
	type:'number',
	default:`0.02`,
	detail:'弦图每段弧的间隔',
	options:'[0-0.1]'
}]
let forceDirectedData = [{
	name:'data',
	type:'array',
	default:'',
	detail:'数据，要求格式为如下对象，如{"nodes": [{"id": "Myriel", "group": 1},{"id": "Napoleon", "group": 1},{"id": "Mlle.Baptistine", "group": 1}],"links": [{"source":"Napoleon", "target": "Myriel", "value": 1},{"source": "Mlle.Baptistine", "target":"Myriel", "value": 8},]}',
	options:''
},{
	name:'width',
	type:'number',
	default:1000,
	detail:'图形的宽度',
	options:''
},{
	name:'height',
	type:'number',
	default:500,
	detail:'图形的高度',
	options:''
},{
	name:'interactive',
	type:'boolean',
	default:'true',
	detail:'是否显示交互',
	options:''
},{
	name:'tooltip',
	type:'array',
	default:'',
	detail:`tooltip组件默认要显示的字段名，例如['id','group']`,
	options:''
},{
	name:'velocityDecay',
	type:'number',
	default:'0.5',
	detail:`摩擦力的参数，即速度的衰减系数，范围在[0-1]之间，越小表示阻力也低`,
	options:`[0-1]`
},{
	name:'strenght',
	type:'number',
	default:'-50',
	detail:`节点间力的作用，负数表示排斥力，正数表示吸引力`,
	options:``
},{
	name:'collide',
	type:'number',
	default:'12.5',
	detail:`碰撞作用力可以为节点指定一个radius区域来防止节点重叠`,
	options:``
},{
	name:'distance',
	type:'number',
	default:'40',
	detail:`link作用力可以根据期望的link distance(连接距离)将节点连接在一起。作用力的强度与节点之间的距离成正比，类似于弹簧作用力。`,
	options:``
}]

let sunburstData = [{
	name:'data',
	type:'array',
	default:'',
	detail:'数据，要求格式为对象数组，例如{"name": "A1","children": [{"name": "B1","children":[{"name": "C1","value": 100}]这类树形对象',
	options:''
},{
	name:'width',
	type:'number',
	default:500,
	detail:'图形的宽度',
	options:''
},{
	name:'height',
	type:'number',
	default:300,
	detail:'图形的高度',
	options:''
},{
	name:'interactive',
	type:'boolean',
	default:'true',
	detail:'是否显示交互',
	options:''
},{
	name:'padding',
	type:'object',
	default:`{ top: 0, bottom: 0, left: 10, right: 10 }`,
	detail:'例如：{ top: 32, bottom: 32, left: 20, right: 20 }',
	options:''
},{
	name:'nameKey',
	type:'string',
	default:'',
	detail:'除children外，每一个选项的名字，例如上述数据的name',
	options:''
},{
	name:'dataKey',
	type:'string',
	default:'',
	detail:'除children外，每一个选项对应的值，例如上述数据的value',
	options:''
},{
	name:'angle',
	type:'number',
	default:1,
	detail:'表示Sunburst组件的弧度范围，默认是1，表示为360度',
	options:'[0-1]'
},{
	name:'radius',
	type:'number',
	default:140,
	detail:'表示Sunburst的半径',
	options:''
}]

let partitionData = [{
	name:'data',
	type:'array',
	default:'',
	detail:'数据，要求格式为对象数组，例如{"name": "A1","children": [{"name": "B1","children":[{"name": "C1","value": 100}]这类树形对象',
	options:''
},{
	name:'width',
	type:'number',
	default:500,
	detail:'图形的宽度',
	options:''
},{
	name:'height',
	type:'number',
	default:300,
	detail:'图形的高度',
	options:''
},{
	name:'interactive',
	type:'boolean',
	default:'true',
	detail:'是否显示交互',
	options:''
},{
	name:'padding',
	type:'object',
	default:`{ top: 0, bottom: 0, left: 10, right: 10 }`,
	detail:'例如：{ top: 32, bottom: 32, left: 20, right: 20 }',
	options:''
},{
	name:'nameKey',
	type:'string',
	default:'',
	detail:'除children外，每一个选项的名字，例如上述数据的name',
	options:''
},{
	name:'dataKey',
	type:'string',
	default:'',
	detail:'除children外，每一个选项对应的值，例如上述数据的value',
	options:''
},{
	name:'partitionPadding',
	type:'number',
	default:10,
	detail:'圆填充中每个圆之间的间隔',
	options:''
},{
	name:'hoverColor',
	type:'string',
	default:'',
	detail:'悬浮图形的颜色值',
	options:''
},{
	name:'backgroundColor',
	type:'string',
	default:'',
	detail:'图形默认的背景色',
	options:''
}]
let packData = [{
	name:'data',
	type:'array',
	default:'',
	detail:'数据，要求格式为对象数组，例如{"name": "A1","children": [{"name": "B1","children":[{"name": "C1","value": 100}]这类树形对象',
	options:''
},{
	name:'width',
	type:'number',
	default:500,
	detail:'图形的宽度',
	options:''
},{
	name:'height',
	type:'number',
	default:300,
	detail:'图形的高度',
	options:''
},{
	name:'interactive',
	type:'boolean',
	default:'true',
	detail:'是否显示交互',
	options:''
},{
	name:'padding',
	type:'object',
	default:`{ top: 0, bottom: 0, left: 10, right: 10 }`,
	detail:'例如：{ top: 32, bottom: 32, left: 20, right: 20 }',
	options:''
},{
	name:'nameKey',
	type:'string',
	default:'',
	detail:'除children外，每一个选项的名字，例如上述数据的name',
	options:''
},{
	name:'dataKey',
	type:'string',
	default:'',
	detail:'除children外，每一个选项对应的值，例如上述数据的value',
	options:''
},{
	name:'packPadding',
	type:'number',
	default:10,
	detail:'圆填充中每个圆之间的间隔',
	options:''
},{
	name:'hoverColor',
	type:'string',
	default:'',
	detail:'悬浮图形的颜色值',
	options:''
},{
	name:'backgroundColor',
	type:'string',
	default:'',
	detail:'图形默认的背景色',
	options:''
}]

let treeMapData = [{
	name:'data',
	type:'array',
	default:'',
	detail:'数据，要求格式为对象数组，例如{"name": "A1","children": [{"name": "B1","children":[{"name": "C1","value": 100}]这类树形对象',
	options:''
},{
	name:'width',
	type:'number',
	default:500,
	detail:'图形的宽度',
	options:''
},{
	name:'height',
	type:'number',
	default:300,
	detail:'图形的高度',
	options:''
},{
	name:'value',
	type:'string',
	default:'value',
	detail:'数据集中表示图形权重的属性'
}]

let treeMapLayoutData = [{
	name:'data',
	type:'array',
	default:'',
	detail:'数据，要求格式为对象数组，例如{"name": "A1","children": [{"name": "B1","children":[{"name": "C1","value": 100}]这类树形对象',
	options:''
},{
	name:'width',
	type:'number',
	default:500,
	detail:'图形的宽度',
	options:''
},{
	name:'height',
	type:'number',
	default:300,
	detail:'图形的高度',
	options:''
},{
	name:'interactive',
	type:'boolean',
	default:'true',
	detail:'是否显示交互',
	options:''
},{
	name:'padding',
	type:'object',
	default:`{ top: 0, bottom: 0, left: 10, right: 10 }`,
	detail:'例如：{ top: 32, bottom: 32, left: 20, right: 20 }',
	options:''
},{
	name:'nameKey',
	type:'string',
	default:'',
	detail:'除children外，每一个选项的名字，例如上述数据的name',
	options:''
},{
	name:'dataKey',
	type:'string',
	default:'',
	detail:'除children外，每一个选项对应的值，例如上述数据的value',
	options:''
},{
	name:'tile',
	type:'string',
	default:'treemapSquarify',
	detail:'d3提供的几种内置的tilting methods',
	options:`[treemapBinary,treemapDice,treemapSlice,treemapSquarify,treemapResquarify]`
},{
	name:'ratio',
	type:'number',
	default:'',
	detail:'该属性只有当tile为treemapSquarify时，才使用。ratio>=1，表示生成矩形的长宽比。注意，指定比率仅仅是平铺算法的提示，不保证一定按照指定的宽高比生成矩形。如果不指定，默认为黄金比率,	φ = (1 + sqrt(5)) / 2',
	options:``
},{
	name:'rectPadding',
	type:'number',
	default:'0',
	detail:'将内部和外部填充设置为指定的数字，并返回此树形图布局。如果未指定填充，则返回当前的内部填充函数',
	options:''
},{
	name:'paddingInner',
	type:'number',
	default:'0',
	detail:'如果指定了填充，则将内部填充设置为指定的数字或函数，并返回此树形图布局。如果未指定填充，则返回当前内部填充函数，该函数默认为常量零。如果padding是一个函数，那么对于有子节点的每个节点，都会调用它来传递当前节点。内部填充用于分隔节点的相邻子节点。',
	options:''
},{
	name:'paddingOuter',
	type:'number',
	default:'0',
	detail:'如果指定了填充，则将顶部，右侧，底部和左侧填充设置为指定的数字或函数，并返回此树形图布局。如果未指定填充，则返回当前顶部填充函数。',
	options:''
},{
	name:'paddingLeft',
	type:'number',
	default:'0',
	detail:'如果指定了填充，则将顶部填充设置为指定的数字或函数，并返回此树形图布局。如果未指定填充，则返回当前顶部填充函数，该函数默认为常量零。如果padding是一个函数，那么对于有子节点的每个节点，都会调用它来传递当前节点。顶部填充用于将节点的顶部边缘与子节点分开。',
	options:''
},{
	name:'paddingRight',
	type:'number',
	default:'0',
	detail:'如果指定了填充，则将顶部填充设置为指定的数字或函数，并返回此树形图布局。如果未指定填充，则返回当前顶部填充函数，该函数默认为常量零。如果padding是一个函数，那么对于有子节点的每个节点，都会调用它来传递当前节点。顶部填充用于将节点的顶部边缘与子节点分开。',
	options:''
},{
	name:'paddingTop',
	type:'number',
	default:'0',
	detail:'如果指定了填充，则将顶部填充设置为指定的数字或函数，并返回此树形图布局。如果未指定填充，则返回当前顶部填充函数，该函数默认为常量零。如果padding是一个函数，那么对于有子节点的每个节点，都会调用它来传递当前节点。顶部填充用于将节点的顶部边缘与子节点分开。',
	options:''
},{
	name:'paddingBottom',
	type:'number',
	default:'0',
	detail:'如果指定了填充，则将顶部填充设置为指定的数字或函数，并返回此树形图布局。如果未指定填充，则返回当前顶部填充函数，该函数默认为常量零。如果padding是一个函数，那么对于有子节点的每个节点，都会调用它来传递当前节点。顶部填充用于将节点的顶部边缘与子节点分开。',
	options:''
},{
	name:'hoverColor',
	type:'string',
	default:'',
	detail:'悬浮图形的颜色值',
	options:''
},{
	name:'backgroundColor',
	type:'string',
	default:'',
	detail:'图形默认的背景色',
	options:''
}]

let clusterData = [{
	name:'data',
	type:'array',
	default:'',
	detail:'数据，要求格式为对象数组，例如{"name": "A1","children": [{"name": "B1","children":[{"name": "C1","value": 100}]这类树形对象',
	options:''
},{
	name:'width',
	type:'number',
	default:500,
	detail:'图形的宽度',
	options:''
},{
	name:'height',
	type:'number',
	default:300,
	detail:'图形的高度',
	options:''
},{
	name:'interactive',
	type:'boolean',
	default:'true',
	detail:'是否显示交互',
	options:''
},{
	name:'padding',
	type:'object',
	default:`{ top: 0, bottom: 0, left: 10, right: 10 }`,
	detail:'例如：{ top: 32, bottom: 32, left: 20, right: 20 }',
	options:''
},{
	name:'nameKey',
	type:'string',
	default:'',
	detail:'除children外，每一个选项的名字，例如上述数据的name',
	options:''
},{
	name:'dataKey',
	type:'string',
	default:'',
	detail:'除children外，每一个选项对应的值，例如上述数据的value',
	options:''
},{
	name:'hoverColor',
	type:'string',
	default:'',
	detail:'悬浮图形的颜色值',
	options:''
},{
	name:'backgroundColor',
	type:'string',
	default:'',
	detail:'图形默认的背景色',
	options:''
}]
let treeData = [{
	name:'data',
	type:'array',
	default:'',
	detail:'数据，要求格式为对象数组，例如{"name": "A1","children": [{"name": "B1","children":[{"name": "C1","value": 100}]这类树形对象',
	options:''
},{
	name:'width',
	type:'number',
	default:500,
	detail:'图形的宽度',
	options:''
},{
	name:'height',
	type:'number',
	default:300,
	detail:'图形的高度',
	options:''
},{
	name:'interactive',
	type:'boolean',
	default:'true',
	detail:'是否显示交互',
	options:''
},{
	name:'padding',
	type:'object',
	default:`{ top: 0, bottom: 0, left: 10, right: 10 }`,
	detail:'例如：{ top: 32, bottom: 32, left: 20, right: 20 }',
	options:''
},{
	name:'nameKey',
	type:'string',
	default:'',
	detail:'除children外，每一个选项的名字，例如上述数据的name',
	options:''
},{
	name:'dataKey',
	type:'string',
	default:'',
	detail:'除children外，每一个选项对应的值，例如上述数据的value',
	options:''
},{
	name:'hoverColor',
	type:'string',
	default:'',
	detail:'悬浮图形的颜色值',
	options:''
},{
	name:'backgroundColor',
	type:'string',
	default:'',
	detail:'图形默认的背景色',
	options:''
}]

let histogramData = [{
	name:'data',
	type:'array',
	default:'',
	detail:'源数据，要求格式为对象数组，例如[{age:24,weight:140},{age:24,weight:140}]',
	options:''
},{
	name:'XAxis',
	type:'string',
	default:'',
	detail:'x轴的key值',
	options:''
},{
	name:'YAxis',
	type:'string',
	default:'',
	detail:'y轴的key值',
	options:''
},{
	name:'width',
	type:'number',
	default:600,
	detail:'图形的宽度',
	options:''
},{
	name:'height',
	type:'number',
	default:300,
	detail:'图形的高度',
	options:''
},{
	name:'interactive',
	type:'boolean',
	default:'true',
	detail:'是否显示交互',
	options:''
},{
	name:'padding',
	type:'object',
	default:`{ top: 32, bottom: 32, left: 20, right: 20 }`,
	detail:'例如：{ top: 32, bottom: 32, left: 20, right: 20 }',
	options:''
},{
	name:'tickSize',
	type:'number',
	default:5,
	detail:'y轴的tickSize',
	options:''
},{
	name:'tickFormat',
	type:'string',
	default:'',
	detail:`y轴value的format，例如'.0s'`,
	options:''
},{
	name:'hidden',
	type:'boolean',
	default:'false',
	detail:'是否隐藏x,y坐标轴',
	options:''
},{
	name:'stroke',
	type:'string',
	default:'#673ab7',
	detail:'轴线的颜色',
	options:''
}]

let scatterPlotData = [{
	name:'data',
	type:'array',
	default:'',
	detail:'源数据，要求格式为对象数组，例如[{age:24,weight:140},{age:24,weight:140}]',
	options:''
},{
	name:'XAxis',
	type:'string',
	default:'',
	detail:'x轴的key值',
	options:''
},{
	name:'YAxis',
	type:'string',
	default:'',
	detail:'y轴的key值',
	options:''
},{
	name:'width',
	type:'number',
	default:600,
	detail:'图形的宽度',
	options:''
},{
	name:'height',
	type:'number',
	default:300,
	detail:'图形的高度',
	options:''
},{
	name:'interactive',
	type:'boolean',
	default:'true',
	detail:'是否显示交互',
	options:''
},{
	name:'padding',
	type:'object',
	default:`{ top: 32, bottom: 32, left: 20, right: 20 }`,
	detail:'例如：{ top: 32, bottom: 32, left: 20, right: 20 }',
	options:''
},{
	name:'tickSize',
	type:'number',
	default:5,
	detail:'y轴的tickSize',
	options:''
},{
	name:'tickFormat',
	type:'string',
	default:'',
	detail:`y轴value的format，例如'.0s'`,
	options:''
},{
	name:'hidden',
	type:'boolean',
	default:'false',
	detail:'是否隐藏x,y坐标轴',
	options:''
},{
	name:'stroke',
	type:'string',
	default:'#673ab7',
	detail:'轴线的颜色',
	options:''
},{
	name:'r',
	type:'number',
	default:4,
	detail:'散点的半径',
	options:''
},{
	name:'circleStroke',
	type:'string',
	default:'',
	detail:'circle圆环的颜色',
	options:''
}]

let pieChartData = [{
	name:'data',
	type:'array',
	default:'',
	detail:'源数据，要求格式为对象数组，例如[{age:24,weight:140},{age:24,weight:140}]',
	options:''
},{
	name:'nameKey',
	type:'string',
	default:'',
	detail:'每一个选项的名字，例如上述数据的name',
	options:''
},{
	name:'dataKey',
	type:'string',
	default:'',
	detail:'每一个选项对应的值，例如上述数据的scales',
	options:''
},{
	name:'width',
	type:'number',
	default:500,
	detail:'图形的宽度',
	options:''
},{
	name:'height',
	type:'number',
	default:500,
	detail:'图形的高度',
	options:''
},{
	name:'interactive',
	type:'boolean',
	default:'true',
	detail:'是否显示交互',
	options:''
},{
	name:'padding',
	type:'object',
	default:`{ top: 32, bottom: 32, left: 20, right: 20 }`,
	detail:'例如：{ top: 32, bottom: 32, left: 20, right: 20 }',
	options:''
},{
	name:'innerRadius',
	type:'number',
	default:'0',
	detail:'饼状图的内半径',
	options:''
},{
	name:'outerRadius',
	type:'number',
	default:'width / 3',
	detail:`饼状图的外半径'`,
	options:''
},{
	name:'textColor',
	type:'string',
	default:'#000',
	detail:'text属性的颜色',
	options:''
},{
	name:'cx',
	type:'number',
	default:'width /2',
	detail:'饼状图的圆心x坐标',
	options:''
},{
	name:'cy',
	type:'number',
	default:'height/2',
	detail:'饼状图的圆心y坐标',
	options:''
},{
	name:'cornerRadius',
	type:'number',
	default:'0',
	detail:'每个弧两边角的弧度',
	options:''
},{
	name:'padAngle',
	type:'number',
	default:'0',
	detail:'每个弧的间隔',
	options:''
},{
	name:'startAngle',
	type:'number',
	default:'0',
	detail:'饼状图的起始范围（值只能取0-1）',
	options:'[0-1]'
},{
	name:'endAngle',
	type:'number',
	default:'1',
	detail:'endAngle',
	options:'[0-1]'
},{
	name:'interactive',
	type:'boolean',
	default:'true',
	detail:'是否显示交互',
	options:''
}]
let lineChartData = [{
	name:'data',
	type:'array',
	default:'',
	detail:'源数据，要求格式为对象数组，例如[{name: "series1",values: [ { x: 0, y:20 }, ..., { x: 24, y: 10 } ]},....{name: "series2",values: [ { x: 70, y: 82 },..., { x: 76, y: 82 } ]}]',
	options:''
},{
	name:'xAxisLabel',
	type:'string',
	default:'',
	detail:'X轴显示的title',
	options:''
},{
	name:'yAxisLabel',
	type:'string',
	default:'',
	detail:'Y轴显示的title',
	options:''
},{
	name:'width',
	type:'number',
	default:600,
	detail:'图形的宽度',
	options:''
},{
	name:'height',
	type:'number',
	default:300,
	detail:'图形的高度',
	options:''
},{
	name:'showTooltip',
	type:'boolean',
	default:'true',
	detail:'是否显示toltip组件',
	options:''
},{
	name:'legend',
	type:'boolean',
	default:'true',
	detail:'legend提示',
	options:''
},{
	name:'legendPosition',
	type:'string',
	default:'right',
	detail:'Legend组件的位置',
	options:'[right,left]'
},{
	name:'sideOffset',
	type:'number',
	default:'100',
	detail:`legend提示的宽度`,
	options:''
},{
	name:'title',
	type:'string',
	default:'',
	detail:'折线图的标题',
	options:''
},{
	name:'domain',
	type:'object',
	default:'{}',
	detail:'坐标轴的区间值，例如{ x: [, 6], y: [-10,] }，表示x轴，最多不超过6，y轴不小于-10',
	options:''
},{
	name:'gridHorizontal',
	type:'boolean',
	default:'false',
	detail:'水平间隔虚线',
	options:''
},{
	name:'viewBoxObject',
	type:'object',
	default:'{}',
	detail:'表示固定区间内，图形的起始点，已经可视化的长宽比',
	options:''
},{
	name:'circleRadius',
	type:'number',
	default:`3`,
	detail:'表示折线图焦点的半径',
	options:''
},{
	name:'axesColor',
	type:'string',
	default:`#000`,
	detail:'表示轴线的颜色',
	options:''
},{
	name:'xOrient',
	type:'string',
	default:'bottom',
	detail:`x轴坐标ticks的所朝的方向，有'top'跟'bottom'选项`,
	options:`[top,bottom]`
},{
	name:'yOrient',
	type:'string',
	default:'bottom',
	detail:`y轴坐标在图形的左边还是右边，有'left'跟'right'选项`,
	options:`[left,right]`
},{
	name:'xAxisOffset',
	type:'number',
	default:'0',
	detail:`坐标轴说明与坐标轴的间隔`,
	options:``
},{
	name:'yAxisOffset',
	type:'number',
	default:'0',
	detail:`坐标轴说明与坐标轴的间隔`,
	options:``
},{
	name:'showTooltip',
	type:'boolean',
	default:'true',
	detail:`是否显示toltip组件`,
	options:``
}]

export {
	sunburstData,partitionData,packData,treeMapLayoutData,treeMapData,clusterData,treeData,
	histogramData,scatterPlotData,lineChartData,pieChartData,forceDirectedData,
	chordDiagramData,streamGraphData
}
