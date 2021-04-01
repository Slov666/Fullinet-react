import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { modal } from './modal/modalReducer';
import { shop } from './shop/shopReducer';

const ui = combineReducers({ modal });

const store = configureStore({
  reducer: {
    shop,
    ui,
  },
});

export default store;
