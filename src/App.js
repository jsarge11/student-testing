import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    arrOfObjs: [
      {name: 'Jay', age: 26},
      {name: 'Jay', age: 26},
      {name: 'Jay', age: 26},
      {name: 'Jay', age: 26},
    ]
  }

  makeRequest = () => {
      axios.get('/test', {
        params: this.state.arrOfObjs
    }).then((res) => {
      console.log(res)
    })
  }
  
  render() {
    return (
      <div className="App">
       <button onClick={() => this.makeRequest()}>Make a Request</button>
      </div>
    );
  }
}

export default App;
