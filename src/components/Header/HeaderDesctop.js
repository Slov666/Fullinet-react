import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './HeaderDesctop.module.css';
import styleButton from './Header.module.css';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

export default function HeaderDesctop() {
  const [locales, setLocales] = useState(null);
  const { t, i18n } = useTranslation();
  const changleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  const onClickLang = useCallback((e) => {
    changleLanguage(e.target.id === 'ua' ? 'ru' : 'ua');
    console.log(e.target);
  });

  useEffect(() => {
    setLocales(localStorage.getItem('i18nextLng'));
  }, [onClickLang]);
  return (
    <nav className={style.header}>
      <NavLink to={'/home'} exact>
        <p className={style.logo}>
          <span>FULL</span>INNET
        </p>
      </NavLink>
      <div className={style.menu}>
        <NavLink to={'/home'} exact>
          Главная
        </NavLink>
        <a href="https://my.fullinet.com/cgi-bin/stat.pl">Кабинет</a>
        <button
          className={styleButton.buttonChangeLang}
          id={locales}
          onClick={(e) => onClickLang(e)}
        >
          {locales === 'ua' ? 'Рус' : 'Укр'}
        </button>
      </div>
    </nav>
  );
}
