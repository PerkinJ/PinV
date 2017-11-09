import { h } from 'preact'
import * as d3 from 'd3'
import styles from './index.less'
import { colorGenerator } from '../../utils/utils'
import { getPieData } from '../../utils/model'




const calculateArc = (value,arcProps) => (
	d3.arc()
		.cornerRadius(0)
		.innerRadius(arcProps.innerRadius)
		.outerRadius(arcProps.outerRadius)
		.startAngle(value.startAngle)
		.endAngle(value.endAngle)
		.padAngle(0)
)

const PieChart = ({ width = 500, height = 500, cx, cy, size, innerRadius, outerRadius, textColor,data,dataKey }) => {
	const pieData = getPieData(data, dataKey)
	let arcProps = {
		innerRadius: innerRadius && innerRadius < outerRadius ? innerRadius : 0,
		outerRadius: outerRadius || 200,
		textColor: textColor || '#000',
		cx: cx || width / 2,
		cy: cy || height / 2
	}
	return (
		<svg width={width} height={height} class={styles.chart} viewBox={`0, 0, ${size} ${size}`}>
			{pieData.map((value, index,arr) =>
				<Segment
					{...arcProps}
					size={size}
					index={index}
					arc={calculateArc(value, arcProps)}
					label={value}
					length={arr.length}
				/>
			)}
		</svg>
	)
}



const Segment = ({ cx, cy, arc, index, label, highlight, innerRadius, outerRadius, textColor,length }) => {
	// if (highlight) {
	// 	arc.innerRadius(0).outerRadius(250)
	// }
	const colors = colorGenerator(length)
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
