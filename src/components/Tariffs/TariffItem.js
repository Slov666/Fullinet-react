import React, { useRef } from 'react';
import styles from './Tariffs.module.css';

import useMobile from '../../hooks/useMobile';
import useToggle from '../../hooks/useToggle';
import { useDispatch } from 'react-redux';

import { setModalConnect } from '../../redux/modal/modalAction';

import { Scrollbars } from 'rc-scrollbars';
import ReactCardFlip from 'react-card-flip';
import MyButton from '../../common/MyButton/MyButton';

import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

export default function TariffItem({
  cost,
  speed,
  name,
  about_wifi,
}) {
  const { t } = useTranslation();
  const [isFlip, onFlip] = useToggle();

  const dispatch = useDispatch();
  const isMobile = useMobile();
  const styleWhenNotFliped = useRef({
    padding: '0px 0px 50px 0px',
  });
  console.log(!isFlip ? styleWhenNotFliped.current : {});

  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
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
          <div>
            <p className={styles.card__speed__title}>
              {t('tariffs_title.speed')}
            </p>
            <p className={styles.card__speed__title}>{t(speed)}</p>
          </div>
          <div className={styles.container__buttons}>
            <MyButton styles="tariffs" onClick={onFlip}>
              {t('ui.details')}
            </MyButton>
            <MyButton
              styles="tariffs"
              onClick={() => dispatch(setModalConnect({ cost, speed, name }))}
              variant="contained"
            >
              {t('ui.order')}
            </MyButton>
          </div>
        </div>
      </div>

      <div className={styles.card__container_flipped}>
        {about_wifi ? (
          <>
            <div className={styles.buttonContainer}>
              <MyButton styles="tariffs" onClick={onFlip}>
                {t('ui.back')}
              </MyButton>
            </div>
            <h4>
              {t('tariffs_title.wifi')} <br />
              3000 - 4000 грн
            </h4>
            <ul className={styles.card__container_ul}>
              <li>{t(about_wifi.l1)}</li>
              <li>{t(about_wifi.l2)}</li>
              <li>{t(about_wifi.l3)}</li>
              <li>{t(about_wifi.l4)}</li>
              <li>{t(about_wifi.l5)}</li>
              <li>{t(about_wifi.l6)}</li>
              <li>{t(about_wifi.l7)}</li>
              <li>{t(about_wifi.l8)}</li>
              <li>{t(about_wifi.l9)}</li>
              <li>{t(about_wifi.l10)}</li>
            </ul>
          </>
        ) : (
          <>
            <div className={styles.buttonContainer}>
              <MyButton styles="tariffs" onClick={onFlip}>
                {t('ui.back')}
              </MyButton>
            </div>
            {isMobile ? (
              <ul
                className={styles.card__container_ul}
                style={!isFlip ? styleWhenNotFliped.current : {}}
              >
                <li>{t('tariffs_title.optical_internet.l1')}</li>
                <li>{t('tariffs_title.optical_internet.l2')}</li>
                <li>{t('tariffs_title.optical_internet.l3')}</li>
                <li>{t('tariffs_title.optical_internet.l4')}</li>
                <li>{t('tariffs_title.optical_internet.l5')}</li>
                <li>{t('tariffs_title.optical_internet.l6')}</li>
              </ul>
            ) : (
              <Scrollbars autoHeight={true} autoHeightMin={350} autoHide={true}>
                <ul className={styles.card__container_ul}>
                  <li>{t('tariffs_title.optical_internet.l1')}</li>
                  <li>{t('tariffs_title.optical_internet.l2')}</li>
                  <li>{t('tariffs_title.optical_internet.l3')}</li>
                  <li>{t('tariffs_title.optical_internet.l4')}</li>
                  <li>{t('tariffs_title.optical_internet.l5')}</li>
                  <li>{t('tariffs_title.optical_internet.l6')}</li>
                </ul>
              </Scrollbars>
            )}
          </>
        )}
      </div>
    </ReactCardFlip>
  );
}
