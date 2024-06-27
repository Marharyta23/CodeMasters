import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/auth/operations";

import css from "../DeleteWaterModal/DeleteWaterModal.module.css";

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogOut = () => {
    dispatch(logOut())
      .then(() => {
        console.log("Logout successful");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        alert(error.message);
      });
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className={css.modalContentWrapper}>
      <h2 className={css.modalTitle}>Log out</h2>
      <p className={css.modalText}>Do you really want to leave?</p>
      <div className={css.modalBtnWrapper}>
        <button className={css.modalBtn} onClick={onLogOut}>
          Log out
        </button>
        <button className={css.modalBtnCancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
