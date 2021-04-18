import { createAction } from '@reduxjs/toolkit';

export const orderTariffRequest = createAction('tarrif/Request');
export const orderTariffSuccess = createAction('tarrif/Success');
export const orderTariffError = createAction('tarrif/Error');

export const setNameAction = createAction('tariff/SetName');
export const setPhoneAction = createAction('tariff/SetPhone');
export const setAddressAction = createAction('tariff/SetAddress');
