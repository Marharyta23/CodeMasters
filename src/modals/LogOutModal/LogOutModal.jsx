import React, { useEffect } from "react";
import Modal from "react-modal";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import { clearStore } from "./redux/actions";
import css from "../DeleteWaterModal/DeleteWaterModal.module.css";

Modal.setAppElement("#root");

const LogOutModal = ({ isOpen, onClose }) => {
  // const dispatch = useDispatch();
  // const history = useHistory();

  const handleLogOut = async () => {
    // try {
    //   await axios.post("/api/logout");
    // } catch (error) {
    //   console.error("Error logging out:", error);
    // } finally {
    //   dispatch(clearStore());
    //   localStorage.clear();
    //   history.push("/");
    // }
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
