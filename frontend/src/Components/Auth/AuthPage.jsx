import React, { useRef, useState, useEffect } from "react";
import { links, serverURL } from "../../utils/constants.js";
import axios from "axios";
import { loginUser, registerUser } from "../../utils/auth.js";
import { redirect, useNavigate } from "react-router-dom";
import CustomLogger from "../../utils/customLogger.js";

function AuthPage() {
  const uploaderRef = useRef(null);
  const imageRef = useRef(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isRegistered, setIsRegistered] = useState(true);
  const [validationErrors, setValidationErrors] = useState({
    avatar: null,
    displayName: null,
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    try {
      imageRef.current.src = URL.createObjectURL(avatar);
    } catch {
      console.log(
        new CustomLogger(
          "(AuthPage.jsx)",
          "Avatar Url",
          "Error in generating url from avatarFile"
        )
      );
    }
  }, [avatar]);

  const imagePicker = (event) => {
    event.preventDefault();
    uploaderRef.current.click();
  };

  const handleUploader = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleDisplayName = (event) => {
    const displayName = event.target.value;
    if (displayName === "") {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        displayName: "Name cannot be empty.",
      }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        displayName: null,
      }));
      setDisplayName(displayName);
    }
  };

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

  const handleRegisteration = async (event) => {
    event.preventDefault();
    for (const element in validationErrors) {
      if (validationErrors[element] != null) {
        setValidationErrors();
      }
    }
    if (avatar == null) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        avatar: "Avatar cannot be empty",
      }));
    }
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("displayName", displayName);
    formData.append("email", email);
    formData.append("password", password);
    const res = await registerUser(formData);
    console.log(new CustomLogger("(AuthPage.jsx)", "Response User Data", res));
    if (res.statusCode == 401)
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: res.message,
      }));
    if (res.data.user != null) return navigate("/");
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

  return (
    <>
      <div className="h-screen bg-[#c6c7cb] p-4">
        <div className="flex rounded-2xl overflow-hidden max-h-full">
          <div className="flex flex-col justify-center items-center gap-14 w-1/2 bg-white p-4">
            <div className="w-1/2 text-center">
              <h1 className="text-7xl font-medium font-oceanwideSemibold">
                Hi there!
              </h1>
              <p>Welcome to AudioVerse</p>
            </div>
            <div className="w-1/2">
              {isRegistered ? (
                <Login
                  handleLogin={handleLogin}
                  handleEmail={handleEmail}
                  handlePassword={handlePassword}
                  validationErrors={validationErrors}
                  primaryBtnText={"Login"}
                  secondaryBtnText1={"Don't have an account?"}
                  secondaryBtnText2={"Register"}
                  handleFormChange={() => {
                    setIsRegistered(false);
                  }}
                />
              ) : (
                <Register
                  imageRef={imageRef}
                  uploaderRef={uploaderRef}
                  imagePicker={imagePicker}
                  handleRegisteration={handleRegisteration}
                  handleUploader={handleUploader}
                  validationErrors={validationErrors}
                  handleDisplayName={handleDisplayName}
                  handleEmail={handleEmail}
                  handlePassword={handlePassword}
                  primaryBtnText={"Register"}
                  secondaryBtnText1={"Already have an account?"}
                  secondaryBtnText2={"Login"}
                  handleFormChange={() => {
                    setIsRegistered(true);
                  }}
                />
              )}
            </div>
          </div>
          <div className="w-1/2 bg-black">
            <img src={`${links.authPageImage}`} />
          </div>
        </div>
      </div>
    </>
  );
}

function Login({
  handleLogin,
  handleEmail,
  handlePassword,
  validationErrors,
  primaryBtnText,
  secondaryBtnText1,
  secondaryBtnText2,
  handleFormChange,
}) {
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
        primaryBtnText={primaryBtnText}
        secondaryBtnText1={secondaryBtnText1}
        secondaryBtnText2={secondaryBtnText2}
        handleFormChange={handleFormChange}
      />
    </form>
  );
}
function Register({
  imageRef,
  uploaderRef,
  imagePicker,
  handleRegisteration,
  handleUploader,
  validationErrors,
  handleDisplayName,
  handleEmail,
  handlePassword,
  primaryBtnText,
  secondaryBtnText1,
  secondaryBtnText2,
  handleFormChange,
}) {
  return (
    <form className="space-y-6" onSubmit={handleRegisteration}>
      <button
        onClick={imagePicker}
        className="h-[7.8125em] w-[7.8125em] mx-auto flex justify-center items-center overflow-hidden rounded-full border-2 border-[#e2e2e2]"
      >
        <img ref={imageRef} src={`${links.addAvatarImage}`} />
      </button>
      <span className="block m-0 text-red-700 text-sm text-center">
        {validationErrors.avatar == null ? "" : validationErrors.avatar}
      </span>
      <input
        type="file"
        name="avatar"
        ref={uploaderRef}
        onChange={handleUploader}
        accept=".png, .jpg, .jpeg"
        hidden
      />
      <input
        placeholder="Name"
        name="displayName"
        onChange={handleDisplayName}
        className="block text-lg p-3 w-full rounded-md border-2 border-[#e2e2e2] outline-none"
      />
      <span className="text-red-700 text-sm">
        {validationErrors.displayName == null
          ? ""
          : validationErrors.displayName}
      </span>
      <BasicForm
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        validationErrors={validationErrors}
        primaryBtnText={primaryBtnText}
        secondaryBtnText1={secondaryBtnText1}
        secondaryBtnText2={secondaryBtnText2}
        handleFormChange={handleFormChange}
      />
    </form>
  );
}

function BasicForm({
  handleEmail,
  handlePassword,
  validationErrors,
  primaryBtnText,
  secondaryBtnText1,
  secondaryBtnText2,
  handleFormChange,
}) {
  return (
    <>
      <input
        placeholder="Email"
        name="email"
        onChange={handleEmail}
        className="block text-lg p-3 w-full rounded-md border-2 border-[#e2e2e2] outline-none"
      />
      <span className="text-red-700 text-sm">
        {validationErrors.email == null ? "" : validationErrors.email}
      </span>
      <input
        placeholder="Password"
        name="password"
        onChange={handlePassword}
        className="block text-lg p-3 w-full rounded-md border-2 border-[#e2e2e2] outline-none"
      />
      <span className="text-red-700 text-sm">
        {validationErrors.password == null ? "" : validationErrors.password}
      </span>
      <button
        type="submit"
        className="block w-full p-2 bg-black text-white text-xl font-medium rounded-3xl"
      >
        {primaryBtnText}
      </button>
      <div className="text-center">
        <button onClick={handleFormChange}>
          {secondaryBtnText1}
          <span className="text-base text-blue-600"> {secondaryBtnText2}</span>
        </button>
      </div>
    </>
  );
}
export default AuthPage;
