import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ConnectElemet.module.css';
import useValiadField from '../../../../hooks/useValidateField';

import { modalConnectSelector } from '../../../../redux/modal/modalSelectors';
import {
  getAddressSelector,
  getNameSelector,
  getPhoneSelector,
} from '../../../../redux/tarrifs/tariffSelectors';
import { makeAlertNotification } from '../../../../redux/notifications/notificationOperations';
import {
  setNameAction,
  setPhoneAction,
  setAddressAction,
} from '../../../../redux/tarrifs/tariffsAction';

import { useTranslation } from 'react-i18next';
import useMobile from '../../../../hooks/useMobile';
import useTitle from '../../../../hooks/useTitle';
import '../../../../utils/i18next';

import { sendTariffs } from '../../../../redux/tarrifs/tarrifsOperations';

import ReCAPTCHA from 'react-google-recaptcha';
import MyButton from '../../../../common/MyButton/MyButton';
import MyInput from '../../../../common/MyInput/MyInput';
import SendIcon from '@material-ui/icons/Send';
import { Scrollbars } from 'rc-scrollbars';
import { loadingSelector } from '../../../../redux/loader/loaderSelector';
import Loaders from '../../../Loader/Loader';

export default function ConnectElement() {
  const { t } = useTranslation();
  useTitle(t('nav.connect'));
  const currentTariff = useSelector(modalConnectSelector);

  const nameRedux = useSelector(getNameSelector);
  const phoneRedux = useSelector(getPhoneSelector);
  const tariffRedux = useSelector(getAddressSelector);
  const load = useSelector(loadingSelector);

  const recaptchaRef = React.useRef();
  const isMobile = useMobile();
  const dispatch = useDispatch();

  const [token, setToken] = useState('');

  const [validName, setValidName] = useValiadField();
  const [validPhone, setValidPhone] = useValiadField();
  const [validAddress, setValidAddress] = useValiadField();

  useEffect(() => {
    setValidName(nameRedux);
    setValidPhone(phoneRedux);
    setValidAddress(tariffRedux);
  }, [nameRedux, phoneRedux, tariffRedux]);

  const handlerOnSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      dispatch(makeAlertNotification(t('validation.tokenAlert')));
      return;
    }
    if (!validName) {
      dispatch(makeAlertNotification(t('validation.alertIdName')));
      return;
    }
    if (!validPhone) {
      dispatch(makeAlertNotification(t('validation.alertIdPhone')));
    }
    if (!validAddress) {
      dispatch(makeAlertNotification(t('validation.alertIdAddress')));
    }
    const credentials = {
      name: nameRedux,
      phone: phoneRedux,
      address: tariffRedux,
    };
    const tariff = {
      name: currentTariff.name,
      cost: currentTariff.cost,
      speed: currentTariff.speed,
    };

    if (token) {
      dispatch(sendTariffs(tariff, credentials, token));
      return;
    }
  };

  const handleOnChangeName = ({ target: { value } }) => {
    dispatch(setNameAction(value));
    setValidName(value);
  };
  const handleOnChangePhone = ({ target: { value } }) => {
    dispatch(setPhoneAction(value));
    setValidPhone(value);
  };
  const handleOnChangeAddress = ({ target: { value } }) => {
    dispatch(setAddressAction(value));
    setValidAddress(value);
  };

  return isMobile ? (
    <Scrollbars autoHeight={true} autoHeightMin={640} autoHide={true}>
      <div>
        {load ? (
          <Loaders />
        ) : (
          <form className={styles.form} onSubmit={handlerOnSubmit}>
            <div className={styles.tariff}>
              <MyInput
                disabled
                label={t('tariffs_title.cost')}
                defaultValue={currentTariff.cost}
                size="small"
              />
              <MyInput
                disabled
                label={t('tariffs_title.speed')}
                defaultValue={currentTariff.speed}
                size="small"
              />
              <MyInput
                disabled
                label={t('tariffs_title.package')}
                defaultValue={currentTariff.name}
                size="small"
              />
            </div>

            <div className={styles.abonent}>
              <MyInput
                type="text"
                value={nameRedux}
                onChange={handleOnChangeName}
                label={t('form.yourName')}
                size="medium"
              />
              <p
                className={classNames(
                  styles.validation,
                  validName && styles.valid
                )}
              >
                {validName
                  ? t('validation.valid')
                  : t('validation.invalidField')}
              </p>
              <MyInput
                type="text"
                value={phoneRedux}
                onChange={handleOnChangePhone}
                label={t('form.yourPhone')}
                size="medium"
              />
              <p
                className={classNames(
                  styles.validation,
                  validPhone && styles.valid
                )}
              >
                {validPhone
                  ? t('validation.valid')
                  : t('validation.invalidField')}
              </p>
              <MyInput
                type="text"
                value={tariffRedux}
                onChange={handleOnChangeAddress}
                label={t('form.yourAddress')}
                size="medium"
              />
              <p
                className={classNames(
                  styles.validation,
                  validAddress && styles.valid
                )}
              >
                {validAddress
                  ? t('validation.valid')
                  : t('validation.invalidField')}
              </p>
            </div>

            <div className={styles.containerBtn}>
              <MyButton
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                styles="servicesSended"
              >
                {t('ui.send')}
              </MyButton>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.REACT_APP_GOOGLE_KEY}
                onChange={(token) => setToken(token)}
                onExpired={() => setToken('')}
                size={isMobile ? 'compact' : 'normal'}
                hl={t('recapchaHL')}
              />
            </div>
          </form>
        )}
      </div>
    </Scrollbars>
  ) : (
    <div className={load && styles.loadingCenter}>
      {load ? (
        <Loaders position={'none'} />
      ) : (
        <form className={styles.form} onSubmit={handlerOnSubmit}>
          <div className={styles.tariff}>
            <MyInput
              disabled
              label={t('tariffs_title.cost')}
              defaultValue={currentTariff.cost}
              size="small"
            />
            <MyInput
              disabled
              label={t('tariffs_title.speed')}
              defaultValue={currentTariff.speed}
              size="small"
            />
            <MyInput
              disabled
              label={t('tariffs_title.package')}
              defaultValue={currentTariff.name}
              size="small"
            />
          </div>

          <div className={styles.abonent}>
            <MyInput
              type="text"
              value={nameRedux}
              onChange={handleOnChangeName}
              label={t('form.yourName')}
              size="medium"
            />
            <p
              className={classNames(
                styles.validation,
                validName && styles.valid
              )}
            >
              {validName ? t('validation.valid') : t('validation.invalidField')}
            </p>
            <MyInput
              type="text"
              value={phoneRedux}
              onChange={handleOnChangePhone}
              label={t('form.yourPhone')}
              size="medium"
            />
            <p
              className={classNames(
                styles.validation,
                validPhone && styles.valid
              )}
            >
              {validPhone
                ? t('validation.valid')
                : t('validation.invalidField')}
            </p>
            <MyInput
              type="text"
              value={tariffRedux}
              onChange={handleOnChangeAddress}
              label={t('form.yourAddress')}
              size="medium"
            />
            <p
              className={classNames(
                styles.validation,
                validAddress && styles.valid
              )}
            >
              {validAddress
                ? t('validation.valid')
                : t('validation.invalidField')}
            </p>
          </div>

          <div className={styles.containerBtn}>
            <MyButton
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              styles="servicesSended"
            >
              {t('ui.send')}
            </MyButton>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.REACT_APP_GOOGLE_KEY}
              onChange={(token) => setToken(token)}
              onExpired={() => setToken('')}
              size={isMobile ? 'compact' : 'normal'}
              hl={t('recapchaHL')}
            />
          </div>
        </form>
      )}
    </div>
  );
}
