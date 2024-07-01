import { useDispatch, useSelector } from "react-redux";
import { deleteWater } from "../../redux/water/operations";
import { selectModalState } from "../../redux/modal/selector";
import { closeModal } from "../../redux/modal/slice";
import { successToast, errorToast } from "../../helpers/toast";
import css from "./DeleteWaterModal.module.css";

const DeleteWaterModal = () => {
  const dispatch = useDispatch();
  const { props: waterId } = useSelector(selectModalState);

  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleDelete = async () => {
    try {
      dispatch(deleteWater(waterId));

      successToast("Record deleted successfully");

      dispatch(closeModal());
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
