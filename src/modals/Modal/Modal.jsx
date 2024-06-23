import Modal from "react-modal";

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

Modal.setAppElement("#root");

export default function ModalWrap({ children }) {
  return (
    <Modal
      // isOpen={true} //розкоментовуєте і модалка зʼявиться
      // onRequestClose={onClose}
      style={customStyles}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </Modal>
  );
}
