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
import { Menu, MenuItem } from '@material-ui/core';

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
  const [locales, setLocales] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });
    setCartCount(count);
  }, [cart, cartCount]);

  const onClickLang = useCallback((e) => {
    changeLanguage(e.target.id === 'ua' ? 'ru' : 'ua');
  });
  useEffect(() => {
    setLocales(localStorage.getItem('i18nextLng'));
  }, [onClickLang]);

  const { t, i18n } = useTranslation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={style.header}>
      <nav className={style.header__nav}>
        <NavLink to={'/home'} exact>
          <h6 className={style.logo}>FULLINET</h6>
        </NavLink>
        <div className={style.menu}>
          <NavLink to={'/home'} exact>
            {t('nav.main')}
          </NavLink>
          <NavLink to={'/services'} exact>
            {t('nav.services')}
          </NavLink>
          <a className={style.buttonMenu} onClick={handleClick}>
            {t('nav.office')}
          </a>
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

        <Menu
          MenuProps={{ disableScrollLock: true }}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <a href="https://my.fullinet.com/cgi-bin/stat.pl">
              {t('nav.oldOffice')}
            </a>
          </MenuItem>
          <MenuItem>
            <a href="https://stat.fullinet.com/cgi-bin/stat.pl">
              {t('nav.newOffice')}
            </a>
          </MenuItem>
        </Menu>
      </nav>
    </header>
  );
}
