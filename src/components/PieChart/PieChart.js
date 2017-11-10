import { h } from 'preact'
import * as d3 from 'd3'
import styles from './index.less'
import { colorGenerator } from '../../utils/utils'
import { getPieData } from '../../utils/model'


const calculateArc = (value, arcProps) => (
	d3.arc()
		.cornerRadius(arcProps.cornerRadius)
		.innerRadius(arcProps.innerRadius)
		.outerRadius(arcProps.outerRadius)
		.startAngle(value.startAngle)
		.endAngle(value.endAngle)
		.padAngle(arcProps.padAngle)
)

const PieChart = ({ width = 500, height = 500, startAngle = 0, endAngle = 1, cx, cy, innerRadius, outerRadius, cornerRadius, padAngle, textColor, data, dataKey, nameKey }) => {
	const pieData = getPieData(data, dataKey,startAngle,endAngle)
	let arcProps = {
		innerRadius: innerRadius && innerRadius < outerRadius ? innerRadius : 0,
		outerRadius: outerRadius || width / 3,
		textColor: textColor || '#000',
		cx: cx || width / 2,
		cy: cy || height / 2,
		cornerRadius: cornerRadius || 0,
		padAngle: padAngle || 0

	}
	return (
		<svg width={width} height={height} class={styles.chart}>
			{pieData.map((value, index, arr) =>
				<Segment
					{...arcProps}
					index={index}
					arc={calculateArc(value, arcProps)}
					label={data}
					length={arr.length}
					nameKey={nameKey}
					dataKey={dataKey}
				/>
			)}
		</svg>
	)
}



const Segment = ({ cx, cy, arc, index, label, highlight, innerRadius, outerRadius, textColor, length, nameKey, dataKey }) => {
	// if (highlight) {
	// 	arc.innerRadius(0).outerRadius(250)
	// }
	const colors = colorGenerator(length)
	let percent = Number(label[index][dataKey]) / d3.sum(label, (d) => d[dataKey]) * 100
	let text = label[index][nameKey]
	return (
		<g class={styles.segment} transform={`translate(${cx}, ${cy})`}>
			<path d={arc()} fill={colors(index).toString()} />
			<Label textColor={textColor} arc={arc.innerRadius(innerRadius).outerRadius(outerRadius)}>{`${percent.toFixed(2)}%`}</Label>
			{highlight && <circle r="45" fill={colors(index).toString()} />}
			<line
				stroke="black"
				x1={arc.centroid()[0] * 2}
				y1={arc.centroid()[1] * 2}
				x2={arc.centroid()[0] * 2.2}
				y2={arc.centroid()[1] * 2.2}
			/>
			<text
				fill={textColor}
				transform={`translate(${arc.centroid()[0] * 2.5},${arc.centroid()[1] * 2.5})`}
				text-anchor="middle">
				{text}
			</text>
		</g>
	)
}

const Label = ({ children, arc, textColor }) =>
	<text fill={textColor} transform={`translate(${arc.centroid()})`} text-anchor="middle">{children}</text>

export default PieChart
