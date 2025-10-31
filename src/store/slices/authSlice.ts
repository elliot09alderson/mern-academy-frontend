import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: 'admin' | 'student' | 'faculty';
  phone?: string;
  address?: string;
  profilePicture?: string;
  isActive: boolean;
  branchId?: string;
  adminDetails?: {
    _id: string;
    adminId: string;
    department: string;
    permissions: string[];
    isSuperAdmin: boolean;
  };
  studentDetails?: any;
  facultyDetails?: any;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  userType: 'admin' | 'student' | 'faculty' | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  userType: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; userType?: 'admin' | 'student' | 'faculty' }>) => {
      const { user, userType } = action.payload;
      console.log('🔐 Redux - setCredentials called', { user, userType });
      state.user = user;
      state.userType = userType || user.role;
      state.isAuthenticated = true;
      console.log('🔐 Redux - State updated', {
        isAuthenticated: state.isAuthenticated,
        userType: state.userType,
        userName: state.user?.name
      });
    },
    logout: (state) => {
      console.log('🚪 Redux - logout called');
      state.user = null;
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