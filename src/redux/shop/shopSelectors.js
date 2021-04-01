export const cartSelector = (state) => {
  return state.shop.cartReducer.cart ? state.shop.cartReducer.cart : [];
};
