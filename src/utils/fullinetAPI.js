import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3001/';
// axios.defaults.baseURL = 'https://fullinet.herokuapp.com/';
axios.defaults.baseURL = 'https://fullinet-node-js.vercel.app/';

export const sendTariffWithCredentials = (tariff, credentials, token) => {
  return axios.post('api/tariff', { tariff, credentials, token });
};

export const sendServicesWithCredentials = (
  services,
  credentials,
  allInfo,
  token
) => {
  return axios.post('api/services', { services, credentials, allInfo, token });
};
