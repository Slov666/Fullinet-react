import {createReducer} from '@reduxjs/toolkit';

import {setLoad, removeLoad} from './loaderAction';

export const load = createReducer(false, {
    [setLoad]: (state, {payload}) => payload,
});
