import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { setModalConnectNow } from './modalAction';

const modalConnectNow = createReducer(null, {
  [setModalConnectNow]: (state, { payload }) => payload,
});

export const modal = combineReducers({
  modalConnectNow,
});
