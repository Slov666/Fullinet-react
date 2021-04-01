import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { setModalConnect, setModalShop } from './modalAction';

const modalConnect = createReducer(null, {
  [setModalConnect]: (state, { payload }) => payload,
});

const modalShop = createReducer(null, {
  [setModalShop]: (state, { payload }) => payload,
});


export const modal = combineReducers({
  modalConnect,
  modalShop,
});
