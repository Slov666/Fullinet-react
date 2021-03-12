import React from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

import style from './Main.module.css';

export default function Main() {
  const { t } = useTranslation();

  return (
    <main className={style.container}>
      <section className={style.primaryContainer}>
        <div className={style.contact_info}>
          <p>{t('contact_info.work_schedule')}</p>
          <p className={style.contact_info_location}>
            {' '}
            {t('contact_info.location')}
          </p>
          <a href="tel: 380442330290">{t('contact_info.phone1')}</a>
          <a href="tel: 380631711886">{t('contact_info.phone2')}</a>
          <a href="tel: 380632330290">{t('contact_info.phone3')}</a>
        </div>
      </section>

      <section className={style.secondaryContainer}>
        <Button variant="contained" color="primary" className={style.button}>
          Замовити зараз
        </Button>
      </section>

      {/* <h3 className={style.title}>{text("about.title")}</h3>
      <ul className={style.container_subtitle}>
        <li className={style.subtitle}>{text("about.part1")}</li>
        <li className={style.subtitle}>{text("about.part2")}</li>
        <li className={style.subtitle}>{text("about.part3")}</li>
        <li className={style.subtitle}>{text("about.part4")}</li>
        <li className={style.subtitle}>{text("about.part6")}</li>
        <li className={style.subtitle}>{text("about.part5")}</li>
      </ul>
      <p className={style.subtitle_b}>{text("about.part7")}</p> */}
    </main>
  );
}
