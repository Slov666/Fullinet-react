import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalShop } from '../../redux/modal/modalAction';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { cartSelector } from '../../redux/shop/shopSelectors';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import GavelIcon from '@material-ui/icons/Gavel';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import NavigationIcon from '@material-ui/icons/Navigation';


import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

import style from './Header.module.css';

export default function Header() {
  const useStyle = makeStyles(() => ({
    root: {
      color: 'rgb(235, 235, 235)',
      fill: 'rgb(235, 235, 235)',
    },
  }));
  const styles = useStyle();
  const cart = useSelector(cartSelector);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });
    setCartCount(count);
  }, [cart, cartCount]);

  const dispatch = useDispatch();

  const [locales, setLocales] = useState(null);

  const { t, i18n } = useTranslation();
  const changleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  const listItems = [
    {
      link: (
        <NavLink to={'/home'} exact>
          {t('nav.main')}
        </NavLink>
      ),
      icon: <HomeIcon />,
    },
    {
      link: (
        <NavLink to={'/services'} exact>
          {t('nav.services')}
        </NavLink>
      ),
      icon: <GavelIcon />,
    },
    {
      link: (
        <button
          className={style.button}
          onClick={() => dispatch(setModalShop(true))}
        >
          Корзина
        </button>
      ),
      icon: <ShoppingCartIcon onClick={() => dispatch(setModalShop(true))} />,
    },
    {
      link: (
        <a href="https://my.fullinet.com/cgi-bin/stat.pl">{t('nav.office')}</a>
      ),
      icon: <MailIcon />,
    },
  ];
  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });
  const classes = useStyles();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onClickLang = useCallback((e) => {
    changleLanguage(e.target.id === 'ua' ? 'ru' : 'ua');
  });

  useEffect(() => {
    setLocales(localStorage.getItem('i18nextLng'));
  }, [onClickLang]);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {listItems.map((item, index) => {
          const { link, icon } = item;
          return (
            <ListItem button key={index}>
              <ListItemIcon>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
              </ListItemIcon>

              <ListItemText primary={link} />
            </ListItem>
          );
        })}
      </List>

      <List>
        {/* в массив ниже могу добавить NavLink */}
        {[].map((text, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <ContactPhoneIcon /> : <MailIcon />} */}
              <NavigationIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <header className={style.header}>
      <nav className={style.nav_mobile} key={<MenuIcon />}>
        <Button onClick={toggleDrawer(<MenuIcon />, true)}>
          {<MenuIcon style={{ color: '#fff' }} />}
        </Button>
        <Typography
          style={{ color: '#fff' }}
          display="inline"
          align="right"
          variant="h6"
        >
          FULLINET
        </Typography>
        <Drawer
          anchor={'left'}
          open={state[(<MenuIcon />)]}
          onClose={toggleDrawer(<Button />, false)}
        >
          {list(<MenuIcon />)}
        </Drawer>
      </nav>
      <div className={style.container_buttons}>
        <button
          className={style.buttonChangeLang}
          id={locales}
          onClick={(e) => onClickLang(e)}
        >
          {locales === 'ua' ? 'Рус' : 'Укр'}
        </button>
        <IconButton onClick={() => dispatch(setModalShop(true))}>
          <ShoppingCartIcon classes={styles} />
          <div className={style.qty}>{cartCount}</div>
        </IconButton>
      </div>
    </header>
  );
}
