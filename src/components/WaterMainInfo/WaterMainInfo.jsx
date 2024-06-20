import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";

export default function WaterMainInfo() {
  return (
    <>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </>
  );
}
