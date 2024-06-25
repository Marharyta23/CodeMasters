import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import css from "../WaterForm/WaterForm.module.css";

const schema = yup.object().shape({
  time: yup.string().required("Please, enter the recorded time"),
  amount: yup
    .number()
    .min(1, "Amount of water must be more than 1 ml")
    .max(5000, "Amount of water must be less than 5000 ml")
    .typeError("Enter a valid amount of water in ml")
    .required("Value is required"),
});

function getCurrentTime() {
  const now = new Date();
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  // let seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

const currentTime = getCurrentTime();

const defaultValues = {
  time: currentTime,
  amount: 50,
};

export default function WaterForm({ content }) {
  const {
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const handleDerementWaterAmount = () => {
    const currentValue = getValues("amount");
    setValue("amount", currentValue - 50);
  };

  const handleIncrementWaterAmount = () => {
    const currentValue = getValues("amount");
    setValue("amount", currentValue + 50);
  };

  const onSubmit = (values, actions) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <p className={css.text}>Amount of water:</p>
      <div className={css.amountWrap}>
        <button
          className={css.amountBtn}
          type="button"
          disabled={getValues("amount") === 0 ? true : false}
          onClick={handleDerementWaterAmount}
        >
          <svg className={css.icon} width="14" height="14">
            <use href="../../img/icons.svg#icon-minus"></use>
          </svg>
        </button>

        <span className={css.amount}>{`${watch("amount")} ml`}</span>

        <button
          className={css.amountBtn}
          type="button"
          disabled={getValues("amount") === 5000 ? true : false}
          onClick={handleIncrementWaterAmount}
        >
          <svg className={css.icon} width="14" height="14">
            <use href="../../img/icons.svg#icon-plus"></use>
          </svg>
        </button>
      </div>

      <div className={css.inputWrap}>
        <label className={css.label}>
          <span className={css.timeSpan}> Recording time:</span>
          <input
            className={css.input}
            type="number"
            name="time"
            {...register("time")}
          />
        </label>

        <label className={css.label}>
          <span className={css.amountSpan}>
            Enter the value of the water used:
          </span>
          <input
            className={css.input}
            type="number"
            name="amount"
            {...register("amount")}
          />
        </label>

        <button className={css.saveBtn} type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
