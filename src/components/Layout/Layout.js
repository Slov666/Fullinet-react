import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import style from './Layout.module.css';

import useMobile from '../../hooks/useMobile';
import { isAnyModalOpenSelector } from '../../redux/modal/modalSelectors';

import Header from '../Header/Header';
import HeaderDesctop from '../Header/HeaderDesctop';
import ModalConnect from '../../components/Modal/ModalComponents/ModalConnect';
import ModalShop from '../../components/Modal/ModalComponents/ModalShop'
import Footer from '../Footer/Footer';

export default function Layout({ children }) {
  const isMobile = useMobile();
  const isAnyModalOpen = useSelector(isAnyModalOpenSelector);
  const scrollY = useRef(window.scrollY);
  const shouldToChangeLayout =  isAnyModalOpen;
  const styleWhenModalIsOpened = useRef({
    position: 'fixed',
    right: "0px",
    left: "0px",
    top: `-${scrollY.current - 59}px`,
  });
  isAnyModalOpen && window.scrollTo(0, parseInt(scrollY || '0') * -1);

  const [locales, setLocales] = useState(null);
  useEffect(() => {
    setLocales(localStorage.getItem('i18nextLng'));
  }, []);
  return (
    <>
      {!isMobile ? <HeaderDesctop locales={locales} /> : <Header locales={locales} />}
      <div
        style={shouldToChangeLayout ? styleWhenModalIsOpened.current : {}}
        className={style.container}
      >
        {children}
        <ModalConnect />
        <ModalShop />
        <Footer />
      </div>
    </>
   
  );
}
