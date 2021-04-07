import { createAction } from '@reduxjs/toolkit';

export const setFlip = createAction('flip/SetFlip');
export const setCurrentIdFlip = createAction('flip/SetFlipID');
export const removeCurrentIdFlip = createAction('flip/RemoveFlipID');
