import clsx from "clsx";
import addWaterIcon from "../../img/icons.svg#icon-plus";
import css from "./AddWaterBtn.module.css";

export default function AddWaterBtn({ type, className, onClick }) {
  console.log(addWaterIcon);
  return (
    <button
      type="button"
      className={clsx(css.addWaterBtn, css[type], className)}
      onClick={onClick}
    >
      {type === "gray" ? (
        <svg className={css.addWaterBtnIcon} width="16" height="16">
          <use href={addWaterIcon}></use>
        </svg>
      ) : (
        <div className={css.addWaterBtnIconContainer}>
          <svg className={css.addWaterBtnIcon} width="16" height="16">
            <use href={addWaterIcon}></use>
          </svg>
        </div>
      )}

      <p className={css.addWaterBtnText}>Add water</p>
    </button>
  );
}
