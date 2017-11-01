import { h, Component } from 'preact'
import d3 from 'd3'
import Axis from './Axis'
import styles from './index.less'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

class Histogram extends Component {
    static defaultProps = {
        width: 1000,
        height: 300,
        margin: 64,
        left: 40,
        tickSize:3,
        tickFormat:'.0s',
        delta:1
    }
    render({ data, margin, width, height, left,tickSize,tickFormat,delta }) {
        const dWidth = width - margin;
        const dHeight = height - margin;
        const scaleX = d3.scale.linear()
            .domain([0, 120])
            .range([0, dWidth]);
        const scaleY = d3.scale.linear()
            .domain([0, 2000])
            .range([dHeight, 0]);
        let axisx = cx('axis', 'x'),
            axisy = cx('axis', 'y')
        let color = d3.scale.category10()
        return (
            <svg width={width} height={300}>
                <Axis
                    stroke="#673ab7"
                    scale={scaleX}
                    orient="bottom"
                    class={styles.axisx}
                    textAnchor="middle"
                    unit={'ms'}
                    transform={"translate(" + left + "," + (dHeight + margin / 2) + ")"} />
                <Axis
                    stroke="#673ab7"
                    scale={scaleY}
                    orient="left"
                    class={styles.axisy}
                    tickSize={tickSize}
                    tickFormat={tickFormat}
                    textAnchor="end"
                    transform={"translate(" + left + "," + (margin / 2) + ")"} />
                <g class={styles.graph}>
                    {data.map(d => {
                        return (
                            <rect
                                width={dWidth / data.length - 1}
                                height={dHeight - scaleY(d.value)}
                                transform={"translate(" + (scaleX(d.key) + left) + "," + (scaleY(d.value) + margin/2) + ")"}
                                fill={color(d.value)}>
                            </rect>
                        );
                    })}
                </g>
            </svg>
        );
    }
}
export default Histogram