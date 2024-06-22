import WaterForm from "../WaterForm/WaterForm";
import css from "../WaterModal/WaterModal.module.css";

export default function WaterModal({
  title = "Add water",
  subtitle = "Choose a value",
}) {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>{title}</h2>
      <p className={css.subtitle}>{subtitle}</p>
      <WaterForm />
    </div>
  );
}
