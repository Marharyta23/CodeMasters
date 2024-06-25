import Modal from "react-modal";

import css from "../Modal/Modal.module.css";

Modal.setAppElement("#root");

export default function ModalWrap({
  children,
  content,
  isOpen,
  onRequestClose,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      overlayClassName={css.overlay}
      className={css.modal}
      content={content}
    >
      <button
        type="button"
        className={css.modalCloseButton}
        onClick={onRequestClose}
      >
        <svg className={css.icon} width="14" height="14">
          <use href="../../../src/img/icons.svg#icon-close"></use>
        </svg>
      </button>
      {children}
    </Modal>
  );
}
