import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { Provider } from 'react-redux';
import store from './redux/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Provide the Redux store to the entire application
  <Provider store = {store}>
    {/* Enables additional checks and warnings in development */}
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);
