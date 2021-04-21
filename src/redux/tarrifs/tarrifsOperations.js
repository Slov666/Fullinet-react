import { pathOr } from 'ramda';
import * as action from './tariffsAction';
import { setModalConnect } from '../modal/modalAction';
import { sendTariffWithCredentials } from '../../utils/fullinetAPI';
import {
  makeSuccessSendedNotification,
  makeAlertNotification,
  makeSuccessUsersInfoNotification,
} from '../notifications/notificationOperations';

export const sendTariffs = (tariff, credentials, token) => (dispatch) => {
  dispatch(action.orderTariffRequest);
  sendTariffWithCredentials(tariff, credentials, token)
    .then((response) => {
      dispatch(action.orderTariffSuccess(response.status));
      dispatch(
        makeSuccessSendedNotification(
          'Успішно відправлено, очікуйте на телефонний дзвінок'
        )
      );
      dispatch(
        makeSuccessUsersInfoNotification(
          'Ваше замовлення вже в потрібних руках. Натисніть щоб закрити.'
        )
      );
      setTimeout(() => {
        dispatch(setModalConnect(false));
      }, 2000);
    })
    .catch((err) => {
      dispatch(
        action.orderTariffError(pathOr('', ['response', 'status'], err))
      );
      dispatch(makeAlertNotification('Щось пішло не так'));
    });
};
