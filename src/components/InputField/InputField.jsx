import React from "react";
import "./form-input.scss";

const InputField = ({ label, ...rest }) => {
  return (
    <div className="group">
      <input {...rest} className="form-input" />
      {label && (
        <label
          className={`${rest.value.length ? "shrink" : ""} form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default InputField;
