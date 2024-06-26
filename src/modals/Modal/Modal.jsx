import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import clsx from "clsx";

import { closeModal } from "../../redux/modal/slice";
import { selectModalState } from "../../redux/modal/selector";

import css from "../Modal/Modal.module.css";

Modal.setAppElement("#root");

export default function ModalWrap({ children, modalType }) {
  const dispatch = useDispatch();
  const { isOpen, modalType: currentModalType } = useSelector(selectModalState);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      isOpen={isOpen && currentModalType === modalType}
      onRequestClose={handleClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      overlayClassName={css.overlay}
      className={clsx(
        css.modal,
        modalType === "UserSettingsModal" ? css["settings"] : ""
      )}
    >
      <button
        type="button"
        className={css.modalCloseButton}
        onClick={handleClose}
      >
        <svg className={css.icon} width="24" height="24">
          <use href="../../../src/img/icons.svg#icon-close"></use>
        </svg>
      </button>

      {children}
    </Modal>
  );
}
