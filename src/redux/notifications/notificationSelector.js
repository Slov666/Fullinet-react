export const getNotificationSelector = (state) => {
  if (state.ui.notification) {
    return state.ui.notification;
  }
};
