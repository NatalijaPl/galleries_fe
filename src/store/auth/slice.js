import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  login: () => {},
  logout: () => {},
  register: () => {},
  refreshToken: () => {},
  getActiveUser: () => {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    activeUser: null,
  },
  reducers: {
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },

    ...middlewareActions,
  },
});

export const {
  login,
  logout,
  register,
  refreshToken,
  getActiveUser,
  setActiveUser,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;
