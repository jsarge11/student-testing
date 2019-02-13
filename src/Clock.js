import React, { Component } from 'react';
import './clock.css'

class Clock extends Component {
  state = {
    seconds: new Date().getSeconds(),
    deg: (new Date().getSeconds() - 90) * 6
  }
  componentDidMount() {
    setInterval(() => {
      let date = new Date();
      let seconds = date.getSeconds();
      this.setState({ seconds: seconds}, () => {
        this.changeSeconds();
      })
    }, 1000)
  }
  changeSeconds = () => {
    let { seconds } = this.state;
    let deg = (seconds - 90) * 6;
    this.setState({ deg }) 
    console.log(deg);
  }
  
  render() {
    let deg = `rotate(${this.state.deg}deg)`;
    console.log(deg)
    return (
      <div className="clock">
        <div style={{transform: deg}}className="clock-hands second-hand"></div>
        <div className="clock-hands minute-hand"></div>
        <div className="clock-hands hour-hand"></div>
      </div>
    );
  }
}

export default Clock;
