import React from "react";
import "./sign-in-sign-up.styles.scss";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

/** Sign in and sign up page */
const SignInSignUp = () => (
  <div className="sign-in-sign-up">
    <SignIn />
    <SignUp />
  </div>
);
// TODO: handle form validations

export default SignInSignUp;
