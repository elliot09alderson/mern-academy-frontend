import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { authApi } from './api/authApi';
import { courseApi } from './api/courseApi';
import { branchApi } from './api/branchApi';
import { eventApi } from './api/eventApi';
import { facultyApi } from './api/facultyApi';
import { studentApi } from './api/studentApi';
import { outstandingStudentApi } from './api/outstandingStudentApi';
import authReducer from './slices/authSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist auth state
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [branchApi.reducerPath]: branchApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [facultyApi.reducerPath]: facultyApi.reducer,
  [studentApi.reducerPath]: studentApi.reducer,
  [outstandingStudentApi.reducerPath]: outstandingStudentApi.reducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      courseApi.middleware,
      branchApi.middleware,
      eventApi.middleware,
      facultyApi.middleware,
      studentApi.middleware,
      outstandingStudentApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export hooks for typed usage
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;