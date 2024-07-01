import { useSelector } from "react-redux";

import { selectUser } from "../../redux/auth/selectors";
import { selectWaterDataDay } from "../../redux/water/selectors";

import css from "./WaterProgressBar.module.css";

export default function WaterProgressBar() {
    const dailyWaterRate = useSelector(selectUser).dailyWaterRate * 1000;
    const waterDataDay = useSelector(selectWaterDataDay);

    let totalWater = 0;

    waterDataDay.map((water) => {
        totalWater += water.amount;
    });

    let percent = Math.floor((totalWater / dailyWaterRate) * 100);

    if (percent > 100) {
        percent = 100;
    }

    return (
        <div className={css.progressBarContainer}>
            <p className={css.progressBarText}>Today</p>

            <div className={css.barScaleActiveContainer}>
                <p className={css.barScaleActiveText} style={{ left: `${percent}%` }}>
                    {percent}%
                </p>
            </div>

            <div className={css.barContainer}>
                <div className={css.bar} style={{ width: `${percent}%` }}></div>
            </div>

            <div className={css.barScaleContainer}>
                <p className={css.barScaleText}>0%</p>
                <p className={css.barScaleText}>50%</p>
                <p className={css.barScaleText}>100%</p>
            </div>
        </div>
    );
}
