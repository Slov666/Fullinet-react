export const cartSelector = (state) => {
  return state.persistShop.cartReducer.cart ? state.persistShop.cartReducer.cart : [];
};
