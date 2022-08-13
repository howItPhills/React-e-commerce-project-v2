import React, { useContext } from "react";
import SignUpForm from "../../components/Sign-up-form/SignUpForm";
import SignInForm from "../../components/Sign-in-form/SignInForm";

import "./sign-in-page.scss";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./../../redux/user/user.selectors";

const Authentication = () => {
  const currentUser = useSelector(selectCurrentUser);

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
