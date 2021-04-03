export const getNotificationSelector = (state) => {
  if (state.ui.notification.message) {
    return state.ui.notification;
  }
};
