import React from 'react';
import Footer from '../Footer/Footer';

import style from './Layout.module.css';

import  useMobile  from '../../hooks/useMobile';

import Header from '../Header/Header';
import HeaderDesctop from '../HeaderDesctop/HeaderDesctop';

export default function Layout({ children }) {
  const isMobile = useMobile();

  return (
    <>
      {!isMobile ? <HeaderDesctop /> : <Header />}
      <div className={style.container}>
        {children}
        <Footer />
      </div>
    </>
  );
}
