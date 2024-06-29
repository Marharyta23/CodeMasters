import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectModalState } from "../../redux/modal/selector";
import iconPlus from "../../img/icons.svg#icon-plus";
import iconMinus from "../../img/icons.svg#icon-minus";
import { errorToast, successToast } from "../../helpers/toast";
import { addWater, updateWater } from "../../redux/water/operations";

import css from "../WaterForm/WaterForm.module.css";

const schema = yup.object().shape({
  time: yup
    .string()
    .required("Please, enter the recorded time!")
    .matches(/^\d{2}:\d{2}$/, {
      message: "Please, enter the correct recorded time: 00:00!",
      excludeEmptyString: false,
    }),
  amount: yup
    .number()
    .min(1, "Amount of water must be more than 1 ml!")
    .max(5000, "Amount of water must be less than 5000 ml!")
    .typeError("Enter a valid amount of water in ml!")
    .required("Please, enter the amount of water drunk!"),
});

const date = new Date();

const time = date.toLocaleTimeString().slice(0, -3);

const defaultValues = {
  time: time,
  amount: 50,
};

export default function WaterForm({ selectedWaterRecord }) {
  const { modalType } = useSelector(selectModalState);
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    getValues,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (selectedWaterRecord) {
      const date = new Date(selectedWaterRecord.date);
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      setValue("time", time);
      setValue("amount", selectedWaterRecord.amountWater);
    }
  }, [selectedWaterRecord, setValue]);

  const handleDerementWaterAmount = () => {
    const currentValue = getValues("amount");
    setValue("amount", currentValue - 50);
  };

  const handleIncrementWaterAmount = () => {
    const currentValue = getValues("amount");
    setValue("amount", currentValue + 50);
  };

  const onSubmit = (values) => {
    try {
      if (modalType === "WaterModalAdd") {
        const FormDataToAdd = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          ...values,
        };
        dispatch(addWater(FormDataToAdd));

        successToast("Water card added successfully!");
      } else {
        const FormDataToUpdate = {
            time: time,
          amount: values.amount,
        };
        dispatch(updateWater(selectedWaterRecord._id, FormDataToUpdate));

        successToast("Water card has been updated successfully!");
      }
    } catch (error) {
      errorToast("Runtime error");
      console.log(error.message);
    }
    reset();
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
            <use href={`${iconMinus}#icon-minus`}></use>
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
            <use href={`${iconPlus}#icon-plus`}></use>
          </svg>
        </button>
      </div>

      <div className={css.inputWrap}>
        <label className={errors.time ? css.labelError : css.label}>
          <span className={css.timeSpan}> Recording time:</span>
          <input
            className={errors.time ? css.inputError : css.input}
            type="string"
            name="time"
            {...register("time", { pattern: /^\d{2}:\d{2}$/ })}
          />
        </label>
        {errors.time && <p className={css.error}>{errors.time.message}</p>}

        <label className={errors.amount ? css.labelError : css.label}>
          <span className={css.amountSpan}>
            Enter the value of the water used:
          </span>
          <input
            className={errors.amount ? css.inputError : css.input}
            type="number"
            name="amount"
            {...register("amount")}
          />
        </label>
        {errors.amount && <p className={css.error}>{errors.amount.message}</p>}
      </div>
      <button className={css.saveBtn} type="submit">
        Save
      </button>
    </form>
  );
}
