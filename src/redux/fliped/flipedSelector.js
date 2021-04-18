// export const getIsFlipSelector = (state) => state.ui.isFlip;

// export const someFlipIsOpenSelector = (state) => {
//   const someFlip = getIsFlipSelector(state);
//   return someFlip.some((item) => item.isFlip);
// };

export const idFlipSelector = (id) => (state) => {
  // eslint-disable-next-line array-callback-return
  return state.ui.activeflipId.find((item) => {
    if (item.id === id) {
      return item.id;
    }
  });
};
