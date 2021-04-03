import React, { useEffect, useState } from 'react';
import styles from './ServicesItemShop.module.css';
import Image from '../../../../../common/Image/Image';
import RemoveSVG from '../../../../../common/IconSvg/RemoveSVG';

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

  const [totalCost, setTotalCost] = useState(0);
  const cost = Number(itemDate.price);

  useEffect(() => {
    let total = cost * itemDate.qty;
    setTotalCost(total);
  }, [cost, itemDate.qty, totalCost]);

  return isMobile ? (
    <li className={styles.container}>
      <div className={styles.container_desc}>
        <h3>{t(itemDate.title)}</h3>
        <p>{t(itemDate.descriptions)}</p>
        <p className={styles.price}>
          {totalCost} <span>{t(itemDate.detailsPrice)}</span>
        </p>
      </div>

      <div className={styles.container_btnAndIcon}>
        <div className={styles.icon}>
          <Image src={t(itemDate.icon)} alt="services" size="shop_size" />
        </div>

        <div className={styles.container_bth}>
          <button
            className={styles.plus}
            onClick={() => dispatch(increment(itemDate._id))}
          >
            +
          </button>
          <p className={styles.qty}>{`${itemDate.qty}`}</p>
          <button
            className={styles.minus}
            onClick={() => dispatch(decrement(itemDate._id))}
          >
            -
          </button>

          <RemoveSVG onClick={() => dispatch(removeFromCart(itemDate._id))} />
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
          {totalCost} <span>{t(itemDate.detailsPrice)}</span>
        </p>
      </div>
      <div className={styles.container_bth}>
        <button
          className={styles.plus}
          onClick={() => dispatch(increment(itemDate._id))}
        >
          +
        </button>
        <p className={styles.qty}>{`${itemDate.qty}`}</p>
        <button
          className={styles.minus}
          onClick={() => dispatch(decrement(itemDate._id))}
        >
          -
        </button>
        <RemoveSVG onClick={() => dispatch(removeFromCart(itemDate._id))} />
      </div>
    </li>
  );
}
