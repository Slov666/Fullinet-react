import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ServicesItemShop from './ShopItems/ServicesItemShop';
import { cartSelector } from '../../../../redux/shop/shopSelectors';
import  useIsMobile  from '../../../../hooks/useMobile';

import { useTranslation } from 'react-i18next';
import '../../../../utils/i18next';

import { Scrollbars } from 'rc-scrollbars';

import styles from './ShopElemets.module.css';

export default function ShopElements() {
  const [totalPriceOnePay, setTotalPriceOnePay] = useState(0);
  const [totalPriceAtMonth, setTotalPriceAtMonth] = useState(0);
  const [totalItemsAtMonth, setTotalItemsAtMonth] = useState(0);
  const [totalItemsOnePay, setTotalItemsOnePay] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const cart = useSelector(cartSelector);
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
    <Scrollbars
      autoHeight={true}
      autoHeightMin={isMobile ? 810 : 675}
      autoHide={true}
    >
      <section>
        <h2 className={styles.title}>Ваша корзина </h2>
        <div className={styles.container}>
          <div>
            {cart.length <= 0 && <p>Ваша корзина порожня</p>}
            {cart.length > 0 &&
              cart.map((item) => {
                return <ServicesItemShop key={item._id} itemDate={item} />;
              })}
          </div>

          <div className={styles.price_container}>
            <p className={styles.price}>
              Ціна в місяць:<span>{totalPriceAtMonth}грн.</span>
            </p>
            <p className={styles.price}>
              Ціна єдиноразовим платежем:<span>{totalPriceOnePay}грн.</span>
            </p>
            <p className={styles.price}>
              Загальна кількість послуг: <span>{totalItems}</span>
            </p>
          </div>
        </div>
      </section>
    </Scrollbars>
  );
}
