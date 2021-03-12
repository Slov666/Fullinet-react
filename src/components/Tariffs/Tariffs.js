import React from 'react';
import styles from './Tariffs.module.css';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

import TariffItem from './TariffItem';
import { NavLink } from 'react-router-dom';
import { logDOM } from '@testing-library/dom';

export default function TableTariffs() {
  const { t } = useTranslation();
  const tariffs = t('tariffs', { returnObjects: true });
  return (
    <>
      <main className={styles.container}>
        {tariffs.map(({ name, cost, speed, id }, index) => (
          <>
            {index === 0 && <p>{t('tariffs_title.title_wifi')}</p>}
            {index === 3 && <p>{t('tariffs_title.title_Vita')}</p>}
            {index === 6 && <p>{t('tariffs_title.title_Pirogiv')}</p>}
            {index === 9 && <p>{t('tariffs_title.title_Damba')}</p>}
            <NavLink
              key={id}
              to={{
                pathname: `/tariff`,
                search: `?id=${id}`,
                state: { from: '/tariffs' },
              }}
            >
              <TariffItem name={name} cost={cost} speed={speed} />
            </NavLink>
          </>
        ))}
      </main>
    </>
  );
}
