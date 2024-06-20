import DailyInfo from "../DailyInfo/DailyInfo";
import MonthInfo from "../MonthInfo/MonthInfo";
import UserPanel from "../UserPanel/UserPanel";

export default function WaterDetailedInfo() {
  return (
    <>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </>
  );
}
