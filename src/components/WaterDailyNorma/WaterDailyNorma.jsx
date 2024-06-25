// import { useSelector } from "react-redux";

import css from "./WaterDailyNorma.module.css";

export default function WaterDailyNorma({ count }) {
  if (!count) {
    count = 0;
  }

  // const count = useSelector((state) => state.count);

  return (
    <div className={css.dailyNormaContainer}>
      <p className={css.dailyNormaNumber}>{count} L</p>
      <p className={css.dailyNormaText}>My daily norma</p>
    </div>
  );
}
