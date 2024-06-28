import { Hearts } from "react-loader-spinner";

import css from "./Loader.module.css";

const Loader = () => {
  console.log("Loader is rendered");
  return (
    <div className={css.loader}>
      <Hearts
        height="80"
        width="80"
        color="#F4442E"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
