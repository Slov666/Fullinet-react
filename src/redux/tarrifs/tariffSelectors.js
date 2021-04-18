export const getTariffStatus = (state) => state.tariff;

export const getNameSelector = (state) =>
  state.persistCredentials && state.persistCredentials.name;
export const getPhoneSelector = (state) =>
  state.persistCredentials && state.persistCredentials.phone;
export const getAddressSelector = (state) =>
  state.persistCredentials && state.persistCredentials.address;
