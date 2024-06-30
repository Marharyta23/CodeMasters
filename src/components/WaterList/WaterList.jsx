import { useDispatch, useSelector } from "react-redux";

import { openModal } from "../../redux/modal/slice";
import { selectWaterDataDay } from "../../redux/water/selectors";

import icons from "../../img/icons.svg";

import css from "./WaterList.module.css";

//teest
// const waterRecords = [
//     {
//         _id: "1234",
//         amountWater: 150,
//         date: new Date(),
//     },
//     {
//         _id: "343",
//         amountWater: 250,
//         date: new Date(),
//     },
//     {
//         _id: "3543",
//         amountWater: 350,
//         date: new Date(),
//     },
//     {
//         _id: "35343",
//         amountWater: 350,
//         date: new Date(),
//     },
//     {
//         _id: "35543",
//         amountWater: 350,
//         date: new Date(),
//     },
//     {
//         _id: "36543",
//         amountWater: 350,
//         date: new Date(),
//     },
// ];

export default function WaterList() {
  const waterRecords = useSelector(selectWaterDataDay);

  const dispatch = useDispatch();

  const showModal = (modalType, props) => {
    dispatch(openModal({ modalType, props }));
  };

  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const [selectedWaterId, setSelectedWaterId] = useState(null);

  // const openDeleteModal = (waterId) => {
  //     setSelectedWaterId(waterId);
  //     setIsDeleteModalOpen(true);
  // };

  // const closeDeleteModal = () => {
  //     setIsDeleteModalOpen(false);
  //     setSelectedWaterId(null);
  // };

  // const [modalState, setModalState] = useState({ isOpen: false, content: "" });
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const [selectedWaterRecord, setSelectedWaterRecord] = useState(null);

  // const handleOpenEditModal = (waterRecord) => {
  //     setSelectedWaterRecord(waterRecord);
  //     setModalState({ isOpen: true, content: "Edit" });
  // };

  // const closeEditModal = () => {
  //     setModalState({ isOpen: false, content: "" });
  // };

  // const handleOpenDeleteModal = (waterRecord) => {
  //     setIsDeleteModalOpen(true);
  //     setSelectedWaterRecord(waterRecord);
  // };

  // const closeDeleteModal = () => {
  //     setIsDeleteModalOpen(false);
  // };

  // const handleSubmit = (values) => {
  //     console.log("Form Submitted:", values);
  //     closeEditModal();
  // };
  //==============

  // const handleClick = (content) => {
  //     setModalState({ isOpen: true, content: content });
  // };

  // const handleClose = () => {
  //     setModalState({ isOpen: false, content: "" });
  // };
  //================

  // if (!waterRecords || waterRecords.length === 0) return;

  return (
    <div>
      <ul className={css.dailyInfo__StyledListAddWater}>
        {waterRecords.map((waterRecord) => {
          // const date = new Date(waterRecord.date);

          // const formattedTime = date.toLocaleTimeString("en-US", {
          //     hour: "numeric",
          //     minute: "2-digit",
          //     hour12: true,
          // });

          // const updatedWaterRecord = {
          //     ...waterRecord,
          //     date: formattedTime,
          // };

          // const hours = date.getUTCHours();
          // const minutes = date.getUTCMinutes();
          // const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
          // const formattedHours = hours < 10 ? "0" + hours : hours;

          const time = waterRecord.time;
          const amount = waterRecord.amount;

          return (
            <li key={waterRecord._id} className={css.dailyInfo__listItem}>
              <svg className={css.dailyInfo__Icon} width="38" height="38">
                <use href={`${icons}#icon-glass`}></use>
              </svg>

              <div className={css.dailyInfo__centerContainer}>
                <div className={css.dailyInfo__dataContainer}>
                  <span className={css.dailyInfo__water}>{amount} ml</span>
                  <span className={css.dailyInfo__time}>{time}</span>
                </div>
              </div>

              <div className={css.dailyInfo__rightContainer}>
                <button
                  className={css.dailyInfo__iconButton}
                  onClick={() => showModal("WaterModalEdit", waterRecord._id)}
                >
                  <svg
                    className={css.dailyInfo__iconSvg}
                    width="14"
                    height="14"
                  >
                    <use href={`${icons}#icon-edit`}></use>
                  </svg>
                </button>
                <button
                  className={css.dailyInfo__iconButton}
                  onClick={() => showModal("DeleteWaterModal", waterRecord._id)}
                >
                  <svg
                    className={css.dailyInfo__iconSvg}
                    width="14"
                    height="14"
                  >
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
