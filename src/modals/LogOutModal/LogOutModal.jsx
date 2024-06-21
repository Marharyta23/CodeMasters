import React, { useEffect } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { clearStore } from "./redux/actions";
import "./Modal.css";

Modal.setAppElement("#root");

const LogOutModal = ({ isOpen, onClose }) => {
  // const dispatch = useDispatch();
  // const history = useHistory();

  // const handleLogOut = async () => {
  //   try {
  //     await axios.post("/api/logout");
  //   } catch (error) {
  //     console.error("Error logging out:", error);
  //   } finally {
  //     dispatch(clearStore());
  //     localStorage.clear();
  //     history.push("/");
  //   }
  // };

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
        className="modal-content"
        overlayClassName="modal-backdrop"
      >
        <h2>Log out</h2>
        <p>Do you really want to leave?</p>
        <button className="modal-button" onClick={handleLogOut}>
          Log out
        </button>
        <button className="modal-button" onClick={onClose}>
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default LogOutModal;
