export const modalConnectNowSelector  = (state) => state.ui.modal.modalConnectNow

export const isAnyModalOpenSelector = (state) => {
    const values = Object.values(state.ui.modal);
    const isOpen = values.some((value) => !!value);
    return isOpen;
  };