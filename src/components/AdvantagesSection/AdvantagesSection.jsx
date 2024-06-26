import css from "./AdvantagesSection.module.css";

const AdvantagesSection = () => {
  return (
    <div className={css.advantageSection}>
      <div className={css.advantageWrapper}>
        <div className={css.customersWrapper}>
          <ul className={css.advantages_usersImg}>
            <li className={css.advantages_point}>
              <div className={`${css.user} ${css.user1}`}></div>
            </li>

            <li className={css.advantages_point}>
              <div className={`${css.user} ${css.user2}`}></div>
            </li>

            <li className={css.advantages_point}>
              <div className={`${css.user} ${css.user3}`}></div>
            </li>
          </ul>
          <h2 className={css.advatageText}>
            Our <span className={css.advatageTextAccent}> happy</span> customers
          </h2>
        </div>
        <div className={css.advatageBtnWrappeer}>
          <ul className={css.advatageBtnWrappeer}>
            <li>
              <button className={css.advatageBtnFirst}>
                {/* <div className={css.ellipse}></div> */}
                Habit drive
              </button>
            </li>
            <li>
              <button className={css.advatageBtnSecond}>View statistics</button>
            </li>
            <li>
              <button className={css.advatageBtnThird}>
                Personal rate setting
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdvantagesSection;
