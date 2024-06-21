// export default function AdvantagesSection() {
//   return <></>;
// }

// import React from 'react';
import css from "./AdvantagesSection.module.css";

const AdvantagesSection = () => {
  return (
    <section style={{ backgroundImage: "url(/path/to/background.jpg)" }}>
      <h2 className={css.advatageText}>Our happy customers</h2>
      <ul>
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
    </section>
  );
};

export default AdvantagesSection;
