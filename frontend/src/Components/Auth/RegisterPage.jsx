import React, { useRef, useState, useEffect } from "react";
import { links } from "../../utils/constants.js";
import { registerUser } from "../../utils/auth.js";
import CustomLogger from "../../utils/customLogger.js";
import { BasicForm } from "./AuthPage.jsx";
import { useNavigate } from "react-router-dom";
function RegisterPage({ handleFormChange }) {
  const navigate = useNavigate();
  const uploaderRef = useRef(null);
  const imageRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    avatar: null,
    displayName: null,
    email: null,
    password: null,
  });
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
        type="text"
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
        primaryBtnText={"Register"}
        secondaryBtnText1={"Already have an account?"}
        secondaryBtnText2={"Login"}
        handleFormChange={handleFormChange}
      />
    </form>
  );
}

export default RegisterPage;
