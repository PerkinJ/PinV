import { h } from 'preact'
import * as d3 from 'd3'
import styles from './index.less'
import { summation } from '../../utils/utils'
const colorGenerator = (numberOfSteps) => {
	const colors = d3.range(numberOfSteps).map((index) => d3.hsl((360 / numberOfSteps) * index, 0.9, 0.94))
	return (index) => colors[index]
}
const phone = [
	{name:'apple',sales:2000},
	{name:'huawei',sales:1800},
	{name:'sansung',sales:2200},
	{name:'xiaomi',sales:1600},
	{name:'oppo',sales:1700},
	{name:'vivo',sales:2500},
	{name:'others',sales:2100}
]
let result = summation(phone,'sales')

console.log(result)
const animals = ['Lemur', 'Flamingo', 'Rabbit', 'Donkey', 'Dog', 'Flamingo', 'Rabbit', 'Donkey', 'Dog']
const colors = colorGenerator(animals.length)

const calculateArc = (segmentIndex, numberOfSegments, chartSize, arcProps) => (
	d3.arc()
		.cornerRadius(6)
		.innerRadius(arcProps.innerRadius)
		.outerRadius(arcProps.outerRadius)
		.startAngle((Math.PI * 2 / numberOfSegments) * segmentIndex)
		.endAngle((Math.PI * 2 / numberOfSegments) * (segmentIndex + 1))
		.padAngle(0.02)
)

const PieChart = ({ width = 500, height = 500, cx, cy, size, innerRadius, outerRadius, textColor }) => {
	let arcProps = {
		innerRadius: innerRadius && innerRadius < outerRadius?innerRadius:0,
		outerRadius: outerRadius || 200,
		textColor: textColor || '#000',
		cx: cx || width / 2,
		cy: cy || height / 2
	}
	return (
		<svg width={width} height={height} class={styles.chart} viewBox={`0, 0, ${size} ${size}`}>
			{animals.map((label, index, values) => (
				<Segment
					{...arcProps}
					size={size}
					index={index}
					arc={calculateArc(index, values.length, size, arcProps)}
					label={label}
				/>))
			}
		</svg>
	)
}



const Segment = ({ cx, cy, arc, index, label, highlight, innerRadius, outerRadius, textColor }) => {
	// if (highlight) {
	// 	arc.innerRadius(0).outerRadius(250)
	// }
	return (
		<g class={styles.segment} transform={`translate(${cx}, ${cy})`}>
			<path d={arc()} fill={colors(index).toString()} />
			<Label textColor={textColor} arc={arc.innerRadius(innerRadius + 10).outerRadius(outerRadius)}>{label}</Label>
			{highlight && <circle r="45" fill={colors(index).toString()} />}
		</g>
	)
}

const Label = ({ children, arc, textColor }) => (
	<text fill={textColor} transform={`translate(${arc.centroid()})`} text-anchor="middle">{children}</text>
)

export default PieChart
