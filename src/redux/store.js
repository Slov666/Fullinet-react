import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers } from 'redux';
import { modal } from './modal/modalReducer';
import { shop } from './shop/shopReducer';
import notification from './notifications/notificationReduser';
import {  flipId } from './fliped/flipedReducer';
import { responseTariff } from './tarrifs/tariffsReducer';
import { credentials } from './tarrifs/tariffsReducer';
import {load} from "./loader/loaderReducer"

const persistConfigCart = {
  key: 'cart',
  storage,
};
const persisConfigCredentials = {
  key: 'credentials',
  storage,
};
const ui = combineReducers({ modal, notification, activeflipId:  flipId, load});

const persistShop = persistReducer(persistConfigCart, shop);
const persistCredentials = persistReducer(persisConfigCredentials, credentials);

export const store = configureStore({
  reducer: {
    persistShop,
    ui,
    responseTariff,
    persistCredentials,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
export const persistor = persistStore(store);
