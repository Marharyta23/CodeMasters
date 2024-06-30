import { useSelector } from "react-redux";
import {
  selectForceRender,
  selectMonthStats,
  selectWaterRecords,
} from "../redux/waterCalendar/selectors.js";

export const useWater = () => ({
  waterRecords: useSelector(selectWaterRecords),
  monthStats: useSelector(selectMonthStats),
  forceRender: useSelector(selectForceRender),
});
