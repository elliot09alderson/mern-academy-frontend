import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config/api';

export interface User {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: 'admin' | 'student' | 'faculty';
  phone?: string;
  address?: string;
  branchId?: string;
  isActive: boolean;
  profilePicture?: string | null;
  createdAt?: string;
  updatedAt?: string;
  adminDetails?: {
    _id: string;
    adminId: string;
    department: string;
    permissions: string[];
    isSuperAdmin: boolean;
    lastLogin?: string | null;
    loginAttempts?: number;
    accountLocked?: boolean;
  };
  studentDetails?: any;
  facultyDetails?: any;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'student' | 'faculty';
  phone?: string;
  address?: string;
  branchId?: string;
  guardianName?: string;
  guardianContact?: string;
  specialization?: string;
  qualification?: string;
  experience?: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token?: string; // Token is in cookie, but might be in response
  };
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include', // Send cookies with every request
    prepareHeaders: (headers) => {
      // No need to add Authorization header - using cookies only
      return headers;
    },
  }),
  tagTypes: ['Auth', 'User'],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'User'],
    }),
    getProfile: builder.query<{ success: boolean; data: User }, void>({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation<{ success: boolean; data: User }, Partial<User>>({
      query: (updates) => ({
        url: '/auth/profile',
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation<{ success: boolean; message: string }, ChangePasswordRequest>({
      query: (passwords) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: passwords,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;