import { useId, useRef, useState } from "react";
import css from "./UserSettingsForm.module.css";
// import * as Yup from "yup";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import modalSprite from "../../img/svg/modalSprite.svg";
export default function UserSettingsForm() {
  const {
    register,
    // handleSubmit,

    formState: { errors },
    watch,
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      weight: 0,
      activeSportTime: 0,
      dailyWaterNorma: 0,
      gender: "",
    },
  });
  const nameId = useId();
  const emailId = useId();
  const [file, setFile] = useState(null); // состояние для хранения файла
  const fileInputRef = useRef(null); // объект ссылки для получения доступа к инпуту файла
  const onFileChange = (e) => {
    // обработчик события (извлекаем выбранный userom файл)
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // обновляем выбранный файл
  };

  return (
    <>
      <form className={css.form} encType="multipart/form-data">
        <div className={css.imageWrap}>
          <img
            // src={file ? URL.createObjectURL(file) : avatarURL}
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
              <use href="./src/img/icons.svg#icon-upload"></use>
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
                          ? `${modalSprite}#icon-radio-active`
                          : `${modalSprite}#icon-radio`
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
                          ? `${modalSprite}#icon-radio-active`
                          : `${modalSprite}#icon-radio`
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
                  <use xlinkHref={`${modalSprite}#icon-exclamation-mark`}></use>
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
                  errors.activeSportTime ? css.hasError : ""
                }`}
              >
                <label className={css.inputTitle}>
                  The time of active participation in sports:
                </label>
                <input
                  type="number"
                  name="activeSportTime"
                  className={css.inputField}
                  {...register("activeSportTime")}
                />
                {errors.activeSportTime && (
                  <p className={css.error}>{errors.activeSportTime.message}</p>
                )}
              </div>
            </div>
            <div className={`${css.partWrap} ${css.requiredAmountWrap}`}>
              <div className={css.requiredAmount}>
                <h3 className={css.inputTitle}>
                  The required amount of water in liters per day:
                </h3>
                <p className={`${css.accentText} ${css.accentLiter}`}>
                  {/* {calculate()} L */}
                </p>
              </div>
              <div
                className={`${css.inputContainer} ${
                  errors.dailyWaterNorma ? css.hasError : ""
                }`}
              >
                <label className={css.inputTitleBold}>
                  Write down how much water you will drink:
                </label>
                <input
                  type="number"
                  name="dailyWaterNorma"
                  className={css.inputField}
                  {...register("dailyWaterNorma")}
                />
                {errors.dailyWaterNorma && (
                  <p className={css.error}>{errors.dailyWaterNorma.message}</p>
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
