import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import style from './Layout.module.css';

import useMobile from '../../hooks/useMobile';
import { isAnyModalOpenSelector } from '../../redux/modal/modalSelectors';

import Header from '../Header/Header';
import HeaderDesctop from '../HeaderDesctop/HeaderDesctop';
import ModalConnectNow from '../../components/Modal/ModalComponents/ModalConnectNow';
import Footer from '../Footer/Footer';

export default function Layout({ children }) {
  const isMobile = useMobile();
  const isAnyModalOpen = useSelector(isAnyModalOpenSelector);
  const scrollY = useRef(window.scrollY);
  const shouldToChangeLayout = isMobile && isAnyModalOpen;
  const styleWhenModalIsOpened = useRef({
    position: 'fixed',
    top: `-${scrollY.current - 59}px`,
  });

  return (
    <>
      {!isMobile ? <HeaderDesctop /> : <Header />}
      <div
        style={shouldToChangeLayout ? styleWhenModalIsOpened : {}}
        className={style.container}
      >
        {children}
        <ModalConnectNow />
        <Footer />
      </div>
    </>
  );
}
