import { createReducer } from '@reduxjs/toolkit';

import {  setCurrentIdFlip, removeCurrentIdFlip } from './flipedAction';


export const flipId = createReducer([], {
  [setCurrentIdFlip]: (state, { payload }) => {
    const newState = state.filter((item) => item.id !== payload);
    return [...newState, { id: payload }];
  },
  [removeCurrentIdFlip]: (state, { payload }) => {
    return state.filter((item) => item.id !== payload);
  },
});
