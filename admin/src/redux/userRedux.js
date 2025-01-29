// userRedux.js
import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "user",
    initialState: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    reducers: {
      loginStart: (state) => {
        state.currentUser = null;
        state.isFetching = true;
        state.error = false;
      },
      loginSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.isFetching = false;
        state.error = false;
        console.log("currentUser (in reducer):", state.currentUser); // Print here
      },
      loginFailure: (state) => {
        state.currentUser = null;
        state.isFetching = false;
        state.error = true;
      },
    },
  });
  
  export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
  export default userSlice.reducer;
  