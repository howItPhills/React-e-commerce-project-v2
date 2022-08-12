import React from "react";
import "./custom-button.scss";

const BUTTON_TYPES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const CustomButton = ({ children, buttonType, ...rest }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPES[buttonType]}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default CustomButton;
