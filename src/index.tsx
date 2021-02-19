import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserProvider from './components/providers/AuthProvider';
import VideosProvider from './components/providers/VideosProvider';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <VideosProvider>
          <App />
        </VideosProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
