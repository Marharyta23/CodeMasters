import { useState } from "react";
//import clsx from "clsx";

import ChooseDate from "../ChooseDate/ChooseDate";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterList from "../WaterList/WaterList";

import css from "./DailyInfo.module.css";

export default function DailyInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCrossbarButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={css.dailyInfo}>
      <div className={css.dailyInfo__header}>
        <ChooseDate>Today</ChooseDate>
        <AddWaterBtn
          type="white"
          className={css.dailyInfo__button}
          onClick={handleCrossbarButtonClick}
        />
      </div>
      <div className={css.dailyInfo__StyledAddWaterListFrame}>
        <WaterList />
      </div>
    </div>
  );
}
