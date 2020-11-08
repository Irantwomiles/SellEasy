import React from 'react';
import './App.css';
import Toolbar from './components/Toolbar.js';

function App() {

  return(
    <div className="App">
      <div className="jumbotron">
        <div class="topline">
          <div class="welcome">
            <h1>SellEasy</h1>
            <h3>dedicated to helping you sell</h3>
          </div>
          <Toolbar></Toolbar>
        </div>
      </div>
      <div className="container">
        <p>Sales in your area</p>
      </div>
    </div>
  )
}

export default App;
