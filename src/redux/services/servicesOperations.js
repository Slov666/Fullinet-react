import { pathOr } from 'ramda';
import * as action from './servicesAction';
import { setModalShop } from '../modal/modalAction';
import { sendServicesWithCredentials } from '../../utils/fullinetAPI';
import {
  makeSuccessSendedNotification,
  makeSuccessUsersInfoNotification,
  makeAlertNotification,
} from '../notifications/notificationOperations';

export const sendServices = (
  sendServices,
  credentials,
  totalInfoToSend,
  token
) => (dispatch) => {
  dispatch(action.orderServiceRequest);
  sendServicesWithCredentials(sendServices, credentials, totalInfoToSend, token)
    .then((response) => {
      dispatch(action.orderServiceSuccess(response.status));
      dispatch(makeSuccessSendedNotification('Успішно відправлено'));
      setTimeout(() => {
        dispatch(
          makeSuccessUsersInfoNotification(
            'Ваше замовлення вже в потрібних руках. Натисніть щоб закрити.'
          )
        );
      }, 2000);

      setTimeout(() => {
        dispatch(setModalShop(false));
      }, 2000);
    })
    .catch((err) => {
      dispatch(
        action.orderServiceError(pathOr('', ['response', 'status'], err))
      );
      dispatch(makeAlertNotification('Щось пішло не так'));
    });
};
