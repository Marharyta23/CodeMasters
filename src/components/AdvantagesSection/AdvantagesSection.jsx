// export default function AdvantagesSection() {
//   return <></>;
// }

// import React from 'react';
import css from "./AdvantagesSection.module.css";

const AdvantagesSection = () => {
  return (
    // <section style={{ backgroundImage: "url(/path/to/background.jpg)"
    // }}>
    <section className={css.advantageSection}>
      <div className={css.advantageWrapper}>
        <div className={css.customersWrapper}>
          <h2 className={css.advatageText}>
            Our <span className={css.advatageTextAccent}> happy</span> customers
          </h2>
        </div>
        <div className={css.advatageBtnWrappeer}>
          <ul className={css.advatageBtnWrappeer}>
            <li>
              <button className={css.advatageBtnFirst}>Habit drive</button>
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
    </section>
  );
};

export default AdvantagesSection;
