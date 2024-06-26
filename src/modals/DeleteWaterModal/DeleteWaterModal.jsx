import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import {
  deleteWater,
  fetchWaterData,
} from "../../redux/deleteWater/deleteWaterSlice";

import css from "./DeleteWaterModal.module.css";
import { closeModal } from "../../redux/modal/slice";

const DeleteWaterModal = ({ waterId }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleDelete = async () => {
    try {
      const resultAction = await dispatch(deleteWater(waterId));
      if (deleteWater.fulfilled.match(resultAction)) {
        toast.success("Record deleted successfully");
        dispatch(fetchWaterData());
        handleClose();
      } else {
        throw new Error(resultAction.payload || "Failed to delete record");
      }
    } catch (error) {
      toast.error("Error deleting record: " + error.message);
    }
  };

  return (
    <>
      <div className={css.modalContentWrapper}>
        <h2 className={css.modalTitle}>Delete entry</h2>
        <p className={css.modalText}>
          Are you sure you want to delete the entry?
        </p>
        <div className={css.modalBtnWrapper}>
          <button className={css.modalButton} onClick={handleDelete}>
            Delete
          </button>
          <button className={css.modalBtnCancel} onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>

      <Toaster position="top-right" />
    </>
  );
};

export default DeleteWaterModal;
