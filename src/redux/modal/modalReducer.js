import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { setModalConnect } from './modalAction';

const modalConnect = createReducer(null, {
  [setModalConnect]: (state, { payload }) => payload,
});

export const modal = combineReducers({
  modalConnect,
});
