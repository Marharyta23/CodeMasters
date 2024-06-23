import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import Modal from "../../modals/Modal/Modal";

import css from "./TrackerPage.module.css";

export default function TrackerPage() {
    return (
        <>
            <DocumentTitle>Water Tracker</DocumentTitle>

            <section className={css.tracker}>
                <WaterMainInfo />
                <WaterDetailedInfo />
            </section>

            <Modal />
        </>
    );
}
