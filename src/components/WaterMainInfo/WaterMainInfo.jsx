import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modal/slice";

import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import Logo from "../Logo/Logo";

import css from "./WaterMainInfo.module.css";

export default function WaterMainInfo() {
    const dispatch = useDispatch();

    const showModal = (modalType) => {
        dispatch(openModal(modalType));
    };

    return (
        <div className={css.container}>
            <Logo />
            <WaterDailyNorma />
            <WaterProgressBar />
            <AddWaterBtn type="gray" onClick={() => showModal("WaterModalAdd")} />
        </div>
    );
}
