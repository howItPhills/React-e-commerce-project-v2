import React, { useState } from "react";
import {
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase";

import CustomButton from "../Custom-button/CustomButton";
import InputField from "./../InputField/InputField";

import "./sign-in-form.scss";

const defaultFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFields);

  const { email, password } = formFields;

  const onUserSignInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await signInUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.code);
    }
    setFormFields(defaultFields);
  };
  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with Email and password</span>
      <form onSubmit={onSubmitHandler}>
        <InputField
          label="Email"
          type="text"
          value={email}
          onChange={onChangeHandler}
          name="email"
          required
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={onChangeHandler}
          name="password"
          required
        />
        <div className="buttons-group">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            buttonType="google"
            onClick={onUserSignInWithGoogle}
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
