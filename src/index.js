import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import  store  from './redux/store';
import './styles/index.css';
import { HashRouter } from 'react-router-dom';

import App from './components/App';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.querySelector('#root')
);
