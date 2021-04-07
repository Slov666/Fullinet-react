import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { useSelector } from 'react-redux';
import useToggle from '../../../../hooks/useToggle';

import ServicesItemShop from './ShopItems/ServicesItemShop';
import { cartSelector } from '../../../../redux/shop/shopSelectors';
import useIsMobile from '../../../../hooks/useMobile';

import { useTranslation } from 'react-i18next';
import '../../../../utils/i18next';

import { Scrollbars } from 'rc-scrollbars';
import MyInput from '../../../../common/MyInput/MyInput';
import MyButton from '../../../../common/MyButton/MyButton';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

import styles from './ShopElemets.module.css';

export default function ShopElements() {
  const [totalPriceOnePay, setTotalPriceOnePay] = useState(0);
  const [totalPriceAtMonth, setTotalPriceAtMonth] = useState(0);
  const [totalItemsAtMonth, setTotalItemsAtMonth] = useState(0);
  const [totalItemsOnePay, setTotalItemsOnePay] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [isFlip, onFlip] = useToggle();

  const cart = useSelector(cartSelector);
  const { t } = useTranslation();
  const isMobile = useIsMobile();

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
  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
      <Scrollbars
        autoHeight={true}
        autoHeightMin={isMobile ? 773 : 675}
        autoHide={true}
      >
        <section>
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
              <MyButton styles="services" onClick={onFlip}>
                Замовити
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
      </Scrollbars>

      <section className={styles.sectionForm}>
        <form className={styles.form}>
          <div className={styles.abonent}>
            <MyInput label={t('form.yourName')} />
            <MyInput label={t('form.yourPhone')} />
            <MyInput label={t('form.yourAddress')} />
          </div>
          <div className={styles.containerBtn}>
            <Button variant="contained" color="primary" endIcon={<SendIcon />}>
              {t("ui.send")}
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
          <MyButton styles="services" onClick={onFlip}>
            {t('ui.back')}
          </MyButton>
        </div>
      </section>
    </ReactCardFlip>
  );
}
