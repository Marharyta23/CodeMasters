// import { useSelector, useDispatch } from "react-redux";

import UserBarPopover from "../UserBarPopover/UserBarPopover";
import css from "./UserBar.module.css";

export default function UserBar({ user }) {
    if (!user) {
        user = "User";
    }

    // const dispatch = useDispatch();

    // const user = useSelector((state) => state.userName);
    // const isVisible = useSelector((state) => state.popover);

    // const handleClick = () => {
    //     dispatch(togglePopover());
    // };

    return (
        <div className={css.userBarContainer}>
            {/* <button type="button" className={css.userBar} onClick={handleClick}> */}
            <button type="button" className={css.userBar}>
                <p className={css.userBarName}>{user}</p>

                <img src="" alt="avatar" className={css.userBarImage} width="38" height="38" />

                <svg className={css.userBarIcon} width="16" height="16">
                    <use href="../../../src/img/icons.svg#icon-vector"></use>
                </svg>
            </button>

            <UserBarPopover />
        </div>
    );
}
