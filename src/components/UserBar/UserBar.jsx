import { useSelector, useDispatch } from "react-redux";

import { togglePopover } from "../../redux/popover/slice";
import { selectUser } from "../../redux/auth/selectors";

import UserBarPopover from "../UserBarPopover/UserBarPopover";
import icons from "../../img/icons.svg";

import css from "./UserBar.module.css";

export default function UserBar() {
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const name = user.name;
    const avatar = user.avatarURL;

    const handleClick = () => {
        dispatch(togglePopover());
    };

    return (
        <div className={css.userBarContainer}>
            <button type="button" className={css.userBar} onClick={handleClick}>
                <p className={css.userBarName}>{name}</p>

                <img src={avatar} alt="avatar" className={css.userBarImage} width="38" height="38" />

                <svg className={css.userBarIcon} width="16" height="16">
                    <use href={`${icons}#icon-vector`}></use>
                </svg>
            </button>

            <UserBarPopover />
        </div>
    );
}
