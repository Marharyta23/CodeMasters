import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";

import css from "./UserSettingsModal.module.css";

export default function UserSettingsModal() {
  return (
    <div className={css.modal}>
      <h1 className={css.formTitle}>Setting</h1>

      <UserSettingsForm />
    </div>
  );
}
