import { useDispatch, useSelector } from "react-redux";

import { openModal } from "../../redux/modal/slice";
import { selectWaterDataDay } from "../../redux/water/selectors";

import icons from "../../img/icons.svg";
import css from "./WaterList.module.css";

export default function WaterList() {
  const waterRecords = useSelector(selectWaterDataDay);

  const dispatch = useDispatch();

  const showModal = (modalType, props) => {
    dispatch(openModal({ modalType, props }));
  };

  return (
    <div>
      <ul className={css.dailyInfo__StyledListAddWater}>
        {waterRecords.map((waterRecord) => {
          const time = waterRecord.time;
          const amount = waterRecord.amount;

          const timeString12hr = new Date(
            "1970-01-01T" + time + "Z"
          ).toLocaleTimeString("en-US", {
            timeZone: "UTC",
            hour12: true,
            hour: "numeric",
            minute: "numeric",
          });

          return (
            <li key={waterRecord._id} className={css.dailyInfo__listItem}>
              <svg className={css.dailyInfo__Icon} width="38" height="38">
                <use href={`${icons}#icon-glass`}></use>
              </svg>

              <div className={css.dailyInfo__centerContainer}>
                <div className={css.dailyInfo__dataContainer}>
                  <span className={css.dailyInfo__water}>{amount} ml</span>
                  <span className={css.dailyInfo__time}>{timeString12hr}</span>
                </div>
              </div>

              <div className={css.dailyInfo__rightContainer}>
                <button
                  className={css.dailyInfo__iconButton}
                  onClick={() => showModal("WaterModalEdit", waterRecord._id)}
                >
                  <svg className={css.dailyInfo__iconSvg}>
                    <use href={`${icons}#icon-edit`}></use>
                  </svg>
                </button>
                <button
                  className={css.dailyInfo__iconButton}
                  onClick={() => showModal("DeleteWaterModal", waterRecord._id)}
                >
                  <svg className={css.dailyInfo__iconSvg}>
                    <use href={`${icons}#icon-delete`}></use>
                  </svg>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
