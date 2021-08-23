import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import useToggle from '../../../../hooks/useToggle';
import useTitle from '../../../../hooks/useTitle';
import useIsMobile from '../../../../hooks/useMobile';
import { useTranslation } from 'react-i18next';
import '../../../../utils/i18next';

import ServicesItemShop from './ShopItems/ServicesItemShop';
import { cartSelector } from '../../../../redux/shop/shopSelectors';
import { idFlipSelector } from '../../../../redux/fliped/flipedSelector';

import {
  getAddressSelector,
  getNameSelector,
  getPhoneSelector,
} from '../../../../redux/tarrifs/tariffSelectors';
import { isAnyModalOpenSelector } from '../../../../redux/modal/modalSelectors';
import {
  setNameAction,
  setPhoneAction,
  setAddressAction,
} from '../../../../redux/tarrifs/tariffsAction';
import { makeAlertNotification } from '../../../../redux/notifications/notificationOperations';
import {
  setCurrentIdFlip,
  removeCurrentIdFlip,
} from '../../../../redux/fliped/flipedAction';
import { sendServices } from '../../../../redux/services/servicesOperations';

import { Scrollbars } from 'rc-scrollbars';
import ReactCardFlip from 'react-card-flip';
import MyInput from '../../../../common/MyInput/MyInput';
import MyButton from '../../../../common/MyButton/MyButton';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import ReCAPTCHA from 'react-google-recaptcha';

import styles from './ShopElemets.module.css';
import Loaders from '../../../Loader/Loader';
import { loadingSelector } from '../../../../redux/loader/loaderSelector';
import useValiadField from '../../../../hooks/useValidateField';

export default function ShopElements() {
  const [totalPriceOnePay, setTotalPriceOnePay] = useState(0);
  const [totalPriceAtMonth, setTotalPriceAtMonth] = useState(0);
  const [totalItemsAtMonth, setTotalItemsAtMonth] = useState(0);
  const [totalItemsOnePay, setTotalItemsOnePay] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [token, setToken] = useState('');

  const [validName, setValidName] = useValiadField();
  const [validPhone, setValidPhone] = useValiadField();
  const [validAddress, setValidAddress] = useValiadField();

  const [isFlip, onFlip] = useToggle();

  const nameRedux = useSelector(getNameSelector);
  const phoneRedux = useSelector(getPhoneSelector);
  const tariffRedux = useSelector(getAddressSelector);
  const isAnyModalOpen = useSelector(isAnyModalOpenSelector);
  const load = useSelector(loadingSelector);
  const idButtonForStyles = useRef('buttonNextShop');
  const flipId = useSelector(idFlipSelector(idButtonForStyles.current));

  const cart = useSelector(cartSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useTitle('Корзина || Fullinet');
  const isMobile = useIsMobile();
  const recaptchaRef = React.useRef();

  useEffect(() => {
    return () => {
      if (!isAnyModalOpen) {
        dispatch(removeCurrentIdFlip(idButtonForStyles.current));
      }
    };
  }, [dispatch, isAnyModalOpen]);
  useEffect(() => {
    setValidName(nameRedux);
    setValidPhone(phoneRedux);
    setValidAddress(tariffRedux);
  }, [nameRedux, phoneRedux, tariffRedux]);
  useEffect(() => {
    let itemsOnePay = 0;
    let priceOnePay = 0;

    let itemsAtMonth = 0;
    let priceAtMonth = 0;

    cart.forEach((item) => {
      if (item.onMonth === 'true') {
        itemsAtMonth += item.qty;
        priceAtMonth += item.qty * item.price;

        setTotalPriceAtMonth(priceAtMonth);
        setTotalItemsAtMonth(itemsAtMonth);
      }
      if (item.onMonth === 'false') {
        itemsOnePay += item.qty;
        priceOnePay += item.qty * item.price;

        setTotalPriceOnePay(priceOnePay);
        setTotalItemsOnePay(itemsOnePay);
      }
      setTotalItems(totalItemsAtMonth + totalItemsOnePay);
    });
  }, [
    cart,
    totalPriceOnePay,
    totalPriceAtMonth,
    totalItemsAtMonth,
    totalItemsOnePay,
  ]);

  console.log(token);
  const handlerOnSubmit = (e) => {
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
    const servicesToSend = cart.map((item) => {
      return {
        alt: item.alt,
        qty: item.qty,
        price: item.price,
        details_price: item.detailsPrice,
      };
    });
    const totalInfoToSend = {
      totalPriceOnePay: totalPriceOnePay,
      totalPriceAtMonth: totalPriceAtMonth,
      totalItemsAtMonth: totalItemsAtMonth,
      totalItemsOnePay: totalItemsOnePay,
      totalItems: totalItems,
    };
    if (token) {
      dispatch(
        sendServices(servicesToSend, credentials, totalInfoToSend, token)
      );
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
  const handleOnClickNext = (e) => {
    onFlip();
    dispatch(setCurrentIdFlip(e.target.id));
  };
  const handleOnClickPrev = (e) => {
    onFlip();
    dispatch(removeCurrentIdFlip(e.target.id));
  };

  const styleWhenFliped = useRef({
    display: 'grid',
  });
  const styleWhenFlipedFront = useRef({
    display: 'none',
  });
  return (
    <ReactCardFlip
      isFlipped={flipId && flipId.id === idButtonForStyles.current}
      flipDirection="horizontal"
    >
      <section
        style={
          isMobile && flipId && flipId.id === idButtonForStyles.current
            ? styleWhenFlipedFront.current
            : {}
        }
      >
        <h2 className={styles.title}>Ваша корзина</h2>

        <div className={styles.price_container}>
          <p className={styles.price}>
            {t('shop.month_pay_price')}
            <span>{totalPriceAtMonth}грн.</span>
          </p>
          <p className={styles.price}>
            {t('shop.one_pay_price')}
            <span>{totalPriceOnePay}грн.</span>
          </p>
          <p className={styles.price}>
            {t('shop.total_services')} <span>{totalItems}</span>
          </p>
          <div className={styles.container_details_btn}>
            <MyButton
              styles="services"
              id={idButtonForStyles.current}
              onClick={(e) => handleOnClickNext(e)}
            >
              <span id={idButtonForStyles.current}>{t('ui.order')}</span>
            </MyButton>
          </div>
        </div>

        <div className={styles.container}>
          <div>
            {cart.length <= 0 && (
              <p className={styles.cart_empty}>{t('shop.cart_empty')}</p>
            )}
            {cart.length > 0 &&
              cart.map((item) => {
                return <ServicesItemShop key={item._id} itemDate={item} />;
              })}
          </div>
        </div>
      </section>

      {!isMobile ? (
        <section
          className={classNames(
            styles.sectionForm,
            load && styles.loadingStyle
          )}
          style={
            isMobile && flipId && flipId.id === idButtonForStyles.current
              ? styleWhenFliped.current
              : {}
          }
        >
          {load ? (
            <Loaders position={'none'} />
          ) : (
            <form className={styles.form} onSubmit={handlerOnSubmit}>
              <div className={styles.abonent}>
                <MyInput
                  type="text"
                  value={nameRedux}
                  onChange={handleOnChangeName}
                  label={t('form.yourName')}
                  size="small"
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
                  size="small"
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
                  size="small"
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
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.REACT_APP_GOOGLE_KEY}
                  onChange={(token) => setToken(token)}
                  onExpired={() => setToken('')}
                  size={isMobile ? 'compact' : 'normal'}
                  hl={t('recapchaHL')}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  endIcon={<SendIcon />}
                >
                  {t('ui.send')}
                </Button>
              </div>
            </form>
          )}
          {!load && (
            <div className={styles.price_container_fliped}>
              <p className={styles.price}>
                {t('shop.month_pay_price')}
                <span>{totalPriceAtMonth}грн.</span>
              </p>
              <p className={styles.price}>
                {t('shop.one_pay_price')}
                <span>{totalPriceOnePay}грн.</span>
              </p>
              <p className={styles.price}>
                {t('shop.total_services')} <span>{totalItems}</span>
              </p>
            </div>
          )}

          {!load && (
            <div className={styles.container_buttonForm}>
              <MyButton
                styles="services"
                id={idButtonForStyles.current}
                onClick={handleOnClickPrev}
              >
                <span id={idButtonForStyles.current}>{t('ui.back')}</span>
              </MyButton>
            </div>
          )}
        </section>
      ) : (
        <Scrollbars
          autoHeight={true}
          autoHeightMin={isMobile ? 773 : 675}
          autoHide={true}
        >
          <section
            className={classNames(
              styles.sectionForm,
              load && styles.loadingStyle
            )}
            style={
              isMobile && flipId && flipId.id === idButtonForStyles.current
                ? styleWhenFliped.current
                : {}
            }
          >
            {load ? (
              <Loaders position={'none'} />
            ) : (
              <form className={styles.form} onSubmit={handlerOnSubmit}>
                <div className={styles.abonent}>
                  <MyInput
                    type="text"
                    value={nameRedux}
                    onChange={handleOnChangeName}
                    label={t('form.yourName')}
                    size="small"
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
                    size="small"
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
                    size="small"
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
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.REACT_APP_GOOGLE_KEY}
                    onChange={(token) => setToken(token)}
                    onExpired={() => setToken('')}
                    size={isMobile ? 'compact' : 'normal'}
                    hl={t('recapchaHL')}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    endIcon={<SendIcon />}
                  >
                    {t('ui.send')}
                  </Button>
                </div>
              </form>
            )}

            {!load && (
              <div className={styles.price_container_fliped}>
                <p className={styles.price}>
                  {t('shop.month_pay_price')}
                  <span>{totalPriceAtMonth}грн.</span>
                </p>
                <p className={styles.price}>
                  {t('shop.one_pay_price')}
                  <span>{totalPriceOnePay}грн.</span>
                </p>
                <p className={styles.price}>
                  {t('shop.total_services')} <span>{totalItems}</span>
                </p>
              </div>
            )}
            {!load && (
              <div className={styles.container_buttonForm}>
                <MyButton
                  styles="services"
                  id={idButtonForStyles.current}
                  onClick={handleOnClickPrev}
                >
                  <span id={idButtonForStyles.current}>{t('ui.back')}</span>
                </MyButton>
              </div>
            )}
          </section>
        </Scrollbars>
      )}
    </ReactCardFlip>
  );
}
