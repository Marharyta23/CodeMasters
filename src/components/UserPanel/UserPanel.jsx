import UserBar from "../UserBar/UserBar";

import css from "./UserPanel.module.css";

export default function UserPanel() {
    return (
        <div className={css.container}>
            <p className={css.welcomeText}>
                Hello<span>, Nadia!</span>
            </p>

            <UserBar />
        </div>
    );
}
