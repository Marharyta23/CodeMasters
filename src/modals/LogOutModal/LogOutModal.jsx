import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import css from "../DeleteWaterModal/DeleteWaterModal.module.css";
import { clearUser } from "../../redux/logout/authSlice";

const LogOutModal = ({ onRequestClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    // try {
    //   await axios.post("/api/logout");
    //   dispatch(clearUser());
    //   localStorage.clear();
    //   navigate("/");
    // } catch (error) {
    //   console.error("Error logging out:", error);
    // } finally {
    //   onRequestClose();
    // }
  };

  return (
    <div>
      <div className={css.modalContentWrapper}>
        <h2 className={css.modalTitle}>Log out</h2>
        <p className={css.modalText}>Do you really want to leave?</p>
        <div className={css.modalBtnWrapper}>
          <button className={css.modalBtn} onClick={handleLogOut}>
            Log out
          </button>
          <button className={css.modalBtnCancel} onClick={onRequestClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
