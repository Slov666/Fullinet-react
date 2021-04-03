import { setNotification, unsetNotification } from "./notificationActions";

export const makeSuccessNotification = (text) => (dispatch) => {
  const params = {
    type: "success",
    message: text,
  };
  dispatch(setNotification(params));
  setTimeout(() => dispatch(unsetNotification()), 4000);
};
export const makeAlertNotification = (text) => (dispatch) => {
  const params = {
    type: "alert",
    message: text,
  };
  dispatch(setNotification(params));
  setTimeout(() => dispatch(unsetNotification()), 4000);
};
