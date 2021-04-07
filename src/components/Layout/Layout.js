import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ScrollToTop from 'react-scroll-up';

import style from './Layout.module.css';
import { makeStyles } from '@material-ui/core/styles';

import useMobile from '../../hooks/useMobile';
import { isAnyModalOpenSelector } from '../../redux/modal/modalSelectors';

import Header from '../Header/Header';
import HeaderDesctop from '../Header/HeaderDesctop';
import ModalConnect from '../../components/Modal/ModalComponents/ModalConnect';
import ModalShop from '../../components/Modal/ModalComponents/ModalShop';
import Footer from '../Footer/Footer';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import Fab from '@material-ui/core/Fab';

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
  const useStyles = makeStyles(() => ({
    toTop: {
      color: '#212121',
      zIndex: 200000,
      position: 'fixed',
      bottom: 30,
      right: 8,
      border: '2px solid #212121',
      backgroundColor: 'transparent',
      transition: '0.3s ease-out',
      '&:hover': {
        color: 'white',
        border: '2px solid #212121',
        backgroundColor: '#212121',
        transform: 'translateY(-5%)',
        transition: '0.3s ease-in',
      },
    },
    arrow: {
      fontSize: 60,
    },
  }));
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
