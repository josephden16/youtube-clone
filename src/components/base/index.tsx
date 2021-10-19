import React from "react";
import { Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import FancyRoute from '../tools/FancyRoute';
import routes from '../../routes';
import 'react-toastify/dist/ReactToastify.min.css';


export default function Base() {
  return (
    <div className="App dark:bg-dark dark:text-white flex flex-col">
      <Switch>
        {routes.map((route, i) => {
          return <FancyRoute key={i} {...route} />;
        })}
      </Switch>
      <ToastContainer className="font-sans" />
    </div>
  );
}
