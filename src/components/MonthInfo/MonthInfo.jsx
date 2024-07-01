// import CalendarPagination from "../CalendarPagination/CalendarPagination";
// import Calendar from "../Calendar/Calendar";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDate,
  isToday,
  addMonths,
  isWithinInterval,
} from "date-fns";

import ChooseDate from "../ChooseDate/ChooseDate";

// components
import css from "./MonthInfo.module.css";
import icons from "../../img/icons.svg";
import { IconWrapper, Days, Day } from "./MonthlyList.styled";

//import { monthStatsThunk } from "../../redux/water/waterCalendar/selectors.js";
import {
  selectMonthStats,
  selectWaterRecords,
  selectForceRender,
} from "../../redux/waterCalendar/selectors.js";
import { useWater } from "../../hooks/useWater.js";

export default function MonthInfo() {
  const dispatch = useDispatch();

  /**
   * Test useWater
   */
  // const waterRecords = useSelector(useWater);
  // useEffect(() => {
  //   console.log("Water records: ", waterRecords);
  // }, [waterRecords]);
  /**
   * Test useWater
   */
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCurrentMonth, setIsCurrentMonth] = useState(true);

  //const { monthStats, waterRecords } = useWater();

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const lastDayNumber = endDate.getDate();

  const formattedDays = useMemo(() => {
    return days.map((day) => {
      const fullDate = format(day, "yyyy-MM-dd");
      return {
        day: getDate(day),
        isToday: isToday(day),
        fullDate,
      };
    });
  }, [days]);

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => startOfMonth(addMonths(prevDate, -1)));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = addMonths(prevDate, 1);
      return endOfMonth(nextMonth);
    });
  };

  useEffect(() => {
    const now = new Date();
    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);
    setIsCurrentMonth(
      isWithinInterval(currentDate, {
        start: startOfCurrentMonth,
        end: endOfCurrentMonth,
      })
    );
  }, [currentDate]);

  // useEffect(() => {
  //   dispatch(selectMonthStats(format(currentDate, "yyyy-MM-dd")));
  // }, [dispatch, currentDate]);

  const getInfoForDay = (monthStats, d) => {
    const [res] = monthStats.filter((el) => el.date === d);

    if (res) {
      const percentage =
        (res.percentage / 10).toFixed(1) * 10 > 100
          ? 100
          : (res.percentage / 10).toFixed(1) * 10;

      return {
        data: currentDate,
        dailyNorma: percentage === 0 ? 1.5 : res.dailyNorma / 1000,
        percentage:
          format(currentDate, "yyyy-MM-dd") === d
            ? waterRecords.percentageOfWaterConsumption
            : percentage,
        totalRecords: res.totalRecords,
      };
    } else {
      return {
        data: currentDate,
        dailyNorma: 1.5,
        percentage: 0,
        totalRecords: 0,
      };
    }
  };

  return (
    <div className={css.monthlyInfo__waterList}>
      <div className={css.monthlyInfo__HeaderCalendar}>
        <ChooseDate>Month</ChooseDate>
        <div className={css.monthlyInfo__Pagination}>
          <button
            onClick={handlePrevMonth}
            className={css.monthlyInfo__ButtonPagination}
          >
            <IconWrapper className={css.monthlyInfo__iconWrapper}>
              <svg>
                <use href={`${icons}#icon-arr-left`}></use>
              </svg>
            </IconWrapper>
          </button>
          <span className={css.monthlyInfo__CurrentMonth}>
            {format(currentDate, "MMMM yyyy")}
          </span>
          <button
            onClick={handleNextMonth}
            disabled={isCurrentMonth}
            className={css.monthlyInfo__ButtonPagination}
          >
            <IconWrapper
              className={css.monthlyInfo__iconWrapper}
              isCurrentMonth={isCurrentMonth}
            >
              <svg>
                <use href={`${icons}#icon-arr-right`}></use>
              </svg>
            </IconWrapper>
          </button>
        </div>
        <div className={css.monthlyInfo__Statistics}>
          <svg>
            <use href={`${icons}#icon-pie-chart`}></use>
          </svg>
        </div>
      </div>
      <Days className={css.monthlyInfo__Days} lastDayNumber={lastDayNumber}>
        {formattedDays.map((item) => {
          //const dayInfo = getInfoForDay(monthStats, item.fullDate);
          return (
            <div className={css.monthlyInfo__WaterItem} key={item.day}>
              {/* {dayInfo.percentage} */} {/*todo*/}
              <Day
                className={css.monthlyInfo__Day}
                percentage={0}
                isToday={item.isToday}
              >
                {item.day}
              </Day>
              {/* {dayInfo.percentage} */} {/*todo*/}
              <p className={css.monthlyInfo__Percentage}>{0}%</p>
            </div>
          );
        })}
      </Days>
      {/* <CalendarPagination />
      <Calendar /> */}
    </div>
  );
}
