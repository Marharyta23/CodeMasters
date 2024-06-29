import { useSelector } from "react-redux";

import { selectUser } from "../../redux/auth/selectors";

import css from "./WaterDailyNorma.module.css";

export default function WaterDailyNorma() {
    const user = useSelector(selectUser);
    const dailyWaterRate = user.dailyWaterRate;

    return (
        <div className={css.dailyNormaContainer}>
            <p className={css.dailyNormaNumber}>{dailyWaterRate} L</p>
            <p className={css.dailyNormaText}>My daily norma</p>
        </div>
    );
}
