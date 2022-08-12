import React, { useState } from "react";
import { createUserAuthWithEmailAndPassword } from "../../utils/firebase";
import InputField from "../InputField/InputField";
import { createUserDocument } from "../../utils/firebase";

import "./sign-up-form.scss";
import CustomButton from "../Custom-button/CustomButton";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const { user } = await createUserAuthWithEmailAndPassword(
          email,
          password
        );
        await createUserDocument(user, { displayName });
      } catch (error) {
        alert("failed", error.message);
      }
    } else {
      alert("Passwords do not match");
    }
    resetFormFields();
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Name"
          type="text"
          required
          value={displayName}
          onChange={onChangeHandler}
          name="displayName"
        />
        <InputField
          label="Email"
          type="email"
          required
          value={email}
          onChange={onChangeHandler}
          name="email"
        />
        <InputField
          label="Password"
          type="password"
          required
          value={password}
          onChange={onChangeHandler}
          name="password"
        />
        <InputField
          label="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          onChange={onChangeHandler}
          name="confirmPassword"
        />
        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </div>
  );
};

export default SignUpForm;
