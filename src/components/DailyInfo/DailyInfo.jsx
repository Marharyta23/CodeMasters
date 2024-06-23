import ChooseDate from "../ChooseDate/ChooseDate";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterList from "../WaterList/WaterList";

export default function DailyInfo() {
    return (
        <>
            <ChooseDate />
            <AddWaterBtn type="white" />
            <WaterList />
        </>
    );
}
