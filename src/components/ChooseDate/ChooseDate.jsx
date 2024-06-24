import css from "./ChooseDate.module.css";

export default function ChooseDate({ children }) {
  return <div className={css.dailyInfo__todayDate}>{children}</div>;
}
