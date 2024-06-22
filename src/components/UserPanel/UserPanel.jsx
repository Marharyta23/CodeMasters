// import { useSelector } from "react-redux";

import UserBar from "../UserBar/UserBar";

import css from "./UserPanel.module.css";

export default function UserPanel({ user }) {
    if (!user) {
        user = "User";
    }

    // const user = useSelector((state) => state.userName);

    return (
        <div className={css.container}>
            <p className={css.welcomeText}>
                Hello<span>, {user}!</span>
            </p>

            <UserBar />
        </div>
    );
}
