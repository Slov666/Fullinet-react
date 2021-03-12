import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import style from "./Modal.module.css";
import PropTypes from "prop-types";

export default function Modal({
  children,
  position,
  onClose,
  type,
  className,
}) {
  const overlay = useRef(null);
  const handleKeyboardCloseWindow = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleClick = (e) => {
    if (e.target === overlay.current) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardCloseWindow);

    return () =>
      document.removeEventListener("keydown", handleKeyboardCloseWindow);
  });

  return (
    <div ref={overlay} className={style.modalBackdrop} onClick={handleClick}>
      <div
        className={classNames(
          style[position],
          style[type],
          ...[className]
        )}
      >
        <button type="button" onClick={onClose} className={style.closeBtn} />
        {children}
      </div>
    </div>
  );
}
Modal.proprTypes = {
  position: PropTypes.string,
};
/* right, left, center  */
Modal.defaultProps = {
  position: "center",
};
