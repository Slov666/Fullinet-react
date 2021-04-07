import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import './styles/index.css';
import { HashRouter } from 'react-router-dom';

import App from './components/App';

ReactDOM.render(
  <Provider store={store} persistor={persistor}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.querySelector('#root')
);
