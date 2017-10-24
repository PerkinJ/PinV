import {h,Component} from 'preact'
import d3 from 'd3'
import DataCircles from './data-circles'
import XYAxis from './x-y-axis'

// 从数据集中返回最大的 X 坐标
const xMax   = (data)  => d3.max(data, (d) => d[0]);

// 从数据集返回最大的 Y 坐标
const yMax   = (data)  => d3.max(data, (d) => d[1]);

// 返回将数据缩放X坐标以适合图表的函数
const xScale = (props) => {
  return d3.scale.linear()
    .domain([0, xMax(props.data)])
    .range([props.padding, props.width - props.padding * 2]);
};

// 返回将数据缩放Y坐标以适合图表的函数
const yScale = (props) => {
  return d3.scale.linear()
    .domain([0, yMax(props.data)])
    .range([props.height - props.padding, props.padding]);
};

export default (props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  return <svg width={props.width} height={props.height}>
    <DataCircles {...props} {...scales} />
    <XYAxis {...props} {...scales} />
  </svg>
}