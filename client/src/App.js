import React from 'react';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Jokes from './components/Jokes';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


function App() {
  return (
    <Router>

    <div className="App">
    <div><Link to="/register">Register</Link></div>
    <div><Link to="/login">Login</Link></div>
    <div><Link to="/">Jokes</Link></div>


    <Switch>
          <Route exact path="/" component={Jokes} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register" component={SignUp} />
    </Switch>

    </div>
    </Router>
  );
}

export default App;
