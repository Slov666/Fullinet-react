import { createReducer } from '@reduxjs/toolkit';
import { setNotification, unsetNotification } from './notificationActions';

const notificationReducer = createReducer([], {
  [setNotification]: (state, { payload }) => {
    const newState = state.filter((item) => item.type !== payload.type);
    return [...newState, { type: payload.type, message: payload.message }];
  },
  [unsetNotification]: (state, { payload }) => {
    const newState = state.filter((item) => item.message !== payload.message);
    return [...newState];
  },
});

export default notificationReducer;
