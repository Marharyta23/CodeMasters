// import { useSelector } from "react-redux";

import css from "./WaterProgressBar.module.css";

export default function WaterProgressBar({ day, percent }) {
    if (!percent) {
        percent = 0;
    }

    if (!day) {
        day = "Today";
    }

    // const percent = useSelector((state) => state.percent);
    // const day = useSelector((state) => state.day);

    return (
        <div className={css.progressBarContainer}>
            <p className={css.progressBarText}>{day}</p>

            <div className={css.barScaleActiveContainer}>
                <p className={css.barScaleActiveText} style={{ left: `${percent}` }}>
                    {percent}%
                </p>
            </div>

            <div className={css.barContainer}>
                <div className={css.bar} style={{ width: `${percent}` }}></div>
            </div>

            <div className={css.barScaleContainer}>
                <p className={css.barScaleText}>0%</p>
                <p className={css.barScaleText}>50%</p>
                <p className={css.barScaleText}>100%</p>
            </div>
        </div>
    );
}
