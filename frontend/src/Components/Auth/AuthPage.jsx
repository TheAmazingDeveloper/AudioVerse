import React, { useRef, useState } from "react";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";
import { links } from "../../utils/constants.js";

function AuthPage() {
  const [isRegistered, setIsRegistered] = useState(true);

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
                <LoginPage
                  handleFormChange={() => {
                    setIsRegistered(false);
                  }}
                />
              ) : (
                <RegisterPage
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

export function BasicForm({
  handleEmail,
  handlePassword,
  validationErrors,
  primaryBtnText,
  secondaryBtnText1,
  secondaryBtnText2,
  handleFormChange,
}) {
  const passwordRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handlePasswordVisibility = (event) => {
    event.preventDefault();
    if (passwordVisible) {
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
    }
    setPasswordVisible((visibility) => !visibility);
  };
  return (
    <>
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={handleEmail}
        className="block text-lg p-3 w-full rounded-md border-2 border-[#e2e2e2] outline-none"
      />
      <span className="text-red-700 text-sm">
        {validationErrors.email == null ? "" : validationErrors.email}
      </span>
      <div className="p-3 flex justify-center items-center border-2 border-[#e2e2e2] rounded-md">
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          name="password"
          onChange={handlePassword}
          className="block w-full text-lg outline-none"
        />
        {passwordVisible ? (
          <button className="rounded-full" onClick={handlePasswordVisibility}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C0C0C0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-eye-off"
            >
              <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
              <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
              <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
              <path d="m2 2 20 20" />
            </svg>
          </button>
        ) : (
          <button className="rounded-full" onClick={handlePasswordVisibility}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C0C0C0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-eye"
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        )}
      </div>
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
