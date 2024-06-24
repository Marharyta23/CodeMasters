import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";

import css from "./HomePage.module.css";
import { useState } from "react";
import DeleteWaterModal from "../../modals/DeleteWaterModal/DeleteWaterModal";
import LogOutModal from "../../modals/LogOutModal/LogOutModal";
import ModalWrap from "../../modals/Modal/Modal";

export default function HomePage() {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const renderModalContent = () => {
    switch (modalType) {
      case "delete":
        return <DeleteWaterModal isOpen={true} onClose={closeModal} />;
      case "logout":
        return <LogOutModal isOpen={true} onClose={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <div className={css.HomePageSection}>
      <DocumentTitle>Home Page</DocumentTitle>
      <WelcomeSection />
      <AdvantagesSection />
      <button onClick={() => openModal("delete")}>Delete Entry</button>
      <button onClick={() => openModal("logout")}>Log Out</button>

      <ModalWrap isOpen={modalType !== null} onRequestClose={closeModal}>
        {renderModalContent()}
      </ModalWrap>
    </div>
  );
}
