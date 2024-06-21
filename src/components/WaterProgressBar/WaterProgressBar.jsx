import css from "./WaterProgressBar.module.css";

export default function WaterProgressBar() {
    return (
        <div className={css.progressBarContainer}>
            <p className={css.progressBarText}>Today</p>

            <div className={css.barScaleActiveContainer}>
                <p className={css.barScaleActiveText}>25%</p>
            </div>

            <div className={css.barContainer}>
                <div className={css.bar}></div>
            </div>

            <div className={css.barScaleContainer}>
                <p className={css.barScaleText}>0%</p>
                <p className={css.barScaleText}>50%</p>
                <p className={css.barScaleText}>100%</p>
            </div>
        </div>
    );
}
