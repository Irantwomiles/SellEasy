import React from 'react';
import './App.css';
import Toolbar from './components/Toolbar.js';
import ViewAllGarageSales from './components/ViewallGarageSales';

function App() {

  return(
    <div className="App">
      <Toolbar></Toolbar>
      <ViewAllGarageSales></ViewAllGarageSales>
    </div>
  )
}

export default App;
