import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { courseApi } from './api/courseApi';
import { branchApi } from './api/branchApi';
import { eventApi } from './api/eventApi';
import { facultyApi } from './api/facultyApi';
import { studentApi } from './api/studentApi';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [branchApi.reducerPath]: branchApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [facultyApi.reducerPath]: facultyApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
          'auth/login/fulfilled',
          'auth/register/fulfilled',
        ],
      },
    }).concat(
      authApi.middleware,
      courseApi.middleware,
      branchApi.middleware,
      eventApi.middleware,
      facultyApi.middleware,
      studentApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export hooks for typed usage
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;