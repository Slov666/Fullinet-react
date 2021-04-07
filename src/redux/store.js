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
import { isFlip, flipId } from './fliped/flipedReducer';

const persistConfig = {
  key: 'cart',
  storage,
};
const ui = combineReducers({ modal, notification, isFlip, flipId });

const persistShop = persistReducer(persistConfig, shop);

export const store = configureStore({
  reducer: {
    persistShop,
    ui,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
export const persistor = persistStore(store);


