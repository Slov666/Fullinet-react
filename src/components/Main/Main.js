import React from 'react';
import useToggle from '../../hooks/useToggle';
import { CSSTransition } from 'react-transition-group';
import animate from './animate.module.css';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

import { setModalConnect } from '../../redux/modal/modalAction';

import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import style from './Main.module.css';

export default function Main() {
  const [isOpenSchedule, onClickSchedule] = useToggle();
  const [isOpenContacts, onClickContacts] = useToggle();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <main className={style.container}>
      <section className={style.primaryContainer}>
        <div className={style.contact_info}>
          <p onClick={onClickSchedule} className={style.contact_info_schedule}>
            <span>{t('contact_info.work_schedule')}</span>
            <IconButton onClick={() => onClickSchedule}>
              <MenuIcon />
            </IconButton>
          </p>
          <CSSTransition
            in={isOpenSchedule}
            timeout={300}
            classNames={animate}
            unmountOnExit
          >
            <div>
              {isOpenSchedule && (
                <>
                  <p>{t('contact_info.work_schedule_time')}</p>
                  <p>{t('contact_info.dayOff')}</p>
                  <p className={style.contact_info_location}>
                    {t('contact_info.location')}
                  </p>
                </>
              )}
            </div>
          </CSSTransition>
          <p onClick={onClickContacts} className={style.contact_info_contacts}>
            <span>{t('contact_info.contacts')}</span>
            <IconButton onClick={() => onClickContacts}>
              <MenuIcon />
            </IconButton>
          </p>
          <CSSTransition
            in={isOpenContacts}
            timeout={300}
            classNames={animate}
            unmountOnExit
          >
            <>
              {isOpenContacts && (
                <div className={style.contact_info_contact}>
                  <a href="tel: 380442330290">{t('contact_info.phone1')}</a>
                  <a href="tel: 380631711886">{t('contact_info.phone2')}</a>
                  <a href="tel: 380632330290">{t('contact_info.phone3')}</a>
                </div>
              )}
            </>
          </CSSTransition>
        </div>
      </section>
    </main>
  );
}
