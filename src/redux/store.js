import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { modal } from './modal/modalReducer';
import { shop } from './shop/shopReducer';
import notification from "./notifications/notificationReduser";

const ui = combineReducers({ modal, notification });

const store = configureStore({
  reducer: {
    shop,
    ui,
  },
});

export default store;
