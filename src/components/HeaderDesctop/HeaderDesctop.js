import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './HeaderDesctop.module.css';
import routes from '../../utils/routes';

export default function HeaderDesctop() {
  return (
    <nav className={style.header}>
      <p className={style.logo}>
        <b>FULL</b>INNET
      </p>
      <div className={style.menu}>
        <NavLink to={'/home'} exact>
          Главная
        </NavLink>
        <NavLink to={'/tariffs'} exact>
          Тарифы
        </NavLink>
        <NavLink to={'/connect'} exact>
          о подключении
        </NavLink>
        <NavLink to={'/license'} exact>
          Лицензия
        </NavLink>
        <NavLink to={'/contacts'} exact>
          Контакты
        </NavLink>
        <a href="https://my.fullinet.com/cgi-bin/stat.pl">Кабинет</a>
      </div>
    </nav>
  );
}
