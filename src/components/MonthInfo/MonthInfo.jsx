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

import { selectUser } from "../../redux/auth/selectors";
import css from "./MonthInfo.module.css";
import icons from "../../img/icons.svg";
import { IconWrapper, Days, Day } from "./MonthlyList.styled";
import {
  selectWaterDataDay,
  selectWaterDataMonth,
} from "../../redux/water/selectors";
import {
  fetchWaterDataDay,
  fetchWaterDataMonth,
} from "../../redux/water/operations";

export default function MonthInfo() {
  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCurrentMonth, setIsCurrentMonth] = useState(true);

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
    const month = currentDate.getMonth() - 1;
    const year = currentDate.getFullYear();
    dispatch(fetchWaterDataMonth({ month, year }));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = addMonths(prevDate, 1);
      return endOfMonth(nextMonth);
    });
    const month = currentDate.getMonth() - 1;
    const year = currentDate.getFullYear();
    dispatch(fetchWaterDataMonth({ month, year }));
  };

  const handleDay = (date) => {
    const day = date.split("-")[2];
    const month = Number(date.split("-")[1]) - 1;
    const year = date.split("-")[0];

    dispatch(fetchWaterDataDay({ day, month, year }));
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

  const dailyWaterRate = useSelector(selectUser).dailyWaterRate * 1000;
  const waterDataDay = useSelector(selectWaterDataMonth);

  let waterPercentage = {};

  for (let i in waterDataDay.data) {
    if (i !== "days") {
      let totalWater = 0;
      if (waterDataDay.data[i].length > 0) {
        waterDataDay.data[i].map((water) => {
          totalWater += water.amount;
        });
      }

      let percent = Math.floor((totalWater / dailyWaterRate) * 100);

      if (percent > 100) {
        percent = 100;
      }

      waterPercentage[i] = percent;
    }
  }

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
            <div
              className={css.monthlyInfo__WaterItem}
              key={item.day}
              onClick={() => {
                handleDay(item.fullDate);
              }}
            >
              {/* {dayInfo.percentage} */} {/*todo*/}
              <Day
                className={css.monthlyInfo__Day}
                percentage={0}
                isToday={item.isToday}
              >
                {item.day}
              </Day>
              {/* {dayInfo.percentage} */} {/*todo*/}
              <p className={css.monthlyInfo__Percentage}>
                {waterPercentage[item.day]}%
              </p>
            </div>
          );
        })}
      </Days>
      {/* <CalendarPagination />
      <Calendar /> */}
    </div>
  );
}
