import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const audioVerseStore = configureStore({
  reducer: userReducer,
});

export default audioVerseStore;
