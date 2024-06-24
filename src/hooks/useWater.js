import { useSelector } from "react-redux";
import {
  selectForceRender,
  selectMonthStats,
  selectWaterRecords,
} from "../redux/water/selectors.js";

export const useWater = () => ({
  waterRecords: useSelector(selectWaterRecords),
  monthStats: useSelector(selectMonthStats),
  forceRender: useSelector(selectForceRender),
});
