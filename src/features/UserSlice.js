import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
    },
    extendSession: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { login, logout, extendSession } = userSlice.actions;

export default userSlice.reducer;
