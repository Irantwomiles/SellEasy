import React from 'react';
import './App.css';
import Toolbar from './components/Toolbar.js';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ViewAllGarageSales from './components/ViewallGarageSales';

function App() {

  return(
    <div className="App">
      <Toolbar></Toolbar>
      <SignUp></SignUp>
      <SignIn></SignIn>
      <ViewAllGarageSales></ViewAllGarageSales>
    </div>
  )
}

export default App;
