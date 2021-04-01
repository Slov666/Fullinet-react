import React, { useEffect } from 'react';
import styles from './ServicesShop.module.css';
import Image from '../../../../../common/Image/Image';

import '../../../../../utils/i18next';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import useMobile from '../../../../../hooks/useMobile';

import {
  removeFromCart,
  increment,
  decrement,
} from '../../../../../redux/shop/shopActions';

export default function ServicesItemShop({ itemDate }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = useMobile();

  // useEffect(() => {
  //   if (itemDate.qty === 0) dispatch(removeFromCart(itemDate._id));
  // }, [dispatch, itemDate._id, itemDate.qty]);

  return isMobile ? (
    <li className={styles.container}>
      <div className={styles.container_desc}>
        <h3>{t(itemDate.title)}</h3>
        <p>{t(itemDate.descriptions)}</p>
        <p className={styles.price}>
          {t(itemDate.price)} <span>{t(itemDate.detailsPrice)}</span>
        </p>
      </div>

      <div className={styles.container_btnAndIcon}>
        <div className={styles.icon}>
          <Image src={t(itemDate.icon)} alt="services" size="shop_size" />
        </div>

        <div className={styles.container_bth}>
          <button onClick={() => dispatch(increment(itemDate._id))}>+</button>
          <p className={styles.qty}>{`${itemDate.qty}`}</p>
          <button onClick={() => dispatch(decrement(itemDate._id))}>-</button>
          <button onClick={() => dispatch(removeFromCart(itemDate._id))}>
            Видалити
          </button>
        </div>
      </div>
    </li>
  ) : (
    <li className={styles.container}>
      <div className={styles.icon}>
        <Image src={t(itemDate.icon)} alt="services" size="shop_size" />
      </div>

      <div className={styles.container_desc}>
        <h3>{t(itemDate.title)}</h3>
        <p>{t(itemDate.descriptions)}</p>
        <p className={styles.price}>
          {t(itemDate.price)} <span>{t(itemDate.detailsPrice)}</span>
        </p>
      </div>
      <div className={styles.container_bth}>
        <button onClick={() => dispatch(increment(itemDate._id))}>+</button>
        <p className={styles.qty}>{`${itemDate.qty}`}</p>
        <button onClick={() => dispatch(decrement(itemDate._id))}>-</button>
        <button onClick={() => dispatch(removeFromCart(itemDate._id))}>
          Видалити
        </button>
      </div>
    </li>
  );
}
