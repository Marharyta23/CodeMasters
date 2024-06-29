import { useSelector } from "react-redux";

import { selectUser } from "../../redux/auth/selectors";

import UserBar from "../UserBar/UserBar";

import css from "./UserPanel.module.css";

export default function UserPanel() {
    const user = useSelector(selectUser);
    const name = user.name;

    return (
        <div className={css.container}>
            <p className={css.welcomeText}>
                Hello<span>, {name}!</span>
            </p>

            <UserBar />
        </div>
    );
}
