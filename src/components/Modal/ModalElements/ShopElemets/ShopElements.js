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
import { modalShopSelector } from '../../../../redux/modal/modalSelectors';

import {
  getAddressSelector,
  getNameSelector,
  getPhoneSelector,
} from '../../../../redux/tarrifs/tariffSelectors';
import {
  setNameAction,
  setPhoneAction,
  setAddressAction,
} from '../../../../redux/tarrifs/tariffsAction';
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

export default function ShopElements() {
  const [totalPriceOnePay, setTotalPriceOnePay] = useState(0);
  const [totalPriceAtMonth, setTotalPriceAtMonth] = useState(0);
  const [totalItemsAtMonth, setTotalItemsAtMonth] = useState(0);
  const [totalItemsOnePay, setTotalItemsOnePay] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [token, setToken] = useState('');
  const [validName, setValidName] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validAddress, setValidAddress] = useState(false);

  const [isFlip, onFlip] = useToggle();

  const nameRedux = useSelector(getNameSelector);
  const phoneRedux = useSelector(getPhoneSelector);
  const tariffRedux = useSelector(getAddressSelector);
  const modalShopStatus = useSelector(modalShopSelector);

  const idButtonForStyles = useRef('buttonNextShop');
  const flipId = useSelector(idFlipSelector(idButtonForStyles.current));

  const cart = useSelector(cartSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useTitle('Корзина');
  const isMobile = useIsMobile();
  const recaptchaRef = React.useRef();

  useEffect(() => {
    return () => {
      dispatch(removeCurrentIdFlip(idButtonForStyles.current));
    };
  }, []);
  useEffect(() => {
    if (nameRedux && nameRedux.length >= 2) setValidName(true);
    if (nameRedux && nameRedux.length < 2) setValidName(false);

    if (phoneRedux && phoneRedux.length > 8) setValidPhone(true);
    if (phoneRedux && phoneRedux.length < 8) setValidPhone(false);

    if (tariffRedux && tariffRedux.length >= 5) setValidAddress(true);
    if (tariffRedux && tariffRedux.length < 5) setValidAddress(false);
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
  const handlerOnSubmit = async (e) => {
    e.preventDefault();
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
    if (value.length >= 2) setValidName(true);
    if (value.length < 2) setValidName(false);
  };
  const handleOnChangePhone = ({ target: { value } }) => {
    dispatch(setPhoneAction(value));
    if (value.length > 8) setValidPhone(true);
    if (value.length < 8) setValidPhone(false);
  };
  const handleOnChangeAddress = ({ target: { value } }) => {
    dispatch(setAddressAction(value));
    if (value.length >= 5) setValidAddress(true);
    if (value.length < 5) setValidAddress(false);
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
    <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
      <section style={
            isMobile && flipId && flipId.id === idButtonForStyles.current
              ? styleWhenFlipedFront.current
              : {}}>
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
          className={styles.sectionForm}
          style={
            isMobile && flipId && flipId.id === idButtonForStyles.current
              ? styleWhenFliped.current
              : {}}
        >
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
                  : t('validation.invalidName')}
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
                  : t('validation.invalidPhone')}
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
                  : t('validation.invalidAddress')}
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
          <div className={styles.container_buttonForm}>
            <MyButton
              styles="services"
              id={idButtonForStyles.current}
              onClick={handleOnClickPrev}
            >
              <span id={idButtonForStyles.current}>{t('ui.back')}</span>
            </MyButton>
          </div>
        </section>
      ) : (
        <Scrollbars
          autoHeight={true}
          autoHeightMin={isMobile ? 773 : 675}
          autoHide={true}
        >
          <section
            className={styles.sectionForm}
            style={
              isMobile && flipId && flipId.id === idButtonForStyles.current
                ? styleWhenFliped.current
                : {}
            }
          >
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
                    : t('validation.invalidName')}
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
                    : t('validation.invalidPhone')}
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
                    : t('validation.invalidAddress')}
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
            <div className={styles.container_buttonForm}>
              <MyButton
                styles="services"
                id={idButtonForStyles.current}
                onClick={handleOnClickPrev}
              >
                <span id={idButtonForStyles.current}>{t('ui.back')}</span>
              </MyButton>
            </div>
          </section>
        </Scrollbars>
      )}
    </ReactCardFlip>
  );
}
