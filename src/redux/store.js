import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { appSlice } from "./slice/app/appSlice";
import { authSlice } from "@redux/slice/auth/authSlice";
import { userSlice } from "@redux/slice/user/userSlice";

const rootReducer = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
});



export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
