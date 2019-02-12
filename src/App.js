import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    rotate: false
  }

  render() {
    let rotate = this.state.rotate ? "rotate(-40deg)" : "rotate(-45deg)";
    let rotateNeg = this.state.rotate ? "rotate(40deg)" : "rotate(45deg)";
    let style = {
      transform: rotate
    }
    let styleNeg = {
      transform: rotateNeg
    }
    return (
      <div className="circle" onMouseOver={() => this.setState({ rotate: true})} onMouseLeave={() => this.setState({ rotate: false })}>
        <div className="line1" style={style}></div>
        <div className="line2" style={styleNeg}></div>
      </div>
    );
  }
}

export default App;
