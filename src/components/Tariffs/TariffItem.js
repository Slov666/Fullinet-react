import React, { useRef, useEffect } from 'react';
import styles from './Tariffs.module.css';

import useMobile from '../../hooks/useMobile';
import useToggle from '../../hooks/useToggle';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentIdFlip,
  removeCurrentIdFlip,
} from '../../redux/fliped/flipedAction';
import { idFlipSelector } from '../../redux/fliped/flipedSelector';


import { setModalConnect } from '../../redux/modal/modalAction';

import { Scrollbars } from 'rc-scrollbars';
import ReactCardFlip from 'react-card-flip';
import MyButton from '../../common/MyButton/MyButton';

import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

export default function TariffItem({ cost, speed, name, about_wifi, id }) {
  const { t } = useTranslation();

  const [isFlip, onFlip] = useToggle();

  const flipId = useSelector(idFlipSelector(id));

  const dispatch = useDispatch();

  const isMobile = useMobile();

  useEffect(() => {
    dispatch(removeCurrentIdFlip(id));
    return () => {
      dispatch(removeCurrentIdFlip(id));
    };
  }, [dispatch, id]);

  const handleOnClickNext = () => {
    onFlip();
    dispatch(setCurrentIdFlip(id));
  };
  const handleOnClickPrev = () => {
    onFlip();
    dispatch(removeCurrentIdFlip(id));
  };

  const styleWhenFliped = useRef({
    display: 'block',
  });

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
            <MyButton styles="tariffs" onClick={handleOnClickNext}>
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

      <div
        className={styles.card__container_flipped}
        style={
          isMobile && flipId && flipId.id === id ? styleWhenFliped.current : {}
        }
      >
        {about_wifi ? (
          <>
            <div className={styles.buttonContainer}>
              <MyButton styles="tariffs" onClick={handleOnClickPrev}>
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
            <MyButton
              styles="services"
              onClick={() => dispatch(setModalConnect({ cost, speed, name }))}
              variant="contained"
            >
              {t('ui.order')}
            </MyButton>
          </>
        ) : (
          <>
            <div className={styles.buttonContainer}>
              <MyButton styles="tariffs" onClick={handleOnClickPrev}>
                {t('ui.back')}
              </MyButton>
            </div>
            {isMobile ? (
              <>
                <ul className={styles.card__container_ul}>
                  <li>{t('tariffs_title.optical_internet.l1')}</li>
                  <li>{t('tariffs_title.optical_internet.l2')}</li>
                  <li>{t('tariffs_title.optical_internet.l3')}</li>
                  <li>{t('tariffs_title.optical_internet.l4')}</li>
                  <li>{t('tariffs_title.optical_internet.l5')}</li>
                  <li>{t('tariffs_title.optical_internet.l6')}</li>
                </ul>
                <MyButton
                  styles="services"
                  onClick={() =>
                    dispatch(setModalConnect({ cost, speed, name }))
                  }
                  variant="contained"
                >
                  {t('ui.order')}
                </MyButton>
              </>
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
