import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/Store'; 
import AppRouter from './assets/components/Router';
import "../../Front-end/src/index.scss";

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
