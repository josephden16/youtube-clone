import React from 'react';
import { Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import FancyRoute from './components/tools/FancyRoute';
import routes from './routes';


function App() {
  return (
    <div className="App dark:bg-dark dark:text-white transition-all duration-300 flex flex-col">
      <Switch>
        {
          routes.map((route, i) => {
            return <FancyRoute key={i} {...route} />
          })
        }
      </Switch>
      <ToastContainer className="font-sans" />
    </div>
  );
}

export default App;
