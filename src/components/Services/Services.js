import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ServiceItem.module.css';
import '../../utils/i18next';
import useToggle from '../../hooks/useToggle';

import ServiceItem from './ServiceItem';
import DropMenu from '../../common/DropMenu/DropMenu';
import { Container } from '@material-ui/core';

export default function Services() {
  const { t } = useTranslation();
  const [about, onClickAbout] = useToggle();
  const services = t('services', { returnObjects: true });

  return (
    <main>
      <div className={styles.container_dropMenu}>
        <DropMenu
          onClick={onClickAbout}
          click={about}
          title={'Корпоративним клієнтам Fullinet пропонує: '}
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
        {services.map(
          ({
            _id,
            descriptions,
            title,
            price,
            detailsPrice,
            icon,
            descObj,
            onMonth
          }) => (
            <ServiceItem
              key={`card-${_id}`}
              _id={_id}
              descriptions={descriptions}
              title={title}
              price={price}
              detailsPrice={detailsPrice}
              icon={icon}
              descObj={descObj}
              onMonth={onMonth}
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
