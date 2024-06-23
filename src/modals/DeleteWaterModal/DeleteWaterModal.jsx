import React, { useEffect } from "react";
import Modal from "react-modal";
// import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
// import { updateWaterData } from "./redux/actions";
import css from "./DeleteWaterModal.module.css";

Modal.setAppElement("#root");

const DeleteWaterModal = ({ isOpen, onClose, waterId }) => {
  // const dispatch = useDispatch();

  const handleDelete = async () => {
    // try {
    //   const response = await axios.delete(`/api/water/${waterId}`);
    //   if (response.status === 200) {
    //     toast.success("Record deleted successfully");
    //     dispatch(updateWaterData());
    //     onClose();
    //   } else {
    //     throw new Error("Failed to delete record");
    //   }
    // } catch (error) {
    //   toast.error("Error deleting record: " + error.message);
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

  // const customStyles = {
  //   overlay: {
  //     position: "fixed",
  //     top: 0,
  //     left: 0,
  //     right: 0,
  //     bottom: 0,
  //     border: "none",
  //     backgroundColor: "rgba(47, 47, 47, 0.60)",
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  //   content: {
  //     top: "50%",
  //     left: "50%",
  //     right: "auto",
  //     bottom: "auto",
  //     marginRight: "-50%",
  //     transform: "translate(-50%, -50%)",
  //     border: "none",
  //     backgroundColor: "var(--main-white)",
  //     overflow: "auto",
  //   },
  // };

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
          <h2 className={css.modalTitle}>Delete entry</h2>
          <p className={css.modalText}>
            Are you sure you want to delete the entry?
          </p>
          <div className={css.modalBtnWrapper}>
            <button className={css.modalButton} onClick={handleDelete}>
              Delete
            </button>
            <button className={css.modalBtnCancel} onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <Toaster position="top-right" />
    </div>
  );
};

export default DeleteWaterModal;
