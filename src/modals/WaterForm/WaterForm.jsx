import { useState } from "react";
import css from "../WaterForm/WaterForm.module.css";

function getCurrentTime() {
  const now = new Date();
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
const currentTime = getCurrentTime();

export default function WaterForm() {
  const [waterAmount, setWaterAmount] = useState(50);

  const derementWaterAmount = () => {
    setWaterAmount(waterAmount - 50);
  };

  const incrementWaterAmount = () => {
    setWaterAmount(waterAmount + 50);
  };

  return (
    <form className={css.form}>
      <p className={css.text}>Amount of water:</p>
      <div className={css.amountWrap}>
        <button
          className={css.amountBtn}
          type="button"
          disabled={waterAmount === 0 ? true : false}
          onClick={derementWaterAmount}
        >
          <svg className={css.icon} width="14" height="14">
            <use href="../../../src/img/icons.svg#icon-plus"></use>
          </svg>
        </button>

        <span className={css.amount}>{waterAmount} ml</span>

        <button
          className={css.amountBtn}
          type="button"
          disabled={waterAmount === 5000 ? true : false}
          onClick={incrementWaterAmount}
        >
          <svg className={css.icon} width="14" height="14">
            <use href="../../../src/img/icons.svg#icon-plus"></use>
          </svg>
        </button>
      </div>

      <div className={css.inputWrap}>
        <label className={css.label}>
          <span className={css.timeSpan}> Recording time:</span>
          <input
            className={css.input}
            type="number"
            name="time"
            placeholder={currentTime}
          />
        </label>

        <label className={css.label}>
          <span className={css.amountSpan}>
            Enter the walue of the water used:
          </span>
          <input
            className={css.input}
            type="number"
            name="amount"
            placeholder={waterAmount}
          />
        </label>

        <button className={css.saveBtn} type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
