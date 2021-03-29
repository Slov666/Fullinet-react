import React from 'react';
import styles from './Footer.module.css';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

import visa from '../../assets/img/visa.png';
import masterCard from '../../assets/img/masterCard.png';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={styles.contanier}>
      <article>
        <p>
          <a
            className={styles.linkVitalik}
            rel="noreferrer"
            target="_blank"
            href="https://www.facebook.com/Fullinet-1409833259236644"
          >
            {t('links.link_Vitalik', { dateNow: new Date().getFullYear() })}
          </a>
        </p>
        <a
          className={styles.myLink}
          rel="noreferrer"
          target="_blank"
          href="https://www.facebook.com/slavik.ogorodnyk"
        >
          {t('links.link_Slavik')}
        </a>
      </article>

      <img src={visa} alt="visa" className={styles.imgVisa} />
      <img src={masterCard} alt="masterCard" className={styles.imgMasterCard} />
    </footer>
  );
}
