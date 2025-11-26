import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config/api';

export interface Faculty {
  _id: string;
  userId?: string | any;
  employeeId: string;
  name: string;
  email: string;
  image: {
    url: string;
    publicId: string;
  };
  specialization: string;
  qualification: string;
  experience: number;
  expertise: string[];
  courses?: string[] | any[];
  research?: Array<{
    title: string;
    description: string;
    publishedDate: string;
    journal: string;
  }>;
  achievements?: Array<{
    title: string;
    description: string;
    date: string;
  }>;
  officeHours?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FacultyWithUser extends Faculty {
  userId: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    branchId: string;
  };
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const facultyApi = createApi({
  reducerPath: 'facultyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include', // Send cookies with every request
    prepareHeaders: (headers) => {
      // No need to add Authorization header - using cookies only
      return headers;
    },
  }),
  tagTypes: ['Faculty'],
  endpoints: (builder) => ({
    getFaculties: builder.query<PaginatedResponse<FacultyWithUser>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/faculty',
        params: { page, limit },
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ _id }) => ({ type: 'Faculty' as const, id: _id })), 'Faculty']
          : ['Faculty'],
    }),
    getFaculty: builder.query<{ success: boolean; data: FacultyWithUser }, string>({
      query: (id) => `/faculty/${id}`,
      providesTags: (result, error, id) => [{ type: 'Faculty', id }],
    }),
    getFacultyByUserId: builder.query<{ success: boolean; data: FacultyWithUser }, string>({
      query: (userId) => `/faculty/user/${userId}`,
      providesTags: (result, error, userId) => [{ type: 'Faculty', id: userId }],
    }),
    getFacultyCourses: builder.query<{ success: boolean; data: any[] }, string>({
      query: (id) => `/faculty/${id}/courses`,
      providesTags: (result, error, id) => [{ type: 'Faculty', id }],
    }),
    updateFaculty: builder.mutation<{ success: boolean; data: FacultyWithUser }, { id: string; updates: Partial<Faculty> }>({
      query: ({ id, updates }) => ({
        url: `/faculty/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Faculty', id }, 'Faculty'],
    }),
    getActiveFaculties: builder.query<PaginatedResponse<Faculty>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/faculty/active',
        params: { page, limit },
      }),
      providesTags: ['Faculty'],
    }),
    createFaculty: builder.mutation<{ success: boolean; data: Faculty }, FormData>({
      query: (formData) => ({
        url: '/faculty',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Faculty'],
    }),
    deleteFaculty: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/faculty/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Faculty'],
    }),
    toggleFacultyStatus: builder.mutation<{ success: boolean; data: Faculty }, string>({
      query: (id) => ({
        url: `/faculty/${id}/toggle-status`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Faculty', id }, 'Faculty'],
    }),
  }),
});

export const {
  useGetFacultiesQuery,
  useGetFacultyQuery,
  useGetFacultyByUserIdQuery,
  useGetFacultyCoursesQuery,
  useGetActiveFacultiesQuery,
  useCreateFacultyMutation,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
  useToggleFacultyStatusMutation,
} = facultyApi;