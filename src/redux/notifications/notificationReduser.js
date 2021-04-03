import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { setNotification, unsetNotification } from "./notificationActions";

const type = createReducer(null, {
  [setNotification]: (_, action) => action.payload.type,
});
const message = createReducer(null, {
  [setNotification]: (_, action) => action.payload.message,
  [unsetNotification]: () => null,
});

const notificationReducer = combineReducers({
  type,
  message,
});

export default notificationReducer;
