import { createAction } from '@reduxjs/toolkit';

export const addToCart = createAction('shop/addToCart');
export const removeFromCart = createAction('shop/removeFromCart');

export const increment = createAction('shop/increment');
export const decrement = createAction('shop/decrement');
