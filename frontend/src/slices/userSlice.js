import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userName: null },
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload;
    },
    removeUser: (state) => {
      state.userName = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
