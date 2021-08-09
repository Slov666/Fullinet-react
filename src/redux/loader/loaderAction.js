import { createAction } from '@reduxjs/toolkit';

export const setLoad = createAction('loader/LoaderTrue');
export const removeLoad = createAction('loader/LoaderFalse');
