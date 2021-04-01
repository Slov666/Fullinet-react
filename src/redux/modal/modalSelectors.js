export const modalConnectSelector = (state) => state.ui.modal.modalConnect;
export const modalShopSelector = (state) => state.ui.modal.modalShop;

export const isAnyModalOpenSelector = (state) => {
  const values = Object.values(state.ui.modal);
  const isOpen = values.some((value) => !!value);
  return isOpen;
};
