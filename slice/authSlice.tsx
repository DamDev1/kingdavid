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

const isBrowser = typeof window !== "undefined";

const getInitialUserInfo = (): UserInfo | null => {
  if (isBrowser) {
    try {
      const storedUserInfo = localStorage.getItem("userInfo");
      return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    } catch {
      console.error("Failed to parse userInfo from localStorage.");
      return null;
    }
  }
  return null;
};

const initialState: AuthState = {
  userInfo: getInitialUserInfo(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      if (isBrowser) {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      }
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      if (isBrowser) {
        localStorage.removeItem("userInfo");
      }
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

// Selector for userInfo
export const selectUserInfo = (state: { auth: AuthState }) =>
  state.auth.userInfo;

export default authSlice.reducer;
