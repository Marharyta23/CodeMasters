import css from "./AddWaterBtn.module.css";

export default function AddWaterBtn() {
    return (
        <button type="button" className={css.addWaterBtn}>
            <svg className={css.addWaterBtnIcon} width="16" height="16">
                <use href="../../../src/img/icons.svg#icon-plus"></use>
            </svg>

            <p className={css.addWaterBtnText}>Add water</p>
        </button>
    );
}
