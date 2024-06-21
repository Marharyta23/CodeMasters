import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import Logo from "../Logo/Logo";

import css from "./WaterMainInfo.module.css";

export default function WaterMainInfo() {
    return (
        <div className={css.container}>
            <Logo />
            <WaterDailyNorma />
            <WaterProgressBar />
            <AddWaterBtn />
        </div>
    );
}
