import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ViewAllGarageSales from './components/ViewallGarageSales';
import Toolbar from './components/Toolbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Account from './components/Account';
import CreatePost from './components/CreatePost';
import { UserProvider } from './context/UserContext';
import ViewPost from './components/ViewPost';
import About from './components/About';

function App() {

  return(
    <Router>
      <UserProvider>

        <div className="App">
     
          <Toolbar></Toolbar>

          <Switch>
            <Route path="/" exact component={About}/>
            <Route path="/viewall" exact component={ViewAllGarageSales}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/signin" exact component={SignIn}/>
            <Route path="/account" exact component={Account}/>
            <Route path="/create" exact component={CreatePost}/>
            <Route path="/:id" render={(props) => <ViewPost {...props} key={props.match.params.id} />} />
          
          </Switch>
        
        </div>
        
      </UserProvider>
    </Router>
  )
}

export default App;
