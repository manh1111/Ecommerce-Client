import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: [],
};

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    CHANGE_VALUE_USER: (state, action) => {
      state.info = [...state.info, action.payload];
    },
    DELETE_ALL_VALUES: (state) => {
      state.info = [];
    },
  },
});

export const { CHANGE_VALUE_USER, DELETE_ALL_VALUES } = infoSlice.actions;

export default infoSlice.reducer; 
