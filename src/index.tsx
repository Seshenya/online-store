import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

const Index: React.FunctionComponent = () => {
  return (
    <React.StrictMode>
        <Provider store={store}>
    <App />
  </Provider>,
  </React.StrictMode>
  );
};

const mountNode = document.getElementById("root");
ReactDOM.render(<Index />, mountNode);
