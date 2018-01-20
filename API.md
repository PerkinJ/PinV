# PinV API文档

## 可视化组件

### ForceDirectedGraph（力导向布局）
| Name | Type | Default | Description | 
 | :---: | :---: | :---: | :---: | 
 | data | array | | 数据，要求格式为如下对象，如{"nodes": [{"id": "Myriel", "group": 1},{"id": "Napoleon", "group": 1},{"id": "Mlle.Baptistine", "group": 1}],"links": [{"source":"Napoleon", "target": "Myriel", "value": 1},{"source": "Mlle.Baptistine", "target":"Myriel", "value": 8},]} | 
 | width | number | 1000 | 图形的宽度 | 
 | height | number | 600 | 图形的高度 | 
 | interactive | boolean | true | 是否显示交互 | 
 | tooltip | array | | tooltip组件默认要显示的字段名，例如['id','group']
 | velocityDecay | number | 0.5 | 摩擦力的参数，即速度的衰减系数，范围在[0-1]之间，越小表示阻力也低 |
 | strenght | number | -50 | 节点间力的作用，负数表示排斥力，正数表示吸引力 |
 | collide | number | 12.5 | 碰撞作用力可以为节点指定一个radius区域来防止节点重叠 | 
 | distance | number | 40 | link作用力可以根据期望的link distance(连接距离)将节点连接在一起。作用力的强度与节点之间的距离成正比，类似于弹簧作用力。 |
### SunburstLayout (旭日图组件)
| Name | Type | Default | Description | 
 | :---: | :---: | :---: | :---: | 
 | data | array | | 数据，要求格式为对象数组，例如{"name": "A1","children": [{"name": "B1","children":[{"name": "C1","value": 100}]这类树形对象| 
 | width | number | 500 | 图形的宽度 | 
 | height | number | 300 | 图形的高度 | 
 | interactive | boolean | true | 是否显示交互 | 
 | padding | object | { top: 0, bottom: 0, left: 10, right: 10 } | 例如：{ top: 32, bottom: 32, left: 20, right: 20 } |
 | nameKey | string | | 除children外，每一个选项的名字，例如上述数据的name | 
 | dataKey | string | | 除children外，每一个选项对应的值，例如上述数据的value | 
 | angle | number | 1 | [0-1]，表示Sunburst组件的弧度范围，默认是1，表示为360度 | 
 | radius | number | 140 | 表示Sunburst的半径 | 
 | hoverColor | string | | 悬浮图形的颜色值 | 
 | backgroundColor | string | | 图形默认的背景色 | 

### PartitionLayout （分区布局）
 | Name | Type | Default | Description | 
 | :---: | :---: | :---: | :---: | 
 | data | array | | 数据，要求格式为对象数组，例如{"name": "A1","children": [{"name": "B1","children":[{"name": "C1","value": 100}]这类树形对象| 
 | width | number | 500 | 图形的宽度 | 
 | height | number | 300 | 图形的高度 | 
 | interactive | boolean | true | 是否显示交互
 | padding | object | { top: 0, bottom: 0, left: 10, right: 10 } | 例如：{ top: 32, bottom: 32, left: 20, right: 20 } |
 | nameKey | string | | 除children外，每一个选项的名字，例如上述数据的name | 
 | dataKey | string | | 除children外，每一个选项对应的值，例如上述数据的value | 
 | partitionPadding | number | 10 | 圆填充中每个圆之间的间隔 |
 | hoverColor | string | | 悬浮图形的颜色值 | 
 | backgroundColor | string | | 图形默认的背景色 | 

### PackLayout（圆填充）
 | Name | Type | Default | Description | 
 | :---: | :---: | :---: | :---: | 
 | data | array | | 数据，要求格式为对象数组，例如{"name": "A1","children": [{"name": "B1","children":[{"name": "C1","value": 100}]这类树形对象| 
 | width | number | 500 | 图形的宽度 | 
 | height | number | 300 | 图形的高度 | 
 | interactive | boolean | true | 是否显示交互
 | padding | object | { top: 0, bottom: 0, left: 10, right: 10 } | 例如：{ top: 32, bottom: 32, left: 20, right: 20 } |
 | nameKey | string | | 除children外，每一个选项的名字，例如上述数据的name | 
 | dataKey | string | | 除children外，每一个选项对应的值，例如上述数据的value | 
 | packPadding | number | 10 | 圆填充中每个圆之间的间隔 |
 | hoverColor | string | | 悬浮图形的颜色值 | 
 | backgroundColor | string | | 图形默认的背景色 | 
### TreeMapLayout（簇形图）
 | Name | Type | Default | Description | 
 | :---: | :---: | :---: | :---: | 
 | data | array | | 数据，要求格式为对象数组，例如{"name": "A1","children": [{"name": "B1","children":[{"name": "C1","value": 100}]这类树形对象 | 
 | width | number | 500 | 图形的宽度 | 
 | height | number | 300 | 图形的高度 | 
 | interactive | boolean | true | 是否显示交互
 | padding | object | { top: 0, bottom: 0, left: 10, right: 10 } | 例如：{ top: 32, bottom: 32, left: 20, right: 20 } |
 | nameKey | string | | 除children外，每一个选项的名字，例如上述数据的name | 
 | dataKey | string | | 除children外，每一个选项对应的值，例如上述数据的value | 
 | tile | string | 'treemapSquarify' | [d3](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemap)提供的几种内置的tilting methods，包括treemapBinary,treemapDice,treemapSlice,treemapSquarify,treemapResquarify
 | ratio | number | | 该属性只有当tile为treemapSquarify时，才使用。ratio>=1，表示生成矩形的长宽比。注意，指定比率仅仅是平铺算法的提示，不保证一定按照指定的宽高比生成矩形。如果不指定，默认为黄金比率,	φ = (1 + sqrt(5)) / 2
 | rectPadding | number | 0 | 将内部和外部填充设置为指定的数字，并返回此树形图布局。如果未指定填充，则返回当前的内部填充函数
 |paddingInner | number | 0 | 如果指定了填充，则将内部填充设置为指定的数字或函数，并返回此树形图布局。如果未指定填充，则返回当前内部填充函数，该函数默认为常量零。如果padding是一个函数，那么对于有子节点的每个节点，都会调用它来传递当前节点。内部填充用于分隔节点的相邻子节点。
 | paddingOuter | number | 0 | 如果指定了填充，则将顶部，右侧，底部和左侧填充设置为指定的数字或函数，并返回此树形图布局。如果未指定填充，则返回当前顶部填充函数。|
 | paddingLeft | number | 0 | 如果指定了填充，则将顶部填充设置为指定的数字或函数，并返回此树形图布局。如果未指定填充，则返回当前顶部填充函数，该函数默认为常量零。如果padding是一个函数，那么对于有子节点的每个节点，都会调用它来传递当前节点。顶部填充用于将节点的顶部边缘与子节点分开。 |
 | paddingRight | number | 0 | 同上 | 
 | paddingTop | number | 0 | 同上 | 
 | paddingBottom | number | 0 | 同上 | 
 | hoverColor | string | | 悬浮图形的颜色值 | 
 | backgroundColor | string | | 图形默认的背景色 | 

### ClusterLayout（簇形图）
 | Name | Type | Default | Description | 
 | :---: | :---: | :---: | :---: | 
 | data | array | | 数据，要求格式为对象数组，例如{"name": "A1","children": [{"name": "B1","children":[{"name": "C1","value": 100}]这类树形对象| 
 | width | number | 500 | 图形的宽度 | 
 | height | number | 300 | 图形的高度 | 
 | interactive | boolean | true | 是否显示交互
 | padding | object | { top: 0, bottom: 0, left: 10, right: 10 } | 例如：{ top: 32, bottom: 32, left: 20, right: 20 } |
 | nameKey | string | | 除children外，每一个选项的名字，例如上述数据的name | 
 | dataKey | string | | 除children外，每一个选项对应的值，例如上述数据的value | 
 | hoverColor | string | | 悬浮图形的颜色值 | 
 | backgroundColor | string | | 图形默认的背景色 | 
### TreeLayout（树形图）
 | Name | Type | Default | Description | 
 | :---: | :---: | :---: | :---: | 
 | data | array | | 数据，要求格式为对象数组，例如{"name": "A1","children": [{"name": "B1","children":[{"name": "C1","value": 100}]这类树形对象| 
 | width | number | 500 | 图形的宽度 | 
 | height | number | 300 | 图形的高度 | 
 | interactive | boolean | true | 是否显示交互
 | padding | object | { top: 0, bottom: 0, left: 10, right: 10 } | 例如：{ top: 32, bottom: 32, left: 20, right: 20 } |
 | nameKey | string | | 除children外，每一个选项的名字，例如上述数据的name | 
 | dataKey | string | | 除children外，每一个选项对应的值，例如上述数据的value | 
 | hoverColor | string | | 悬浮图形的颜色值 | 
 | backgroundColor | string | | 图形默认的背景色 | 
### PieChart（饼状图）
#### Properties
 | Name | Type | Default | Description | 
 | :---: | :---: | :---: | :---: | 
 | data | array | | 源数据，要求格式为对象数组，例如[{ name: 'apple', sales: 2000 },{ name: 'huawei', sales: 1800 }] | 
 | nameKey | string | | 每一个选项的名字，例如上述数据的name | 
 | dataKey | string | | 每一个选项对应的值，例如上述数据的scales | 
 | width | number | 500 | 图形的宽度 | 
 | height | number | 500 | 图形的高度 | 
 | innerRadius | number | 0 | 饼状图的内半径 | 
 | outerRadius | number | width / 3 | 饼状图的外半径 | 
 | textColor | string | '#000' | text属性的颜色 | 
 | cx | number | width /2 | 饼状图的圆心x坐标 | 
 | cy | number | height/2 | 饼状图的圆心y坐标 | 
 | cornerRadius | number | 0 | 每个弧两边角的弧度 | 
 | padAngle | number | 0 | 每个弧的间隔 | 
 | startAngle | number | 0 | 饼状图的起始范围（值只能取0-1） | 
 | endAngle | number | 1 | 饼状图的终止范围（值只能取0-1） | 
 | interactive | boolean | true | 是否显示交互

### LineChart（折线图）
#### Properties
 | Name | Type | Default | Description | 
 | :---: | :---: | :---: | :---: |  
 | data | array | | 源数据，要求格式为对象数组，例如[{age:24,weight:140},{age:24,weight:140}] | 
 | width | number | 600 | 图形的宽度 | 
 | height | number | 300 | 图形的高度 | 
 | padding | object | { top: 32, bottom: 32, left: 20, right: 20 } | 例如：{ top: 32, bottom: 32, left: 20, right: 20 } | 
 | padding | object | { top: 32, bottom: 32, left: 20, right: 20 } | 例如：{ top: 32, bottom: 32, left: 20, right: 20 } | 
 | tickSize | number | 5 | y轴的tickSize
tickFormat | string | '' | y轴value的format，例如'.0s' | 
 | hidden | boolean | false | 是否隐藏x,y坐标轴 | 
 | stroke | string | '#673ab7' | 轴线的颜色 | 
 | r | number | 3 | 散点的半径 | 
 | shape | string | 'curveCardinal' | 曲线的插值模式。具体取值请参考[d3-shape](https://github.com/d3/d3-shape/blob/master/README.md#curves) | 
| interactive | boolean | true | 是否显示交互
| circleProps | object | {r:5,fill:'#666'} | 显示交互后，点击circle触发的样式 |
| tipLineProps | object | {stroke:'#666',strokeWidth:1} | 显示交互后，点击circle触发的虚线的样式 | 
 | circleStroke | string | '' | circle圆环的颜色 | 

### ScatterPlot（散点图）
#### Properties
 | Name | Type | Default | Description | 
 | :---: | :---: | :---: | :---: |  
 | data | array | | 源数据，要求格式为对象数组，例如[{age:24,weight:140},{age:24,weight:140}] | 
 | XAxis | string | | x轴的key值 | 
 | YAxis | string | | y轴的key值 | 
 | width | number | 600 | 图形的宽度 | 
 | height | number | 300 | 图形的高度 | 
 | padding | object | { top: 32, bottom: 32, left: 20, right: 20 } | 例如：{ top: 32, bottom: 32, left: 20, right: 20 } | 
 | tickSize | number | 5 | y轴的tickSize | 
 | tickFormat | string | '' | y轴value的format，例如'.0s' | 
 | hidden | boolean | false | 是否隐藏x,y坐标轴 | 
 | stroke | string | '#673ab7' | 轴线的颜色
 | r | number | 4 | 散点的半径 |
 | circleStroke | string | '' | circle圆环的颜色 |
 | interactive | boolean | true | 是否显示交互


### Histogram（直方图）
#### Properties
 | Name | Type | Default | Description | 
 | :---: | :---: | :---: | :---: | 
 | data | array | | 源数据，要求格式为对象数组，例如[{age:24,weight:140},{age:24,weight:140}] | 
 | XAxis | string | | x轴的key值 | 
 | YAxis | string | | y轴的key值 | 
 | width | number | 600 | 图形的宽度 | 
 | height | number | 300 | 图形的高度 | 
 | padding | object | { top: 32, bottom: 32, left: 20, right: 20 } | 例如：{ top: 32, bottom: 32, left: 20, right: 20 } | 
 | tickSize | number | 5 | y轴的tickSize
tickFormat | string | '' | y轴value的format，例如'.0s' | 
 | hidden | boolean | false | 是否隐藏x,y坐标轴 | 
 | stroke | string | '#673ab7' | 轴线的颜色 | 
| interactive | boolean | true | 是否显示交互

## 可视化基础组件
### Axix
#### Description
坐标轴是普遍使用的度量工具，对于柱状图、折线图、散点图之类的图表来说更是基本组成单元。
#### Properties
 | Name | Type | Default | Description | 
 | :---: | :---: | :---: | :---: | 
 | type | string | 'x' | 只有x跟y两个选择，表示x轴或者y轴 | 
 | data | array | | 源数据，要求格式为对象数组，例如[{age:24,weight:140},{age:24,weight:140}] | 
 | orient | string | 'bottom' | 'bottom' or 'left' 分别表示坐标轴刻度向下或者刻度向右
 | tickSize | number | null | 表示坐标轴分为多少份 |
 | tickFormat | | string | 刻度单位格式化 |
 | textAnchor | string | 'middle' | 'middle','top','end'三个选项，表示坐标单位的位置 |
 | unit | string |  | 单位 |
 | length | number | | 坐标轴的长度 | 
| hide | boolean | false | 是否隐藏坐标轴

### tooltip
#### Description
提示框，当用户鼠标划到某图形元素时，出现一个提示框，里面写有描述文字
#### Properties
 | Name | Type | Default | Description | 
 | :---: | :---: | :---: | :---: |
| content | string | | 提示框出现的内容 |
| tooltipStyle | object | | {left:30,top:20,opacity:1} 必须包含以上属性，其他属性可以自行添加，比如background,width,height等 |

## 基本组件
### Button
#### Properties
 | Name | Type | Default | Description | 
 | :---: | :---: | :---: | :---: | 
 | type | string | 'default' | default,primary,ghost,danger四种样式选择 | 
 | class (className) | object | | 满足CSS Modules规范的css style | 
 | style | object | | 整个组件的style样式 | 
 | size | string | 'default' | small,default,large三种大小选择 | 
 | disabled | bool | false | 按钮禁用 | 
> 其他属性都是与root element一致

### Input
#### Properties
 | Name | Type | Default | Description | 
 | :---: | :---: | :---: | :---: | 
 | type | string | 'text' | text or textarea，text表示input组件，textare表示textarea组件 | 
 | class (className) | object | | 满足CSS Modules规范的css style | 
 | label | string | | label的名字，不设置，则不出现label | 
 | style | object | | 整个组件的style样式 | 
 | inputStyle | object | | input的style样式 | 
 | labelStyle | object | | label的style样式 | 
 | theme | string | 'minoru' | 我们为Input设置了两款主题样式，'minoru','isao'，用户可以设置theme属性来选择不同的样式 | 
 | value | string | | text filed的value值 | 
 | placeholder | string | | placeholder值 | 
 | readonly (disabled) | bool | false | 只读属性(禁止写入) | 
 | textareaStyle | object | | textarea的style样式 | 
 | rows | string | '5' | textarea 的行数 | 
 | cols | string | | textarea的列树 | 

> 其他属性都是与root element一致
