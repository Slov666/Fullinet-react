import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import GavelIcon from '@material-ui/icons/Gavel';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

import style from './Header.module.css';

const listItems = [
  {
    link: (
      <NavLink to={'/home'} exact>
        Главная
      </NavLink>
    ),
    icon: <HomeIcon />,
  },
  {
    link: (
      <NavLink to={'/license'} exact>
        Лицензия
      </NavLink>
    ),
    icon: <GavelIcon />,
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

export default function Header() {
  const [locales, setLocales] = useState(null);

  const { t, i18n } = useTranslation();
  const changleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const classes = useStyles();

  const onClickLang = useCallback((e) => {
    changleLanguage(e.target.id === 'ua' ? 'ru' : 'ua');
    console.log(e.target);
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
      <Divider />
      <List>
        {/* в массив ниже могу добавить NavLink */}
        {[<a href="https://my.fullinet.com/cgi-bin/stat.pl">Кабинет</a>].map(
          (text, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <ContactPhoneIcon /> : <MailIcon />} */}
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </div>
  );

  return (
    <header className={style.header}>
      <nav key={<MenuIcon />}>
        <Button onClick={toggleDrawer(<MenuIcon />, true)}>
          {<MenuIcon style={{ color: '#fff' }} />}
        </Button>
        <Typography
          style={{ color: '#fff' }}
          display="inline"
          align="right"
          variant="h6"
        >
          Fullinet
        </Typography>
        <Drawer
          anchor={'left'}
          open={state[(<MenuIcon />)]}
          onClose={toggleDrawer(<MenuIcon />, false)}
        >
          {list(<MenuIcon />)}
        </Drawer>
      </nav>
      <button
        className={
          (style.buttonChangeLang)
        }
        id={locales}
        onClick={(e) => onClickLang(e)}
      >
        {locales === 'ua' ? 'Рус' : 'Укр'}
      </button>
    </header>
  );
}
