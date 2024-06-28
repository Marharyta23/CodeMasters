import { useDispatch } from "react-redux";

import { openModal } from "../../redux/modal/slice";

import ChooseDate from "../ChooseDate/ChooseDate";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterList from "../WaterList/WaterList";

import css from "./DailyInfo.module.css";

export default function DailyInfo() {
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const handleCrossbarButtonClick = () => {
    //     setIsModalOpen(true);
    // };

    const dispatch = useDispatch();

    const showModal = (modalType) => {
        dispatch(openModal({ modalType }));
    };

    return (
        <div className={css.dailyInfo}>
            <div className={css.dailyInfo__header}>
                <ChooseDate>Today</ChooseDate>
                <AddWaterBtn type="white" className={css.dailyInfo__button} onClick={() => showModal("WaterModalAdd")} />
            </div>
            <div className={css.dailyInfo__StyledAddWaterListFrame}>
                <WaterList />
            </div>
        </div>
    );
}
