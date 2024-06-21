import css from "./WaterDailyNorma.module.css";

export default function WaterDailyNorma() {
    return (
        <div className={css.dailyNormaContainer}>
            <p className={css.dailyNormaNumber}>1.5 L</p>
            <p className={css.dailyNormaText}>My daily norma</p>
        </div>
    );
}
