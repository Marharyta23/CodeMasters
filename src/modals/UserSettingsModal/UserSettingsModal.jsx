import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";
import css from "./UserSettingsModal.module.css";
export default function UserSettingsModal({ onClose }) {
  // const handleClose = () => {
  //   onClose(); // Вызываем функцию onClose для закрытия модального окна
  // };
  return (
    // <div className={style.container}>
    <div className={css.modal}>
      <button className={css.button}>
        {/* // {onClick={handleClose}} */}
        <svg className={css.icon} width="14" height="14">
          {/* <use xlinkHref={`${sprite}#icon-exsit`}></use> */}
        </svg>
      </button>
      <h1 className={css.formTitle}>Setting</h1>
      <UserSettingsForm />
    </div>
    // </div>
  );
}
