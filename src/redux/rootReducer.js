import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/auth/authSlice";
import { infoSlice } from "./slice/user/userSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  user: infoSlice,
});

export default rootReducer;
