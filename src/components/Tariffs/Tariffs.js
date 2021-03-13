import React from 'react';
import styles from './Tariffs.module.css';
import { CSSTransition } from 'react-transition-group';
import animate from './animate.module.css';
import useToggle from '../../hooks/useToggle';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import TariffItem from './TariffItem';
import { NavLink } from 'react-router-dom';
export default function TableTariffs() {
  const { t } = useTranslation();
  const tariffs = t('tariffs', { returnObjects: true });

  const [notIncluded, onClicknotIncluded] = useToggle();
  return (
    <main className={styles.container}>
      {tariffs.map(({ name, cost, speed, about_wifi, id }, index) => (
        <>
          {index === 0 && (
            <p className={styles.titleOfTariffs}>
              {t('tariffs_title.title_wifi')}
            </p>
          )}
          {index === 3 && (
            <p className={styles.titleOfTariffs}>
              {t('tariffs_title.title_Vita')}
            </p>
          )}
          {index === 6 && (
            <p className={styles.titleOfTariffs}>
              {t('tariffs_title.title_Pirogiv')}
            </p>
          )}
          {index === 9 && (
            <p className={styles.titleOfTariffs}>
              {t('tariffs_title.title_Damba')}
            </p>
          )}
          {/* <NavLink
              className={styles.card_container_link}
              key={id}
              to={{
                pathname: `/tariff`,
                search: `?id=${id}`,
                state: { from: '/tariffs' },
              }}
            > */}
          {/* </NavLink> */}

          <TariffItem
            //this flipped list
            key={`card-${index}`}
            name={name}
            cost={cost}
            speed={speed}
            about_wifi={about_wifi}
          />
        </>
      ))}

      <p onClick={onClicknotIncluded} className={styles.notIncluded}>
        <span> {t('tariffs_title.notIncluded.title')}</span>
        <IconButton onClick={() => onClicknotIncluded}>
          <MenuIcon />
        </IconButton>
      </p>
      <CSSTransition
        in={notIncluded}
        timeout={300}
        classNames={animate}
        unmountOnExit
      >
        <>
          {notIncluded && (
            <ul className={styles.notIncluded_ul}>
              <li>{t('tariffs_title.notIncluded.l1')}</li>
              <li>{t('tariffs_title.notIncluded.l2')}</li>
              <li>{t('tariffs_title.notIncluded.l3')}</li>
            </ul>
          )}
        </>
      </CSSTransition>
    </main>
  );
}
