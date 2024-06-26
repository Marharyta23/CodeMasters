import WaterForm from "../WaterForm/WaterForm.jsx";
import { useSelector } from "react-redux";
import { selectModalState } from "../../redux/modal/selector";

import css from "../WaterModal/WaterModal.module.css";

export default function WaterModal({ waterRecord }) {
  const { modalType } = useSelector(selectModalState);

  return (
    <div className={css.wrapper}>
      <h2 className={css.formTitle}>
        {modalType === "WaterModalAdd"
          ? "Add water"
          : "Edit the entered amount of water"}
      </h2>
      <p className={css.subtitle}>
        {modalType === "WaterModalAdd"
          ? "Choose a value:"
          : "Correct entered data:"}
      </p>
      <WaterForm selectedWaterRecord={waterRecord} />
    </div>
  );
}
