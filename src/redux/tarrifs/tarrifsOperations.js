import {pathOr} from 'ramda';
import * as action from './tariffsAction';
import {setModalConnect} from '../modal/modalAction';
import {sendTariffWithCredentials} from '../../utils/fullinetAPI';
import {
    makeSuccessSendedNotification,
    makeAlertNotification,
    makeSuccessUsersInfoNotification,
} from '../notifications/notificationOperations';
import {setLoad} from "../loader/loaderAction";

export const sendTariffs = (tariff, credentials, token) => (dispatch) => {
    dispatch(action.orderTariffRequest);
    dispatch(setLoad(true))
    sendTariffWithCredentials(tariff, credentials, token)
        .then((response) => {
            dispatch(action.orderTariffSuccess(response.status));
            dispatch(
                makeSuccessSendedNotification(
                    'Успішно відправлено, очікуйте на телефонний дзвінок'
                )
            );
            setTimeout(() => {
                dispatch(
                    makeSuccessUsersInfoNotification(
                        'Ваше замовлення вже в потрібних руках. Натисніть щоб закрити.'
                    )
                );
            }, 2000);
            setTimeout(() => {
                dispatch(setModalConnect(false));
            }, 2000);
        })
        .catch((err) => {
            dispatch(
                action.orderTariffError(pathOr('', ['response', 'status'], err))
            );
            dispatch(makeAlertNotification('Щось пішло не так'));
        }).finally(() => dispatch(setLoad(false)));
};
