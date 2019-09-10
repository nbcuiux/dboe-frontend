import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Nav from './components/Nav';

import Home from './components/Home';
import DatabrowseDB from './components/DatabrowseDB';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/databrowse' component={DatabrowseDB}/>
        </Switch>
      </div>
    );
  }
}

export default App;
