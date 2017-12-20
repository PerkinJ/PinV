# PinV

**P**react **in** **V**isualization

a lightweight visualization component library based preact and d3

![Build Status](https://travis-ci.org/PerkinJ/PinV.svg?branch=master)
### 一款基于preact+d3.js的轻量级组件库


本项目基于[preact-boilerplate](https://github.com/developit/preact-boilerplate#css-modules)脚手架开发

[API文档](https://github.com/PerkinJ/PinV/blob/master/API.md)

### 项目开发规范
- CSS Modules
- BEM命名规范（B_E__M）

### 已完成的组件
本组件库主要分为三大类组件，一类是主要的视图型组件，即modules类。一类是可视化基础组件，basic类。另一类是基础组件，infrastructure类。


基础组件(infrastructure)
- [x] Button组件
- [x] Input组件

可视化基础组件(basic)
- [x] Axis组件（坐标轴）
- [x] Circles组件（散点）
- [x] Tooltip组件（悬浮提示）

可视化视图组件(modules)
- [x] PieChart组件（饼状图）
- [x] LineChart组件（折线图）
- [x] ScatterPlot组件（散点图）
- [x] Histogram组件（直方图）
- [x] SunburstLayout（辐射图）
- [x] PackLayout (圆形填充）
- [x] PartitionLayout（分区布局图）
- [x] TreeMapLayout（树矩形图）
- [x] ClusterLayout(簇状图)
- [x] TreeLayout（树状图）
- [x] ChordDiagram（弦图）
- [x] ForceDirectedGraph（力导向图）

WebGL可视化组件
- [x] ForceDirectedGraphGL（力导向图）[参考](https://zhuanlan.zhihu.com/p/27784091)
### License
PinV is available under the [MIT license](https://opensource.org/licenses/MIT)
