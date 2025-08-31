// src/slice/userSlice/user.slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Dummy Thunk (fetch user simulation)
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ id: 1, name: "John Doe", email: "john@example.com" });
    }, 1000)
  );
});

const initialState = {
  isAuthenticated: false,
  user: null,
  status: "idle", // idle | loading | succeeded | failed
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
