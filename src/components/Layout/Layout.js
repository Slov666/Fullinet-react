import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ScrollToTop from 'react-scroll-up';

import style from './Layout.module.css';

import useMobile from '../../hooks/useMobile';
import { isAnyModalOpenSelector } from '../../redux/modal/modalSelectors';

import Header from '../Header/Header';
import HeaderDesctop from '../Header/HeaderDesctop';
import ModalConnect from '../../components/Modal/ModalComponents/ModalConnect';
import ModalShop from '../../components/Modal/ModalComponents/ModalShop';
import Footer from '../Footer/Footer';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import Fab from '@material-ui/core/Fab';
import {useStyles} from "../../styles/inlineStyles";

export default function Layout({ children }) {
  const isMobile = useMobile();
  const isAnyModalOpen = useSelector(isAnyModalOpenSelector);
  const scrollY = useRef(window.scrollY);
  const shouldToChangeLayout = isAnyModalOpen;
  const styleWhenModalIsOpened = useRef({
    position: 'fixed',
    right: '0px',
    left: '0px',
    top: `-${scrollY.current - 59}px`,
  });

  const scrollToTopStyle = {
    transitionDuration: '0.7s',
    zIndex: '1000',
  };

  isAnyModalOpen && window.scrollTo(0, parseInt(scrollY || '0') * -1);
  const clasess = useStyles();
  const [locales, setLocales] = useState(null);
  useEffect(() => {
    setLocales(localStorage.getItem('i18nextLng'));
  }, []);
  return (
    <>
      {!isMobile ? (
        <HeaderDesctop locales={locales} />
      ) : (
        <Header locales={locales} />
      )}
      <div
        style={shouldToChangeLayout ? styleWhenModalIsOpened.current : {}}
        className={style.container}
      >
        {isMobile && (
          <ScrollToTop showUnder={160} style={scrollToTopStyle}>
            <span>
              <Fab className={clasess.toTop} size="medium">
                <ExpandLessRoundedIcon className={clasess.arrow} />
              </Fab>
            </span>
          </ScrollToTop>
        )}
        {children}
        <ModalConnect />
        <ModalShop />
        <Footer />
      </div>
    </>
  );
}
