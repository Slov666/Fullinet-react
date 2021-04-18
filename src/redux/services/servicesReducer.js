import { createReducer } from '@reduxjs/toolkit';

import {
  orderServiceRequest,
  orderServiceSuccess,
  orderServiceError,
} from './servicesAction';

export const tariff = createReducer(null, {
  [orderServiceRequest]: (_, { payload }) => payload,
  [orderServiceSuccess]: () => null,
  [orderServiceError]: (_, { payload }) => payload,
});
