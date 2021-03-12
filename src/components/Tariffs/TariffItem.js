import React from 'react';
import styles from './Tariffs.module.css';

import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

export default function TariffItem({ cost, speed, name }) {
  const { t } = useTranslation();

  return (
    <div className={styles.card__container}>
      <div className={styles.card__title}>
        <p className={styles.card__title__cost}>
          {t(cost)}
          <span className={styles.card__title__span}>
            {t('tariffs_title.cost_grn')}
          </span>
        </p>
        <p className={styles.card__title__package}>{t(name)}</p>
      </div>

      <div className={styles.card__speed}>
        <p className={styles.card__speed__title}>{t('tariffs_title.speed')}</p>
        <p className={styles.card__speed__title}>{t(speed)}</p>
      </div>
    </div>
  );
}
