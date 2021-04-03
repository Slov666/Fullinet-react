import React from "react";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import styles from "./Notification.module.css";
import animation from "./animation.module.css";

const Notification = ({message, type}) => {
  return (
    <CSSTransition
      in={message ? true : false}
      unmountOnExit
      classNames={animation}
      timeout={250}
    >
      <div className={classNames(styles.box, styles[type])}>
        <p>{message}</p>
      </div>
    </CSSTransition>
  );
};

export default Notification;
