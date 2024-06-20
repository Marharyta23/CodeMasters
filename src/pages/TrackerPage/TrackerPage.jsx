import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";

export default function TrackerPage() {
  return (
    <>
      <DocumentTitle>Water Tracker</DocumentTitle>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </>
  );
}
