import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { modal } from './modal/modalReducer';

const ui = combineReducers({ modal });

const store = configureStore({
  reducer: {
    ui,
  },
});

export default  store ;
