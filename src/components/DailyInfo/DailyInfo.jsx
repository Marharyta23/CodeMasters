import { useDispatch, useSelector } from "react-redux";

import { openModal } from "../../redux/modal/slice";

import ChooseDate from "../ChooseDate/ChooseDate";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterList from "../WaterList/WaterList";

import css from "./DailyInfo.module.css";
import { selectWaterDataDay, selectDay } from "../../redux/water/selectors";

export default function DailyInfo() {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleCrossbarButtonClick = () => {
  //     setIsModalOpen(true);
  // };

  const dispatch = useDispatch();

  const showModal = (modalType) => {
    dispatch(openModal({ modalType }));
  };

  const today = new Date();

  const day = useSelector(selectDay);

  const getDay = () => {
    if (
      day.day == today.getDate() &&
      day.month == today.getMonth() + 1 &&
      day.year == today.getFullYear()
    ) {
      return "Today";
    }
    if (
      day.day == today.getDate() - 1 &&
      day.month == today.getMonth() + 1 &&
      day.year == today.getFullYear()
    ) {
      return "Yesterday";
    }
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return ` ${day.day}, ${months[day.month - 1]}`;
  };

  return (
    <div className={css.dailyInfo}>
      <div className={css.dailyInfo__header}>
        <ChooseDate>{getDay()}</ChooseDate>
        <AddWaterBtn
          type="white"
          className={css.dailyInfo__button}
          onClick={() => showModal("WaterModalAdd")}
        />
      </div>
      <div className={css.dailyInfo__StyledAddWaterListFrame}>
        <WaterList />
      </div>
    </div>
  );
}
