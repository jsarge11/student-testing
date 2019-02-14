import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <div class="sidebar">
          <p>Some information here</p>
        </div>
        <div className="main">
          <header>
            <a href="#" id="logo">ImportantCo</a>

            <nav>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </nav>
          </header>
          <section id="hero">
            <div id="content">
              <h1>Sensible Solutions</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi</p>
            </div>
            <img src="images/mountain.jpg" id="mountain" />
          </section>
          <section id="info">
            <div id="content2">
              <h2>Reinvention</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi</p>
            </div>
            <img src="images/vector-mountains.svg" id="mountain-vector" />
          </section>
          <ul id="features">
            <li>
              <i class="fa fa-id-card" aria-hidden="true"></i>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </li>
            <li>
              <i class="fa fa-id-card" aria-hidden="true"></i>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </li>
            <li>
              <i class="fa fa-id-card" aria-hidden="true"></i>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </li>
            <li>
              <i class="fa fa-id-card" aria-hidden="true"></i>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </li>
            <li>
              <i class="fa fa-id-card" aria-hidden="true"></i>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </li>
          </ul>
        </div>
        <footer>
        <p>My footer bar</p>
        </footer>

      </div>
    )
  }
}

export default App;
