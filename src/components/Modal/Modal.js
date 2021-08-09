import React, {useEffect, useRef} from "react";
import classNames from "classnames";
import style from "./Modal.module.css";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {loadingSelector} from "../../redux/loader/loaderSelector";
import useMobile from "../../hooks/useMobile";

export default function Modal({
                                  children,
                                  position,
                                  onClose,
                                  type,
                                  className,
                              }) {
    const overlay = useRef(null);
    const load = useSelector(loadingSelector)
    const isMobile = useMobile()
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
            <div style={load && !isMobile? {display: 'flex'} : null}
                 className={classNames(
                     style[position],
                     style[type],
                     ...[className]
                 )}
            >
                <button type="button" onClick={onClose} className={style.closeBtn}/>
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
