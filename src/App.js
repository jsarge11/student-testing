import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {

  }
  handleChange = (e) => {
    console.log(e.target.files)
  }
  
  render() {
    return (
      <div className="App">
       <input type="file" onChange={this.handleChange}/>
      </div>
    );
  }
}

export default App;
