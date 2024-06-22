import clsx from "clsx";

import css from "./UserBarPopover.module.css";

export default function UserBarPopover() {
    return (
        <div className={css.container}>
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
