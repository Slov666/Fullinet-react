import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { addToCart } from '../../redux/shop/shopActions';

import DefaultServices from '../../assets/icon.services/DefaultServices-min.png';

import useToggle from '../../hooks/useToggle';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useMobile from '../../hooks/useMobile';

import {
  setCurrentIdFlip,
  removeCurrentIdFlip,
} from '../../redux/fliped/flipedAction';
import { idFlipSelector } from '../../redux/fliped/flipedSelector';

import { makeSuccessNotification } from '../../redux/notifications/notificationOperations';

import styles from './ServiceItem.module.css';

import Image from '../../common/Image/Image';

import { Scrollbars } from 'rc-scrollbars';

import ReactCardFlip from 'react-card-flip';
import MyButton from '../../common/MyButton/MyButton';

import '../../utils/i18next';

export default function ServiceItem({
  _id,
  title,
  descriptions,
  price,
  detailsPrice,
  icon,
  iconGoole,
  descObj,
  onMonth,
  alt,
}) {
  const { t } = useTranslation();

  const [isFlip, onFlip] = useToggle();

  const flipId = useSelector(idFlipSelector(_id));

  const dispatch = useDispatch();

  const isMobile = useMobile();

  const {
    ip,
    initiallSocket,
    equipmentDelivery,
    cableInsurance,
    cableInstallation,
    installSwitch,
    boxAssembly,
    configuringRouter,
    punchingHoles,
    additionalPatchCord,
    opricalCableInsurance,
    ConfiguringANetworkCard: ConfNetCard,
  } = descObj;

  const handlerAddToCart = () => {
    dispatch(
      addToCart({
        _id,
        title,
        descriptions,
        price,
        detailsPrice,
        icon,
        iconGoole,
        onMonth,
        alt,
      })
    );
    dispatch(makeSuccessNotification(t('shop.addToCart')));
  };

  useEffect(() => {
    dispatch(removeCurrentIdFlip(_id));
    return () => {
      dispatch(removeCurrentIdFlip(_id));
    };
  }, [dispatch, _id]);

  const handleOnClickNext = () => {
    onFlip();
    dispatch(setCurrentIdFlip(_id));
  };
  const handleOnClickPrev = () => {
    onFlip();
    dispatch(removeCurrentIdFlip(_id));
  };
  const styleWhenFliped = useRef({
    display: 'flex',
  });
  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
      <div className={styles.card__container}>
        <div className={styles.card__title}>
          <Image
            src={icon ? icon : iconGoole}
            alt={alt}
            className={styles.icons}
          />
          <p className={styles.title}>{t(title)}</p>
        </div>

        <div className={styles.secondary_container}>
          <p className={styles.descriptions}>{t(descriptions)}</p>
          <div>
            <p className={styles.price}>
              {t(price)}
              <span>{t(detailsPrice)}</span>
            </p>
          </div>

          <div className={styles.container__buttons}>
            <MyButton styles="services" onClick={handleOnClickNext}>
              {t('ui.details')}
            </MyButton>

            <MyButton
              styles="services"
              onClick={handlerAddToCart}
              variant="contained"
            >
              {t('ui.order')}
            </MyButton>
          </div>
        </div>
      </div>

      <div
        className={styles.card__container_fliped}
        style={
          isMobile && flipId && flipId.id === _id ? styleWhenFliped.current : {}
        }
      >
        <div className={styles.buttonContainer}>
          <MyButton styles="services" onClick={handleOnClickPrev}>
            {t('ui.back')}
          </MyButton>
        </div>
        {ip && isMobile && (
          <>
            <h3 className={styles.ip_description_title}>
              {t(ip.description_title_1)}
            </h3>
            <p>{t(ip.description_subtitle_1)}</p>
            <p>{t(ip.description_subtitle_2)}</p>
            <p>{t(ip.description_subtitle_3)}</p>
            <p>{t(ip.description_subtitle_4)}</p>
            <h3 className={styles.ip_description_title}>
              {t(ip.description_title_2)}
            </h3>
            <p>{t(ip.description_subtitle_5)}</p>
            <p>{t(ip.description_subtitle_6)}</p>
            <ul className={styles.card__container_ul}>
              <li>{t(ip.description_subtitle_l1)}</li>
              <li>{t(ip.description_subtitle_l2)}</li>
              <li>{t(ip.description_subtitle_l3)}</li>
              <li>{t(ip.description_subtitle_l4)}</li>
            </ul>
            <p className={styles.text_center}>{t(ip.description_subtitle_8)}</p>
            <p className={styles.text_center}>{t(ip.description_subtitle_7)}</p>
            <div className={styles.order}>
              <MyButton
                styles="services"
                onClick={handlerAddToCart}
                variant="contained"
              >
                {t('ui.order')}
              </MyButton>
            </div>
          </>
        )}
        {ip && !isMobile && (
          <Scrollbars autoHeight={true} autoHeightMin={500} autoHide={true}>
            <h3 className={styles.ip_description_title}>
              {t(ip.description_title_1)}
            </h3>
            <p>{t(ip.description_subtitle_1)}</p>
            <p>{t(ip.description_subtitle_2)}</p>
            <p>{t(ip.description_subtitle_3)}</p>
            <p>{t(ip.description_subtitle_4)}</p>
            <h3 className={styles.ip_description_title}>
              {t(ip.description_title_2)}
            </h3>
            <p>{t(ip.description_subtitle_5)}</p>
            <p>{t(ip.description_subtitle_6)}</p>
            <ul className={styles.card__container_ul}>
              <li>{t(ip.description_subtitle_l1)}</li>
              <li>{t(ip.description_subtitle_l2)}</li>
              <li>{t(ip.description_subtitle_l3)}</li>
              <li>{t(ip.description_subtitle_l4)}</li>
            </ul>
            <p className={styles.text_center}>{t(ip.description_subtitle_8)}</p>
            <p className={styles.text_center}>{t(ip.description_subtitle_7)}</p>
            <div className={styles.order}>
              <MyButton
                styles="services"
                onClick={handlerAddToCart}
                variant="contained"
              >
                {t('ui.order')}
              </MyButton>
            </div>
          </Scrollbars>
        )}
        {initiallSocket && (
          <>
            <p>{t(initiallSocket)}</p>
            <div className={styles.order}>
              <MyButton
                styles="services"
                onClick={handlerAddToCart}
                variant="contained"
              >
                {t('ui.order')}
              </MyButton>
            </div>
          </>
        )}
        {additionalPatchCord && (
          <>
            <p>{t(additionalPatchCord)}</p>
            <div className={styles.order}>
              <MyButton
                styles="services"
                onClick={handlerAddToCart}
                variant="contained"
              >
                {t('ui.order')}
              </MyButton>
            </div>
          </>
        )}
        {equipmentDelivery && (
          <>
            <p>{t(equipmentDelivery.description_subtitle_1)}</p>
            <p>{t(equipmentDelivery.description_subtitle_2)}</p>
            <p>{t(equipmentDelivery.description_subtitle_3)}</p>
            <p>{t(equipmentDelivery.description_subtitle_4)}</p>
            <div className={styles.order}>
              <MyButton
                styles="services"
                onClick={handlerAddToCart}
                variant="contained"
              >
                {t('ui.order')}
              </MyButton>
            </div>
          </>
        )}
        {ConfNetCard && (
          <>
            <ul className={styles.card__container_ul}>
              <p>{t(ConfNetCard.description_subtitle_1)}</p>
              <h3 className={styles.ip_description_title}>
                {t(ConfNetCard.decription_title)}
              </h3>
              <li>{t(ConfNetCard.description_subtitle_l1)}</li>
              <li>{t(ConfNetCard.description_subtitle_l2)}</li>
              <li>{t(ConfNetCard.description_subtitle_l3)}</li>
              <p>{t(ConfNetCard.description_subtitle_2)}</p>
              <p>{t(ConfNetCard.description_subtitle_3)}</p>
            </ul>
            <div className={styles.order}>
              <MyButton
                styles="services"
                onClick={handlerAddToCart}
                variant="contained"
              >
                {t('ui.order')}
              </MyButton>
            </div>
          </>
        )}
        {cableInsurance && (
          <>
            <p>{t(cableInsurance.description_subtitle_1)}</p>
            <p>{t(cableInsurance.description_subtitle_2)}</p>
            <p>{t(cableInsurance.description_subtitle_3)}</p>
            <div className={styles.order}>
              <MyButton
                styles="services"
                onClick={handlerAddToCart}
                variant="contained"
              >
                {t('ui.order')}
              </MyButton>
            </div>
          </>
        )}
        {opricalCableInsurance && (
          <>
            <p>{t(opricalCableInsurance.description_subtitle_1)}</p>
            <p>{t(opricalCableInsurance.description_subtitle_2)}</p>
            <div className={styles.order}>
              <MyButton
                styles="services"
                onClick={handlerAddToCart}
                variant="contained"
              >
                {t('ui.order')}
              </MyButton>
            </div>
          </>
        )}
        {cableInstallation && (
          <>
            <p>{t(cableInstallation.description_subtitle_1)}</p>
            <p>{t(cableInstallation.description_subtitle_2)}</p>
            <p>{t(cableInstallation.description_subtitle_3)}</p>
            <div className={styles.order}>
              <MyButton
                styles="services"
                onClick={handlerAddToCart}
                variant="contained"
              >
                {t('ui.order')}
              </MyButton>
            </div>
          </>
        )}
        {punchingHoles && (
          <>
            <p>{t(punchingHoles.description_subtitle_1)}</p>
            <p>{t(punchingHoles.description_subtitle_2)}</p>
            <p>{t(punchingHoles.description_subtitle_3)}</p>
            <div className={styles.order}>
              <MyButton
                styles="services"
                onClick={handlerAddToCart}
                variant="contained"
              >
                {t('ui.order')}
              </MyButton>
            </div>
          </>
        )}
        {boxAssembly && (
          <>
            <p>{t(boxAssembly.description_subtitle_1)}</p>
            <p>{t(boxAssembly.description_subtitle_2)}</p>
            <p>{t(boxAssembly.description_subtitle_3)}</p>
            <p>{t(boxAssembly.description_subtitle_4)}</p>
            <div className={styles.order}>
              <MyButton
                styles="services"
                onClick={handlerAddToCart}
                variant="contained"
              >
                {t('ui.order')}
              </MyButton>
            </div>
          </>
        )}
        {installSwitch && (
          <>
            <p>{t(installSwitch.description_subtitle_1)}</p>
            <p>{t(installSwitch.description_subtitle_2)}</p>
            <ul className={styles.card__container_ul}>
              <li>{t(installSwitch.description_subtitle_l1)}</li>
              <li>{t(installSwitch.description_subtitle_l2)}</li>
              <li>{t(installSwitch.description_subtitle_l3)}</li>
              <li>{t(installSwitch.description_subtitle_l4)}</li>
            </ul>
            <div className={styles.order}>
              <MyButton
                styles="services"
                onClick={handlerAddToCart}
                variant="contained"
              >
                {t('ui.order')}
              </MyButton>
            </div>
          </>
        )}
        {configuringRouter && isMobile && (
          <>
            <h3 className={styles.ip_description_title}>
              {t(configuringRouter.description_title_1)}
            </h3>
            <p>{t(configuringRouter.description_subtitle_1)}</p>
            <p>{t(configuringRouter.description_subtitle_2)}</p>
            <h3 className={styles.ip_description_title}>
              {t(configuringRouter.description_title_2)}
            </h3>
            <p>{t(configuringRouter.description_subtitle_3)}</p>
            <ul className={styles.card__container_ul}>
              <li>{t(configuringRouter.description_subtitle_l1)}</li>
              <li>{t(configuringRouter.description_subtitle_l2)}</li>
              <li>{t(configuringRouter.description_subtitle_l3)}</li>
              <li>{t(configuringRouter.description_subtitle_l4)}</li>
            </ul>
            <p>{t(configuringRouter.description_subtitle_4)}</p>
            <h3 className={styles.ip_description_title}>
              {t(configuringRouter.desctiption_title_3)}
            </h3>
            <p>{t(configuringRouter.description_subtitle_5)}</p>
            <ul className={styles.card__container_ul}>
              <li>{t(configuringRouter.description_subtitle_l_1)}</li>
              <li>{t(configuringRouter.description_subtitle_l_2)}</li>
              <li>{t(configuringRouter.description_subtitle_l_3)}</li>
              <li>{t(configuringRouter.description_subtitle_l_4)}</li>
            </ul>
            <p>{t(configuringRouter.description_subtitle_6)}</p>
            <div className={styles.order}>
              <MyButton
                styles="services"
                onClick={handlerAddToCart}
                variant="contained"
              >
                {t('ui.order')}
              </MyButton>
            </div>
          </>
        )}
        {configuringRouter && !isMobile && (
          <Scrollbars autoHeight={true} autoHeightMin={500} autoHide={true}>
            <h3 className={styles.ip_description_title}>
              {t(configuringRouter.description_title_1)}
            </h3>
            <p>{t(configuringRouter.description_subtitle_1)}</p>
            <p>{t(configuringRouter.description_subtitle_2)}</p>
            <h3 className={styles.ip_description_title}>
              {t(configuringRouter.description_title_2)}
            </h3>
            <p>{t(configuringRouter.description_subtitle_3)}</p>
            <ul className={styles.card__container_ul}>
              <li>{t(configuringRouter.description_subtitle_l1)}</li>
              <li>{t(configuringRouter.description_subtitle_l2)}</li>
              <li>{t(configuringRouter.description_subtitle_l3)}</li>
              <li>{t(configuringRouter.description_subtitle_l4)}</li>
            </ul>
            <p>{t(configuringRouter.description_subtitle_4)}</p>
            <h3 className={styles.ip_description_title}>
              {t(configuringRouter.desctiption_title_3)}
            </h3>
            <p>{t(configuringRouter.description_subtitle_5)}</p>
            <ul className={styles.card__container_ul}>
              <li>{t(configuringRouter.description_subtitle_l_1)}</li>
              <li>{t(configuringRouter.description_subtitle_l_2)}</li>
              <li>{t(configuringRouter.description_subtitle_l_3)}</li>
              <li>{t(configuringRouter.description_subtitle_l_4)}</li>
            </ul>
            <p>{t(configuringRouter.description_subtitle_6)}</p>
            <div className={styles.order}>
              <MyButton
                styles="services"
                onClick={handlerAddToCart}
                variant="contained"
              >
                {t('ui.order')}
              </MyButton>
            </div>
          </Scrollbars>
        )}
      </div>
    </ReactCardFlip>
  );
}
ServiceItem.proprTypes = {
  icon: PropTypes.string,
};

ServiceItem.defaultProps = {
  icon: DefaultServices,
};
