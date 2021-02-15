import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/';
import Settings from './pages/Settings/';
import Watch from './pages/Watch/';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/watch' component={Watch} />
        <Route exact path='/settings' component={Settings} />
      </Switch>
    </div>
  );
}

export default App;
