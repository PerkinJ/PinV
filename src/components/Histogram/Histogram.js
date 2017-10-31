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
        left: 40
    }
    render({ data, margin, width, height, left }) {
        const dWidth = width - margin;
        const dHeight = height - margin;
        const scaleX = d3.scale.linear()
            .domain([15, 125])
            .range([0, dWidth]);
        const scaleY = d3.scale.linear()
            .domain([0, 2000])
            .range([dHeight, 0]);
        let axisx = cx('axis', 'x'),
            axisy = cx('axis', 'y')
        return (
            <svg width={width} height={300}>
                <Axis
                    scale={scaleX}
                    orient="bottom"
                    class={styles.axisx}
                    text-anchor="middle"
                    transform={"translate(" + left + "," + (dHeight + margin / 2) + ")"} />
                <Axis
                    scale={scaleY}
                    orient="left"
                    class={styles.axisy}
                    tickSize="3"
                    tickFormat=".0k"
                    text-anchor="end"
                    transform={"translate(" + left + "," + (margin / 2) + ")"} />
                <g class={styles.graph}>
                    {data.map(d => {
                        return (
                            <rect
                                width={dWidth / data.length - 1}
                                height={dHeight - scaleY(d.count)}
                                transform={"translate(" + (scaleX(d.latency - 5) + 40) + "," + (scaleY(d.count) + 32) + ")"}
                                fill="#9ab8f6">
                            </rect>
                        );
                    })}
                </g>
            </svg>
        );
    }
}
export default Histogram