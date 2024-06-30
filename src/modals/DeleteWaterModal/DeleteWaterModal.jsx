import { useDispatch, useSelector } from "react-redux";

import { deleteWater, fetchWaterDataDay } from "../../redux/water/operations";

import css from "./DeleteWaterModal.module.css";
import { closeModal } from "../../redux/modal/slice";
import { successToast, errorToast } from "../../helpers/toast";

const DeleteWaterModal = ({ waterId }) => {
  const dispatch = useDispatch();
  const { day, month, year } = useSelector(
    (state) => state.water.currentDate || {}
  );

  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleDelete = async () => {
    try {
      const resultAction = await dispatch(deleteWater(waterId));
      if (deleteWater.fulfilled.match(resultAction)) {
        successToast("Record deleted successfully");
        dispatch(fetchWaterDataDay({ day, month, year }));
        handleClose();
      } else {
        throw new Error(resultAction.payload || "Failed to delete record");
      }
    } catch (error) {
      errorToast("Error deleting record: " + error.message);
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
    </>
  );
};

export default DeleteWaterModal;
