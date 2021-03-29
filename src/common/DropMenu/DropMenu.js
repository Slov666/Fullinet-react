import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { CSSTransition } from 'react-transition-group';

import styles from './DropMenu.module.css';
import animate from './animate.module.css';

export default function DropMenu({ onClick, click, title, children }) {
  return (
    <>
      <p onClick={onClick} className={styles.container}>
        <span>{title}</span>
        <IconButton onClick={() => onClick}>
          <MenuIcon />
        </IconButton>
      </p>
      <CSSTransition
        in={click}
        timeout={300}
        classNames={animate}
        unmountOnExit
      >
        <div className={styles.container_content}>{click &&  children }</div>
      </CSSTransition>
    </>
  );
}
