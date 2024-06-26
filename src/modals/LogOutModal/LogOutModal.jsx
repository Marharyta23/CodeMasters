import { useEffect } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { clearUser } from "../../redux/logout/authSlice";

import css from "../DeleteWaterModal/DeleteWaterModal.module.css";

Modal.setAppElement("#root");

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post("/api/logout");
      dispatch(clearUser());
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      onClose();
    }
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
        <button className={css.modalBtn} onClick={handleLogOut}>
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
