import React from 'react';
import { useTranslation } from 'react-i18next';
import useToggle from '../../hooks/useToggle';
import useTitle from '../../hooks/useTitle';

import styles from './ServiceItem.module.css';

import '../../utils/i18next';

import ServiceItem from './ServiceItem';
import DropMenu from '../../common/DropMenu/DropMenu';

import { arrWithIconsService } from '../../helpers/icons.services';

export default function Services() {
  const { t } = useTranslation();
  useTitle(t('nav.services'));

  const [about, onClickAbout] = useToggle();
  const services = t('services', { returnObjects: true });

  const newServicesOj = services.map((item) => {
    const arrWitchImg = arrWithIconsService.find((img) => {
      return img._id === item._id;
    });

    if (arrWitchImg) {
      return { ...item, ...arrWitchImg };
    }
    return item;
  });

  return (
    <main>
      <div className={styles.container_dropMenu}>
        <DropMenu
          onClick={onClickAbout}
          click={about}
          title={t('corporateClients.title')}
        >
          <ul className={styles.container_ul}>
            <li>{t('corporateClients.descriprion_l1')}</li>
            <li>{t('corporateClients.descriprion_l2')}</li>
            <li>{t('corporateClients.descriprion_l3')}</li>
            <li>{t('corporateClients.descriprion_l4')}</li>
            <li>{t('corporateClients.descriprion_l5')}</li>
            <li>{t('corporateClients.descriprion_l6')}</li>
            <li>{t('corporateClients.descriprion_l7')}</li>
          </ul>
        </DropMenu>
      </div>

      <section className={styles.main}>
        {newServicesOj.map(
          ({
            _id,
            descriptions,
            title,
            price,
            detailsPrice,
            icon,
            descObj,
            onMonth,
            alt,
            img,
          }) => (
            <ServiceItem
              key={`card-${_id}`}
              _id={_id}
              descriptions={descriptions}
              title={title}
              price={price}
              detailsPrice={detailsPrice}
              icon={img}
              iconGoole={icon}
              descObj={descObj}
              onMonth={onMonth}
              alt={alt}
            />
          )
        )}
      </section>
      <div className={styles.container_dropMenu_2}>
        <DropMenu
          onClick={onClickAbout}
          click={about}
          title={t('tariffs_title.additionalInformationServices.aditionalInfo')}
        >
          <ul className={styles.container_ul}>
            <li>
              {t('tariffs_title.additionalInformationServices.noMaterial')}
            </li>
            <li>{t('tariffs_title.additionalInformationServices.money')}</li>
          </ul>
        </DropMenu>
      </div>
    </main>
  );
}
