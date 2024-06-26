import { useEffect } from "react";
// import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logOut } from "../../redux/logout/authSlice";

import { clearUser } from "../../redux/logout/authSlice";

import css from "../DeleteWaterModal/DeleteWaterModal.module.css";

// Modal.setAppElement("#root");

const LogOutModal = ({ onRequestClose }) => {
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

  // useEffect(() => {
  //   const handleEscape = (event) => {
  //     if (event.key === "Escape") {
  //       onRequestClose();
  //     }
  //   };

  //   document.addEventListener("keydown", handleEscape);

  //   return () => {
  //     document.removeEventListener("keydown", handleEscape);
  //   };
  // }, [onRequestClose]);

  return (
    <div className={css.modalContentWrapper}>
      <h2 className={css.modalTitle}>Log out</h2>
      <p className={css.modalText}>Do you really want to leave?</p>
      <div className={css.modalBtnWrapper}>
        <button className={css.modalBtn} onClick={onLogOut}>
          Log out
        </button>
        <button className={css.modalBtnCancel} onClick={onRequestClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
