import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Toolbar from './components/Toolbar.js';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ViewAllGarageSales from './components/ViewallGarageSales';

function App() {

  return(
    <Router>
      <div className="App">
        <Toolbar></Toolbar>

        <Switch>
          <Route path="/" exact component={ViewAllGarageSales}/>
          <Route path="/signup" exact component={SignUp}/>
          <Route path="/signin" exact component={SignIn}/>
        </Switch>
      
      </div>
    </Router>
  )
}

export default App;
