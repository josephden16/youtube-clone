import React from 'react';
import { Switch } from 'react-router-dom';
import FancyRoute from './components/tools/FancyRoute';
import routes from './routes';


function App() {
  return (
    <div className="App dark:bg-dark dark:text-white transition-colors duration-500">
      <Switch>
        {
          routes.map((route, i) => {
            return <FancyRoute key={i} {...route} />
          })
        }
      </Switch>
    </div>
  );
}

export default App;
