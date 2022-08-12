import React, { useContext } from "react";
import SignUpForm from "../../components/Sign-up-form/SignUpForm";
import SignInForm from "../../components/Sign-in-form/SignInForm";

import "./sign-in-page.scss";
import { UserContext } from "./../../contexts/UserContext";
import { Navigate } from "react-router-dom";

const Authentication = () => {
  const { currentUser } = useContext(UserContext);

  return currentUser ? (
    <Navigate to="/" replace />
  ) : (
    <div className="sign-in-page">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
