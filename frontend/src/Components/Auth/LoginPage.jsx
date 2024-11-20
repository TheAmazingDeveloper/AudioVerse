import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/auth";
import { BasicForm } from "./AuthPage";

function LoginPage({ handleFormChange }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    avatar: null,
    displayName: null,
    email: null,
    password: null,
  });
  const handleEmail = (event) => {
    const email = event.target.value;
    if (email == "") {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: "Emaiil cannot be empty.",
      }));
    } else if (!email.match(/[@]/)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email not valid",
      }));
    } else if (email.match(/[ ]/)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email not valid",
      }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: null,
      }));
      setEmail(email);
    }
  };

  const handlePassword = (event) => {
    const password = event.target.value;
    if (password === "") {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password cannot be empty.",
      }));
    } else if (password.length < 6 || password.length > 12) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password should be 6-12 characters long",
      }));
    } else if (!password.match(/[A-Z]/)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must contain atleast 1 uppercase character",
      }));
    } else if (!password.match(/[a-z]/)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must contain atleast 1 lowercase character",
      }));
    } else if (!password.match(/[0-9]/)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must contain atleast 1 number",
      }));
    } else if (!password.match(/[@#$]/)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must contain atleast one of these '@', '#', '$'",
      }));
    } else if (password.match(/[ ]/)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password cannot contain space",
      }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: null,
      }));
      setPassword(password);
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    for (const element in validationErrors) {
      if (validationErrors[element] != null) {
        setValidationErrors((prevErrors) => ({ ...prevErrors }));
      }
    }
    const res = await loginUser({ email, password });
    if (res.statusCode == 401)
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email/password",
        password: "Invalid email/password",
      }));
    if (res.data.user != null) return navigate("/");
  };
  // function Login({
  //     handleLogin,
  //     handleEmail,
  //     handlePassword,
  //     validationErrors,
  //     primaryBtnText,
  //     secondaryBtnText1,
  //     secondaryBtnText2,
  //     handleFormChange,
  //   }) {
  return (
    <form
      className="space-y-6"
      onSubmit={handleLogin}
      encType="application/x-www-form-urlencoded"
    >
      {/* TODO:Implement forgot password */}
      <BasicForm
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        validationErrors={validationErrors}
        primaryBtnText={"Login"}
        secondaryBtnText1={"Don't have an account?"}
        secondaryBtnText2={"Register"}
        handleFormChange={handleFormChange}
      />
    </form>
  );
}

export default LoginPage;
