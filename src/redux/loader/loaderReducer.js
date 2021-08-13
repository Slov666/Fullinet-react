import {createReducer} from '@reduxjs/toolkit';

import {setLoad} from './loaderAction';

export const load = createReducer(false, {
    [setLoad]: (state, {payload}) => payload,
});
