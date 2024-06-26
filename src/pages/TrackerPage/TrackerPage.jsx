import { useSelector } from "react-redux";

import { selectModalState } from "../../redux/modal/selector";

import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";

import ModalWrap from "../../modals/Modal/Modal";
import WaterModal from "../../modals/WaterModal/WaterModal";
import UserSettingsModal from "../../modals/UserSettingsModal/UserSettingsModal";
import LogOutModal from "../../modals/LogOutModal/LogOutModal";
import DeleteWaterModal from "../../modals/DeleteWaterModal/DeleteWaterModal";

import css from "./TrackerPage.module.css";

export default function TrackerPage() {
    const { modalType } = useSelector(selectModalState);

    return (
        <>
            <DocumentTitle>Water Tracker</DocumentTitle>

            <section className={css.tracker}>
                <WaterMainInfo />
                <WaterDetailedInfo />
            </section>

            <ModalWrap modalType={modalType}>
                {modalType === "WaterModalAdd" && <WaterModal content={"Add"} />}
                {modalType === "WaterModalEdit" && <WaterModal content={"Edit"} />}
                {modalType === "UserSettingsModal" && <UserSettingsModal />}
                {modalType === "LogOutModal" && <LogOutModal />}
                {modalType === "DeleteWaterModal" && <DeleteWaterModal />}
            </ModalWrap>
        </>
    );
}
