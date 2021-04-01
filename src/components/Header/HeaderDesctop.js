import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalShop } from '../../redux/modal/modalAction';
import { cartSelector } from '../../redux/shop/shopSelectors';

import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

import styleButton from './Header.module.css';
import style from './HeaderDesctop.module.css';
import { makeStyles } from '@material-ui/core/styles';

import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';

export default function HeaderDesctop() {
  const useStyle = makeStyles(() => ({
    root: {
      color: 'rgb(235, 235, 235)',
      fill: 'rgb(235, 235, 235)',
    },
  }));
  const styles = useStyle();
  const dispatch = useDispatch();

  const cart = useSelector(cartSelector);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });
    setCartCount(count);
  }, [cart, cartCount]);

  const [locales, setLocales] = useState(null);
  const { t, i18n } = useTranslation();
  const changleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  const onClickLang = useCallback((e) => {
    changleLanguage(e.target.id === 'ua' ? 'ru' : 'ua');
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
          {t('nav.main')}
        </NavLink>
        <NavLink to={'/services'} exact>
          {t('nav.services')}
        </NavLink>
        <a href="https://my.fullinet.com/cgi-bin/stat.pl">{t('nav.office')}</a>
        <IconButton onClick={() => dispatch(setModalShop(true))}>
          <ShoppingCartIcon classes={styles} />
          <div className={style.qty}>{cartCount}</div>
        </IconButton>

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
