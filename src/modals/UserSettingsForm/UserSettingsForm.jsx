import { useId, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// import { selectUserAvatar } from "../../redux/userSettings/selector";
// import { currentUser, updateUserInfo } from "../../redux/userSettings/operations";
import { selectUser } from "../../redux/auth/selectors";
import { updateUserInfo } from "../../redux/auth/operations";

import { errorToast, successToast } from "../../helpers/toast";
import modalIcons from "../../img/icons.svg";

import css from "./UserSettingsForm.module.css";

const schema = Yup.object().shape({
  name: Yup.string().min(2, "Name is required!").max(50, "Too long!"),
  email: Yup.string().email("Invalid email").min(2, "Email is required!"),
  weight: Yup.number()
    .typeError(" must be a number")
    .min(0, "weight must be 0 or more")
    .max(200, "Weight must be less than or equal to 200"),
  activeTimeSport: Yup.number()
    .typeError("Active sport time must be a number")
    .min(0, "Time active sport must be 0 or more")
    .max(1000, "Time must be less than or equal to 1000"),
  dailyWaterRate: Yup.number()
    .typeError(" must be a number")
    .positive("Water consumption must be a positive number")
    .max(10000, "Water consumption must be less than or equal to 10000"),
  gender: Yup.string().oneOf(["woman", "man", ""]).nullable(),
});
export default function UserSettingsForm({ onCLose }) {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const avatarURL = user.avatarURL;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      gender: "",
      weight: 0,
      activeTimeSport: 0,
      dailyWaterRate: 0,
    },
  });

  const nameId = useId();
  const emailId = useId();
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); // объект ссылки для получения доступа к инпуту файла

  const onFileChange = (e) => {
    // обработчик события (извлекаем выбранный userom файл)
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // обновляем
  };

  // функция расчёта нормы воды
  const calculate = () => {
    const weight = parseFloat(watch("weight")) || 0;
    const activeTimeSport = parseFloat(watch("activeTimeSport")) || 0;
    if (watch("gender") === "woman") {
      return (weight * 0.03 + activeTimeSport * 0.4).toFixed(1);
    } else if (watch("gender") === "man") {
      return (weight * 0.04 + activeTimeSport * 0.6).toFixed(1);
    }
    return 0;
  };

  // обработка отправки формы
  const submit = async (userData) => {
    console.log("userData: ", userData);
    const formData = new FormData(); // создаём объект formData
    console.log("formData: ", formData);
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });
    if (file) {
      formData.append("avatar", file);
      console.log("file: ", file);
    }
    try {
      await dispatch(updateUserInfo(formData).unwrap()); // отправка данных(formData) на бек
      console.log("formData: ", formData);
      successToast("User updated successfuly");
      onCLose();
    } catch (error) {
      errorToast("Error: Unsuccessful update of user information", error);
    }
  };

  return (
    <>
      <form
        className={css.form}
        onSubmit={handleSubmit(submit)}
        encType="multipart/form-data"
      >
        <div className={css.imageWrap}>
          <img
            src={file ? URL.createObjectURL(file) : avatarURL}
            // конструкция позволяет динамически отображать выбранное пользователем изображение
            // (если оно выбрано) или аватар пользователя(переменная avatarURL) (если изображение не выбрано или не загружено).
            alt="user avatar"
            className={css.avatarImg}
          />
          <label className={css.buttonUpload}>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className={css.imgInput}
              ref={fileInputRef}
            />
            <svg className={css.iconUpload} width="18" height="18">
              <use xlinkHref={`${modalIcons}#icon-upload`}></use>
            </svg>
            <p>Upload a photo</p>
          </label>
        </div>

        <div className={css.partWrap}>
          <div
            className={`${css.inputContainerGender} ${
              errors.gender ? css.hasError : ""
            }`}
          >
            <h2 className={css.inputTitleBold}>Your gender identity</h2>
            <div className={css.genderInputWrap}>
              <label className={css.radio}>
                <input
                  type="radio"
                  name="gender"
                  value="woman"
                  className={css.genderInput}
                  {...register("gender")}
                />
                <span className={css.iconWrap}>
                  <svg className={css.iconRadio} width="20" height="20">
                    <use
                      xlinkHref={
                        watch("gender") === "woman"
                          ? `${modalIcons}#icon-radio-active`
                          : `${modalIcons}#icon-radio`
                      }
                    ></use>
                  </svg>
                </span>
                woman
              </label>
              <label className={css.radio}>
                <input
                  type="radio"
                  name="gender"
                  value="man"
                  className={css.genderInput}
                  {...register("gender")}
                />
                <span className={css.iconWrap}>
                  <svg className={css.iconRadio} width="20" height="20">
                    <use
                      xlinkHref={
                        watch("gender") === "man"
                          ? `${modalIcons}#icon-radio-active`
                          : `${modalIcons}#icon-radio`
                      }
                    ></use>
                  </svg>
                </span>
                man
              </label>
            </div>
            {errors.gender && (
              <p className={css.error}>{errors.gender.message}</p>
            )}
          </div>
        </div>

        <div className={css.block}>
          <div className={css.blockWrap}>
            <div className={css.partWrap}>
              <div
                className={`${css.inputContainer} ${
                  errors.name ? css.hasError : ""
                }`}
              >
                <label htmlFor={nameId} className={css.inputTitleBold}>
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id={nameId}
                  className={`${css.inputField} ${
                    errors.name && css.inputError
                  }`}
                  {...register("name")}
                />
                {errors.name && (
                  <p className={css.error}>{errors.name.message}</p>
                )}
              </div>
              <div
                className={`${css.inputContainer} ${
                  errors.email ? css.hasError : ""
                }`}
              >
                <label htmlFor={emailId} className={css.inputTitleBold}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id={emailId}
                  className={css.inputField}
                  {...register("email")}
                />
                {errors.email && (
                  <p className={css.error}>{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className={css.partWrap}>
              <h2 className={`${css.inputTitleBold} ${css.dailyTitle}`}>
                My daily norma
              </h2>
              <div className={css.normaForm}>
                <div className={css.normaFormWoman}>
                  <h3 className={css.inputTitle}>For woman:</h3>
                  <p className={css.accentText}>V=(M*0,03) + (T*0,4)</p>
                </div>
                <div className={css.normaFormMan}>
                  <h3 className={css.inputTitle}>For man:</h3>
                  <p className={css.accentText}>V=(M*0,04) + (T*0,6)</p>
                </div>
              </div>
              <div className={css.border}>
                <p className={css.borderText}>
                  <span className={css.accentText}>*</span> V is the volume of
                  the water norm in liters per day, M is your body weight, T is
                  the time of active sports, or another type of activity
                  commensurate in terms of loads (in the absence of these, you
                  must set 0)
                </p>
              </div>
              <div className={css.activeTime}>
                <svg className={css.iconExclamation} width="18" height="18">
                  <use xlinkHref={`${modalIcons}#icon-exclamation-mark`}></use>
                </svg>
                <p>Active time in hours</p>
              </div>
            </div>
          </div>
          <div className={css.blockWrap}>
            <div className={css.partWrap}>
              <div
                className={`${css.inputContainer} ${
                  errors.weight ? css.hasError : ""
                }`}
              >
                <label className={css.inputTitle}>
                  Your weight in kilograms:
                </label>
                <input
                  type="number"
                  name="weight"
                  className={css.inputField}
                  {...register("weight")}
                />
                {errors.weight && (
                  <p className={css.error}>{errors.weight.message}</p>
                )}
              </div>
              <div
                className={`${css.inputContainer} ${
                  errors.activeTimeSport ? css.hasError : ""
                }`}
              >
                <label className={css.inputTitle}>
                  The time of active participation in sports:
                </label>
                <input
                  type="number"
                  name="activeTimeSport"
                  className={css.inputField}
                  {...register("activeTimeSport")}
                />
                {errors.activeTimeSport && (
                  <p className={css.error}>{errors.activeTimeSport.message}</p>
                )}
              </div>
            </div>
            <div className={`${css.partWrap} ${css.requiredAmountWrap}`}>
              <div className={css.requiredAmount}>
                <h3 className={css.inputTitle}>
                  The required amount of water in liters per day:
                </h3>
                <p className={`${css.accentText} ${css.accentLiter}`}>
                  {calculate()} L
                </p>
              </div>
              <div
                className={`${css.inputContainer} ${
                  errors.dailyWaterRate ? css.hasError : ""
                }`}
              >
                <label className={css.inputTitleBold}>
                  Write down how much water you will drink:
                </label>
                <input
                  type="number"
                  name="dailyWaterRate"
                  className={css.inputField}
                  {...register("dailyWaterRate")}
                />
                {errors.dailyWaterRate && (
                  <p className={css.error}>{errors.dailyWaterRate.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className={css.submitBtn}>
          Save
        </button>
      </form>
      {/* <Toaster /> */}
    </>
  );
}
