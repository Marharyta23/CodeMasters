// import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

import css from "./WelcomeSection.module.css";

const WelcomeSection = () => {
  return (
    <section className={css.welcomeSection}>
      <Logo />
      <h2 className={css.welcomeText}>Record daily water intake and track</h2>
      <h1 className={css.welcomeHeader}>Water consumption tracker</h1>
      <div className={css.welcomeBtnWrapper}>
        <Link to="/signup">
          <button className={css.tryBtn}>Try Tracker</button>
        </Link>
        <Link to="/signin">
          <button className={css.signInBtn}>Sign In</button>
        </Link>
      </div>
    </section>
  );
};

export default WelcomeSection;
