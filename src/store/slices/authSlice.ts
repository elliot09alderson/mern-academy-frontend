import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  fullname: string;
  email: string;
  phonenumber?: string;
  qualification?: string;
  hereaboutus?: string;
  specialization?: string;
  isActive: boolean;
  userType: 'student' | 'faculty';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  userType: 'student' | 'faculty' | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
  userType: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; token: string; userType: 'student' | 'faculty' }>) => {
      const { user, token, userType } = action.payload;
      state.user = { ...user, userType };
      state.token = token;
      state.userType = userType;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userType = null;
      state.isAuthenticated = false;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setCredentials, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUserType = (state: { auth: AuthState }) => state.auth.userType;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;