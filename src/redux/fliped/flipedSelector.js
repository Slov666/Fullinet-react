export const someFlipIsOpenSelector = (state) => {
  return state.ui.activeflipId.some((item) => item);
};

export const idFlipSelector = (id) => (state) => {
  // eslint-disable-next-line array-callback-return
  return state.ui.activeflipId.find((item) => {
    if (item.id === id) {
      return item.id;
    }
  });
};
