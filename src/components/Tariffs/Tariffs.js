import React, { useRef } from 'react';
import styles from './Tariffs.module.css';
import { CSSTransition } from 'react-transition-group';
import animate from './animate.module.css';
import '../../utils/i18next';

import { useSelector } from 'react-redux';
import useMobile from '../../hooks/useMobile';
import useToggle from '../../hooks/useToggle';
import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';

import DropMenu from '../../common/DropMenu/DropMenu';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import TariffItem from './TariffItem';

export default function TableTariffs() {
  const { t } = useTranslation();
  useTitle(t('nav.main'));
  const tariffs = t('tariffs', { returnObjects: true });

  const [notIncluded, onClicknotIncluded] = useToggle();
  const [aboutMore, onClickAboutMore] = useToggle();

  return (
    <main className={styles.container}>
      <section className={styles.container_tarrifs}>
        {tariffs.map(({ name, cost, speed, about_wifi, id }, index) => (
          <React.Fragment key={id}>
            {index === 0 && (
              <p className={styles.titleOfTariffs}>
                <span>{t('tariffs_title.title_wifi')}</span>
              </p>
            )}
            {index === 3 && (
              <p className={styles.titleOfTariffs}>
                <span> {t('tariffs_title.title_Vita')}</span>
              </p>
            )}
            {index === 7 && (
              <p className={styles.titleOfTariffs}>
                <span>{t('tariffs_title.title_Pirogiv')}</span>
              </p>
            )}
            {index === 11 && (
              <p className={styles.titleOfTariffs}>
                <span> {t('tariffs_title.title_Damba')}</span>
              </p>
            )}
            {index === 14 && (
              <p className={styles.titleOfTariffs}>
                <span> {t('tariffs_title.title_Novi_Bezradichi')}</span>
              </p>
            )}
            {index === 18 && (
              <p className={styles.titleOfTariffs}>
                <span> {t('tariffs_title.title_Green_wood')}</span>
              </p>
            )}

            <TariffItem
              //this flipped list
              key={`card-${index}`}
              name={name}
              cost={cost}
              speed={speed}
              about_wifi={about_wifi}
              id={id}
            />
          </React.Fragment>
        ))}
      </section>
      <div>
        <DropMenu
          onClick={onClickAboutMore}
          click={aboutMore}
          title={t('about.title')}
        >
          <ul className={styles.notIncluded_ul}>
            <li>{t('about.part1')}</li>
            <li>{t('about.part2')}</li>
            <li>{t('about.part3')}</li>
            <li>{t('about.part4')}</li>
            <li>{t('about.part5')}</li>
            <li>{t('about.part6')}</li>
            <li>{t('about.part7')}</li>
          </ul>
        </DropMenu>
      </div>

      <div className={styles.container_dropMenu}>
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
      </div>
    </main>
  );
}
