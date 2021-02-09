import React from 'react';
import './styles/App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Settings from './views/Settings';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/settings' component={Settings} />
      </Switch>
    </div>
  );
}

export default App;
