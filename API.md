# PinV API文档

## 可视化组件

### ScatterPlot（散点图）
#### Properties
Name |Type | Default  | Description 
---|---|---|---|---
data|array| | 源数据，要求格式为对象数组，例如[{age:24,weight:140},{age:24,weight:140}]
XAxis|string| |x轴的key值
YAxis|string| |y轴的key值
width|number|600|图形的宽度
height|number|300|图形的高度
padding|object|{ top: 32, bottom: 32, left: 20, right: 20 }|例如：{ top: 32, bottom: 32, left: 20, right: 20 }
tickSize|number|5|y轴的tickSize
tickFormat|string|''|y轴value的format，例如'.0s'
hidden|boolean|false|是否隐藏x,y坐标轴
stroke|string|'#673ab7'|轴线的颜色

### Histogram（直方图）
#### Properties
Name |Type | Default  | Description 
---|---|---|---|---
data|array| | 源数据，要求格式为对象数组，例如[{age:24,weight:140},{age:24,weight:140}]
XAxis|string| |x轴的key值
YAxis|string| |y轴的key值
width|number|600|图形的宽度
height|number|300|图形的高度
padding|object|{ top: 32, bottom: 32, left: 20, right: 20 }|例如：{ top: 32, bottom: 32, left: 20, right: 20 }
tickSize|number|5|y轴的tickSize
tickFormat|string|''|y轴value的format，例如'.0s'
hidden|boolean|false|是否隐藏x,y坐标轴
stroke|string|'#673ab7'|轴线的颜色

## 基本组件
### Button
#### Properties
Name |Type | Default  | Description 
---|---|---|---|---
type | string | 'default' | default,primary,ghost,danger四种样式选择
class (className) | object |  | 满足CSS Modules规范的css style
style | object | | 整个组件的style样式
size | string | 'default' | small,default,large三种大小选择
disabled | bool | false | 按钮禁用
> 其他属性都是与root element一致

### Input
#### Properties
Name |Type | Default  | Description 
---|---|---|---|---
type| string | 'text' | text or textarea，text表示input组件，textare表示textarea组件
class (className) | object |  | 满足CSS Modules规范的css style
label | string | | label的名字，不设置，则不出现label
style | object | | 整个组件的style样式
inputStyle | object | | input的style样式
labelStyle | object | | label的style样式
theme | string | 'minoru' | 我们为Input设置了两款主题样式，'minoru','isao'，用户可以设置theme属性来选择不同的样式
value | string | | text filed的value值
placeholder | string | | placeholder值
readonly (disabled) | bool | false | 只读属性(禁止写入)
textareaStyle | object | | textarea的style样式
rows | string | '5' | textarea 的行数
cols | string | | textarea的列树

> 其他属性都是与root element一致
