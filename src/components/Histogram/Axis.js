import {h,Component} from 'preact'
import d3 from 'd3'
import styles from './index.less'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

class Axis extends Component {
    render({ scale, orient, tickSize = null, tickFormat = '', ...props }) {
      let ticks = scale.ticks(tickSize);
      let path = orient === "bottom" ? "M0.5,6V0.5H936.5V6" : "M-6,236.5H0.5V0.5H-6";
      
      return (
        <g {...props} fill="none">
          <path class={styles.domain} stroke="#000" d={path}></path>
          {ticks.map(d => {
            let space = scale(d);
            
            if (orient === "bottom") {
              return (
                <g class={styles.tick} opacity="1" transform={"translate(" + space + ",0)"}>
                  <line stroke="#000" y2="6"></line>
                  <text fill="#000" y="9" dy="0.71em">{d}ms</text>
                </g>
              ); 
            } else {
              return (
                <g class={styles.tick} opacity="1" transform={"translate(0," + space + ")"}>
                  <line stroke="#000" x2="-6"></line>
                  <text fill="#000" x="-9" dy="0.32em">{d3.format(tickFormat)(d)}</text>
                </g>
              );
            }
          })}
        </g>
      );
    }
  }
  export default Axis