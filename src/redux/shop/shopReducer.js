import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { addToCart, removeFromCart, increment, decrement } from './shopActions';

const INITIAL_STATE = {
  cart: [],
  currentItem: null,
};

const cartReducer = createReducer(INITIAL_STATE, {
  [addToCart]: (state, { payload }) => {
    const item = payload;
    const inCart = state.cart.find((service) =>
      service._id === payload._id ? true : false
    );
    return {
      ...state,
      cart: inCart
        ? state.cart.map((item) =>
            item._id === payload._id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...state.cart, { ...item, qty: 1 }],
    };
  },
  [removeFromCart]: (state, { payload }) => {
    return {
      ...state,
      cart: state.cart.filter((item) => item._id !== payload),
    };
  },
  [increment]: (state, { payload }) => {
    return {
      ...state,
      cart: state.cart.map((item) =>
        item._id === payload ? { ...item, qty: item.qty + 1 } : item
      ),
    };
  },
  [decrement]: (state, { payload }) => {
    return {
      ...state,
      cart: state.cart.map((item) =>
        item._id === payload
          ? { ...item, qty: item.qty <= 1 ? (item.qty = 1) : item.qty - 1 }
          : item
      ),
    };
  },
});

export const shop = combineReducers({ cartReducer });
