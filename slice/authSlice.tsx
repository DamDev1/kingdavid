// store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  avatar: string;
  token: string;
  user: {
    role: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

interface AuthState {
  userInfo: UserInfo | null;
}

const initialState: AuthState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      }
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
      }
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const selectUserInfo = (state: { auth: AuthState }) => state.auth.userInfo;
export default authSlice.reducer;
