import WaterForm from "../WaterForm/WaterForm.jsx";

import css from "../WaterModal/WaterModal.module.css";

export default function WaterModal({ content, waterRecord }) {
  let title, subtitle;
  if (content === "Add") {
    title = "Add water";
    subtitle = "Choose a value:";
  }

  if (content === "Edit") {
    title = "Edit the entered amount of water";
    subtitle = "Correct entered data:";
  }
  return (
    <div className={css.wrapper}>
      <h2 className={css.formTitle}>{title}</h2>
      <p className={css.subtitle}>{subtitle}</p>
      <WaterForm selectedWaterRecord={waterRecord} />
    </div>
  );
}
