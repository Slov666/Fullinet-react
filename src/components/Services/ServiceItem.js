import React from 'react';
import { setModalConnect } from '../../redux/modal/modalAction';
import { addToCart } from '../../redux/shop/shopActions';

import useToggle from '../../hooks/useToggle';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useMobile from '../../hooks/useMobile';

import { makeSuccessNotification } from '../../redux/notifications/notificationOperations';

import styles from './ServiceItem.module.css';

import Image from '../../common/Image/Image';
// import { Scrollbars } from 'rc-scrollbars';
import { Scrollbars } from 'react-custom-scrollbars';
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
  descObj,
  onMonth,
  alt,
}) {
  const { t } = useTranslation();

  const [isFlip, onFlip] = useToggle();

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
        onMonth,
        alt,
      })
    );
    dispatch(makeSuccessNotification('Додано в корзину'));
  };
  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
      <div className={styles.card__container}>
        <div className={styles.card__title}>
          <Image src={t(icon)} alt={alt} className={styles.icons} />
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
            <MyButton styles="services" onClick={onFlip}>
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

      <div className={styles.card__container_fliped}>
        <div className={styles.buttonContainer}>
          <MyButton styles="services" onClick={onFlip}>
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
          </Scrollbars>
        )}
        {initiallSocket && (
          <>
            <p>{t(initiallSocket)}</p>
          </>
        )}
        {additionalPatchCord && (
          <>
            <p>{t(additionalPatchCord)}</p>
          </>
        )}
        {equipmentDelivery && (
          <>
            <p>{t(equipmentDelivery.description_subtitle_1)}</p>
            <p>{t(equipmentDelivery.description_subtitle_2)}</p>
            <p>{t(equipmentDelivery.description_subtitle_3)}</p>
            <p>{t(equipmentDelivery.description_subtitle_4)}</p>
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
          </>
        )}
        {cableInsurance && (
          <>
            <p>{t(cableInsurance.description_subtitle_1)}</p>
            <p>{t(cableInsurance.description_subtitle_2)}</p>
            <p>{t(cableInsurance.description_subtitle_3)}</p>
          </>
        )}
        {opricalCableInsurance && (
          <>
            <p>{t(opricalCableInsurance.description_subtitle_1)}</p>
            <p>{t(opricalCableInsurance.description_subtitle_2)}</p>
          </>
        )}
        {cableInstallation && (
          <>
            <p>{t(cableInstallation.description_subtitle_1)}</p>
            <p>{t(cableInstallation.description_subtitle_2)}</p>
            <p>{t(cableInstallation.description_subtitle_3)}</p>
          </>
        )}
        {punchingHoles && (
          <>
            <p>{t(punchingHoles.description_subtitle_1)}</p>
            <p>{t(punchingHoles.description_subtitle_2)}</p>
            <p>{t(punchingHoles.description_subtitle_3)}</p>
          </>
        )}
        {boxAssembly && (
          <>
            <p>{t(boxAssembly.description_subtitle_1)}</p>
            <p>{t(boxAssembly.description_subtitle_2)}</p>
            <p>{t(boxAssembly.description_subtitle_3)}</p>
            <p>{t(boxAssembly.description_subtitle_4)}</p>
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
          </Scrollbars>
        )}
      </div>
    </ReactCardFlip>
  );
}
