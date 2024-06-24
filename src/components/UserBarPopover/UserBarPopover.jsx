import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, useCallback } from "react";
import clsx from "clsx";

import css from "./UserBarPopover.module.css";

import { hidePopover } from "../../redux/popover/slice";

export default function UserBarPopover() {
    const { isVisible } = useSelector((state) => state.popover);
    const dispatch = useDispatch();
    const popoverRef = useRef();

    const handleClickOutside = useCallback(
        (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target) && !event.target.closest("button")) {
                dispatch(hidePopover());
            }
        },
        [dispatch]
    );

    useEffect(() => {
        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isVisible, handleClickOutside]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className={css.container} ref={popoverRef}>
            <button type="button" className={css.popoverBtn}>
                <svg className={css.popoverIcon} width="16" height="16">
                    <use href="../../../src/img/icons.svg#icon-settings"></use>
                </svg>

                <p className={css.popoverText}>Setting</p>
            </button>

            <button type="button" className={clsx(css.popoverBtn, css.popoverBtnGray)}>
                <svg className={css.popoverIcon} width="16" height="16">
                    <use href="../../../src/img/icons.svg#icon-log-out"></use>
                </svg>

                <p className={css.popoverText}>Log out</p>
            </button>
        </div>
    );
}
