import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { unsetNotification } from '../../redux/notifications/notificationActions';

import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import styles from './Notification.module.css';
import animation from './animation.module.css';

const Notification = ({ message, type }) => {
  const overlay = useRef(null);
  const messages = useRef(null);
  const handleClick = (e) => {
    if (e.target === overlay.current || e.target === messages.current) {
      dispatch(unsetNotification({ message, type }));
    }
  };
  const dispatch = useDispatch();
  return (
    <CSSTransition
      in={!!message}
      unmountOnExit
      classNames={animation}
      timeout={250}
    >
      <div
        ref={overlay}
        onClick={handleClick}
        className={classNames(styles.box, styles[type])}
      >
        <p ref={messages} onClick={handleClick}>
          {message}
        </p>
      </div>
    </CSSTransition>
  );
};

export default Notification;
