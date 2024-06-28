import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
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
    const { modalType, props } = useSelector(selectModalState);

    return (
        <>
            <DocumentTitle>Water Tracker</DocumentTitle>

            <section className={css.tracker}>
                <WaterMainInfo />
                <WaterDetailedInfo />
            </section>

            <ModalWrap modalType={modalType}>
                {modalType === "WaterModalAdd" && <WaterModal />}
                {modalType === "WaterModalEdit" && <WaterModal waterRecord={props} />}
                {modalType === "UserSettingsModal" && <UserSettingsModal />}
                {modalType === "LogOutModal" && <LogOutModal />}
                {modalType === "DeleteWaterModal" && <DeleteWaterModal waterId={props} />}
            </ModalWrap>
            <Toaster />
        </>
    );
}
