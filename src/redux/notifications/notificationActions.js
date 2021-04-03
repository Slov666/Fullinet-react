import { createAction } from "@reduxjs/toolkit";

export const setNotification = createAction("notification/set");
export const unsetNotification = createAction("notification/unset");
