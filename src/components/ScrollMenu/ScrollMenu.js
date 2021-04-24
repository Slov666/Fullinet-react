import React from 'react';
import { useSelector } from 'react-redux';
import useMedia from 'use-media';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-scroll';
import { someFlipIsOpenSelector } from '../../redux/fliped/flipedSelector';

import { makeStyles } from '@material-ui/core/styles';
import useMobile from '../../hooks/useMobile';
import styles from './ScrollMenu.module.css';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMobile = useMobile();
  const isFlip = useSelector(someFlipIsOpenSelector);

  const isWide = useMedia({ minWidth: '2000px' });
  const useStyles = makeStyles((theme) => ({
    root: {
      marginRight: '200px',
    },
    paper: {
      position: 'fixed',
      left: isWide ? '20% !important' : '5% !important',
      top: '5% !important',
    },
  }));
  const { t } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const styleMenu = useStyles();
  return (
    <div className={styles.menu}>
      {!anchorEl && !isFlip && (
        <Button
          className={styles.tariff_selector}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Тарифи
        </Button>
      )}

      <Menu
        classes={styleMenu}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link
            className={styles.link}
            onClick={handleClose}
            to="Wi-Fi"
            offset={isMobile ? -20 : -55}
            spy={true}
            smooth={true}
            duration={500}
          >
            {t('nav.WIFI')}
          </Link>
        </MenuItem>

        <MenuItem>
          <Link
            className={styles.link}
            onClick={handleClose}
            to="VitaLitovska"
            offset={isMobile ? -20 : -55}
            spy={true}
            smooth={true}
            duration={500}
          >
            {t('nav.VitaLitovska')}
          </Link>
        </MenuItem>

        <MenuItem>
          {' '}
          <Link
            className={styles.link}
            onClick={handleClose}
            to="Pirogiv"
            offset={isMobile ? -20 : -55}
            spy={true}
            smooth={true}
            duration={500}
          >
            {t('nav.Pirogiv')}
          </Link>
        </MenuItem>

        <MenuItem>
          <Link
            className={styles.link}
            onClick={handleClose}
            to="Damba"
            offset={isMobile ? -20 : -55}
            spy={true}
            smooth={true}
            duration={500}
          >
            {t('nav.Damba')}
          </Link>
        </MenuItem>

        <MenuItem>
          <Link
            className={styles.link}
            onClick={handleClose}
            to="Bezradichi"
            offset={isMobile ? -20 : -55}
            spy={true}
            smooth={true}
            duration={500}
          >
            {t('nav.Bezradichi')}
          </Link>
        </MenuItem>

        <MenuItem>
          <Link
            className={styles.link}
            onClick={handleClose}
            to="GreenWood"
            offset={isMobile ? -20 : -55}
            spy={true}
            smooth={true}
            duration={500}
          >
            {t('nav.GreenWood')}
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
