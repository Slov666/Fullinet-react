import { createReducer } from '@reduxjs/toolkit';

import { setFlip, setCurrentIdFlip, removeCurrentIdFlip } from './flipedAction';

export const isFlip = createReducer([], {
  [setFlip]: (state, { payload }) => {
    const isFlip = payload;
    const newState = state.filter((item) => item.id !== isFlip.id);
    return [...newState, isFlip];
  },
});
export const flipId = createReducer([], {
  [setCurrentIdFlip]: (state, { payload }) => {
    const newState = state.filter((item) => item.id !== payload);
    return [...newState, { id: payload }];
  },
  [removeCurrentIdFlip]: (state, { payload }) => {
    return state.filter((item) => item.id !== payload);
  },
});
