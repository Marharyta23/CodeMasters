import { useDispatch } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";

import { openModal } from "../../redux/modal/slice";

import css from "./WaterList.module.css";
import { useState } from "react";

//teest
const waterRecords = [
  {
    _id: "1234",
    amountWater: 150,
    date: new Date(),
  },
  {
    _id: "343",
    amountWater: 250,
    date: new Date(),
  },
  {
    _id: "3543",
    amountWater: 350,
    date: new Date(),
  },
  {
    _id: "35343",
    amountWater: 350,
    date: new Date(),
  },
  {
    _id: "35543",
    amountWater: 350,
    date: new Date(),
  },
  {
    _id: "36543",
    amountWater: 350,
    date: new Date(),
  },
];

export default function WaterList() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWaterId, setSelectedWaterId] = useState(null);

  const openDeleteModal = (waterId) => {
    setSelectedWaterId(waterId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedWaterId(null);
  };

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

  const dispatch = useDispatch();

  const showModal = (modalType) => {
    dispatch(openModal(modalType));
  };

  return (
    <div>
      <ul className={css.dailyInfo__StyledListAddWater}>
        {waterRecords.map((waterRecord) => {
          const date = new Date(waterRecord.date);
          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
          // const hours = date.getUTCHours();
          // const minutes = date.getUTCMinutes();
          // const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
          // const formattedHours = hours < 10 ? "0" + hours : hours;

          return (
            <li key={waterRecord._id} className={css.dailyInfo__listItem}>
              <div className={css.dailyInfo__leftContainer}>
                <div className={css.dailyInfo__Icon}>
                  <svg>
                    <use href="../../src/img/icons.svg#icon-plus"></use>
                  </svg>
                </div>
                <div className={css.dailyInfo__dataContainer}>
                  <span className={css.dailyInfo__water}>
                    {waterRecord.amountWater} ml
                  </span>
                  <span className={css.dailyInfo__time}>{formattedTime}</span>
                </div>
              </div>
              <div className={css.dailyInfo__rightContainer}>
                <button
                  className={css.dailyInfo__iconButton}
                  onClick={() => openDeleteModal(waterRecord._id)}
                >
                  <FaEdit />
                </button>
                <button
                  className={css.dailyInfo__iconButton}
                  onClick={() => showModal("DeleteWaterModal")}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {isDeleteModalOpen && (
        <DeleteWaterModal
          onClose={closeDeleteModal}
          waterId={selectedWaterId}
        />
      )}
    </div>
  );
}
