import React from "react";

import Spinner from "../../assets/preloader.svg";

import "./preloader.scss";

const Preloader = () => {
  return (
    <div className="preloader-container">
      <img src={Spinner} alt="spinner" />
    </div>
  );
};

export default Preloader;
