import { createReducer } from '@reduxjs/toolkit';
import {
  orderTariffRequest,
  orderTariffSuccess,
  orderTariffError,
  setNameAction,
  setPhoneAction,
  setAddressAction,
} from './tariffsAction';

export const responseTariff = createReducer(null, {
  [orderTariffSuccess]: (_, { payload }) => payload,
  [orderTariffRequest]: () => null,
  [orderTariffError]: (_, { payload }) => payload,
});

export const credentials = createReducer(
  {},
  {
    [setNameAction]: (state, { payload }) => {
      return { ...state, name: payload };
    },
    [setPhoneAction]: (state, { payload }) => {
      return { ...state, phone: payload };
    },
    [setAddressAction]: (state, { payload }) => {
      return { ...state, address: payload };
    },
  }
);
