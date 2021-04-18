import { createAction } from '@reduxjs/toolkit';

export const orderServiceRequest = createAction('service/Request');
export const orderServiceSuccess = createAction('service/Success');
export const orderServiceError = createAction('service/Error');
