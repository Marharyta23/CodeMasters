import React, { useEffect } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import css from "../DeleteWaterModal/DeleteWaterModal.module.css";
import { clearUser } from "../../redux/logout/authSlice";

Modal.setAppElement("#root");

const LogOutModal = ({ isOpen, onClose }) => {
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

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: "none",
      backgroundColor: "rgba(47, 47, 47, 0.60)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      backgroundColor: "var(--main-white)",
      overflow: "auto",
    },
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={css.modalContent}
        overlayClassName="modal-backdrop"
        style={customStyles}
      >
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
      </Modal>
    </div>
  );
};

export default LogOutModal;
