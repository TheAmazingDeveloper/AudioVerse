import axios from "axios";
import { redirect } from "react-router-dom";
import { serverURL } from "./constants.js";

const getCurrentUser = async () => {
  const res = await axios.get(`${serverURL}/user/get-current-user`, {
    withCredentials: true,
  });

  const data = res.data.data;
  if (data.user == null) {
    return redirect("/auth");
  } else {
    return null;
  }
};

const registerUser = async (payload) => {
  const res = await axios.post(`${serverURL}/user/register`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return res.data;
};

const loginUser = async (payload) => {
  const res = await axios.post(`${serverURL}/user/login`, payload, {
    withCredentials: true,
  });
  return res.data;
};

export { getCurrentUser, registerUser, loginUser };
