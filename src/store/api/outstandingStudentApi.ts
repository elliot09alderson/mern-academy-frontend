import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config/api';

export interface OutstandingStudent {
  _id: string;
  rank: number;
  name: string;
  image: {
    url: string;
    publicId: string;
  };
  college: string;
  company: string;
  role: string;
  package: string;
  skills: string[];
  achievement: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOutstandingStudentRequest {
  rank: number;
  name: string;
  image: File;
  college: string;
  company: string;
  role: string;
  packageAmount: string;
  skills: string[];
  achievement: string;
}

export const outstandingStudentApi = createApi({
  reducerPath: 'outstandingStudentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['OutstandingStudent'],
  endpoints: (builder) => ({
    getOutstandingStudents: builder.query<{ success: boolean; count: number; data: OutstandingStudent[] }, { isActive?: boolean }>({
      query: ({ isActive }) => ({
        url: '/outstanding-students',
        params: isActive !== undefined ? { isActive } : {},
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ _id }) => ({ type: 'OutstandingStudent' as const, id: _id })), 'OutstandingStudent']
          : ['OutstandingStudent'],
    }),
    getOutstandingStudent: builder.query<{ success: boolean; data: OutstandingStudent }, string>({
      query: (id) => `/outstanding-students/${id}`,
      providesTags: (result, error, id) => [{ type: 'OutstandingStudent', id }],
    }),
    createOutstandingStudent: builder.mutation<{ success: boolean; data: OutstandingStudent }, FormData>({
      query: (formData) => ({
        url: '/outstanding-students',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['OutstandingStudent'],
    }),
    updateOutstandingStudent: builder.mutation<{ success: boolean; data: OutstandingStudent }, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/outstanding-students/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'OutstandingStudent', id }, 'OutstandingStudent'],
    }),
    deleteOutstandingStudent: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/outstanding-students/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OutstandingStudent'],
    }),
    toggleStudentStatus: builder.mutation<{ success: boolean; data: OutstandingStudent }, string>({
      query: (id) => ({
        url: `/outstanding-students/${id}/toggle-status`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'OutstandingStudent', id }, 'OutstandingStudent'],
    }),
  }),
});

export const {
  useGetOutstandingStudentsQuery,
  useGetOutstandingStudentQuery,
  useCreateOutstandingStudentMutation,
  useUpdateOutstandingStudentMutation,
  useDeleteOutstandingStudentMutation,
  useToggleStudentStatusMutation,
} = outstandingStudentApi;
