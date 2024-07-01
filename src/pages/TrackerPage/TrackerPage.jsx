import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { selectModalState } from "../../redux/modal/selector";
import { fetchWaterDataDay, fetchWaterDataMonth } from "../../redux/water/operations";

import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";

import ModalWrap from "../../modals/Modal/Modal";
import WaterModal from "../../modals/WaterModal/WaterModal";
import UserSettingsModal from "../../modals/UserSettingsModal/UserSettingsModal";
import LogOutModal from "../../modals/LogOutModal/LogOutModal";
import DeleteWaterModal from "../../modals/DeleteWaterModal/DeleteWaterModal";

import { selectWaterLoading } from "../../redux/water/selectors";
import Loader from "../../components/Loader/Loader";

import css from "./TrackerPage.module.css";

export default function TrackerPage() {
    const dispatch = useDispatch();
    const { modalType, props } = useSelector(selectModalState);

    const loading = useSelector(selectWaterLoading);

    useEffect(() => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();

        dispatch(fetchWaterDataDay({ day, month, year }));
        dispatch(fetchWaterDataMonth({ month, year }));
    }, [dispatch]);

    return (
        <>
            {loading && <Loader />}
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
