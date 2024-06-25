import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import Logo from "../Logo/Logo";

import css from "./WaterMainInfo.module.css";
import { useState } from "react";
import ModalWrap from "../../modals/Modal/Modal";
import WaterModal from "../../modals/WaterModal/WaterModal";

export default function WaterMainInfo() {
  const [modalState, setModalState] = useState({ isOpen: false, content: "" });

  const handleClick = (content) => {
    setModalState({ isOpen: true, content: content });
  };

  const handleClose = () => {
    setModalState({ isOpen: false, content: "" });
  };

  return (
    <div className={css.container}>
      <Logo />
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn type="gray" onClick={() => handleClick("Add")} />

      {modalState.isOpen && (
        <ModalWrap isOpen={modalState.isOpen} onRequestClose={handleClose}>
          <WaterModal content={modalState.content} />
        </ModalWrap>
      )}
    </div>
  );
}
