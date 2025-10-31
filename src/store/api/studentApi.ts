import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config/api';

export interface Achievement {
  title: string;
  description: string;
  date: string;
  category: 'academic' | 'sports' | 'cultural' | 'technical' | 'other';
}

export interface Student {
  _id: string;
  userId: string | any;
  studentId: string;
  rollNumber: string;
  admissionYear: number;
  currentSemester: number;
  gpa: number;
  attendance: number;
  guardianName: string;
  guardianContact: string;
  bloodGroup?: string;
  isOutstanding: boolean;
  achievements: Achievement[];
  createdAt: string;
  updatedAt: string;
}

export interface StudentWithUser extends Student {
  userId: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    branchId: string;
  };
}

export interface UpdateStudentRequest {
  currentSemester?: number;
  gpa?: number;
  attendance?: number;
  guardianName?: string;
  guardianContact?: string;
  bloodGroup?: string;
  isOutstanding?: boolean;
}

export interface AddAchievementRequest {
  title: string;
  description: string;
  date?: string;
  category: Achievement['category'];
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

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include', // Send cookies with every request
    prepareHeaders: (headers) => {
      // No need to add Authorization header - using cookies only
      return headers;
    },
  }),
  tagTypes: ['Student'],
  endpoints: (builder) => ({
    getStudents: builder.query<PaginatedResponse<StudentWithUser>, { page?: number; limit?: number; semester?: number }>({
      query: ({ page = 1, limit = 10, ...params }) => ({
        url: '/students',
        params: { page, limit, ...params },
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ _id }) => ({ type: 'Student' as const, id: _id })), 'Student']
          : ['Student'],
    }),
    getStudent: builder.query<{ success: boolean; data: StudentWithUser }, string>({
      query: (id) => `/students/${id}`,
      providesTags: (result, error, id) => [{ type: 'Student', id }],
    }),
    getOutstandingStudents: builder.query<PaginatedResponse<StudentWithUser>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/students/outstanding',
        params: { page, limit },
      }),
      providesTags: ['Student'],
    }),
    getTopPerformers: builder.query<{ success: boolean; data: StudentWithUser[] }, { limit?: number; branchId?: string }>({
      query: ({ limit = 10, branchId }) => ({
        url: '/students/top-performers',
        params: { limit, branchId },
      }),
      providesTags: ['Student'],
    }),
    getStudentsBySemester: builder.query<PaginatedResponse<StudentWithUser>, { semester: number; page?: number; limit?: number }>({
      query: ({ semester, page = 1, limit = 10 }) => ({
        url: `/students/semester/${semester}`,
        params: { page, limit },
      }),
      providesTags: ['Student'],
    }),
    updateStudent: builder.mutation<{ success: boolean; data: StudentWithUser }, { id: string; updates: UpdateStudentRequest }>({
      query: ({ id, updates }) => ({
        url: `/students/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Student', id }, 'Student'],
    }),
    updateGPA: builder.mutation<{ success: boolean; data: Student }, { studentId: string; gpa: number }>({
      query: ({ studentId, gpa }) => ({
        url: `/students/${studentId}/gpa`,
        method: 'PUT',
        body: { gpa },
      }),
      invalidatesTags: (result, error, { studentId }) => [{ type: 'Student', id: studentId }, 'Student'],
    }),
    updateAttendance: builder.mutation<{ success: boolean; data: Student }, { studentId: string; attendance: number }>({
      query: ({ studentId, attendance }) => ({
        url: `/students/${studentId}/attendance`,
        method: 'PUT',
        body: { attendance },
      }),
      invalidatesTags: (result, error, { studentId }) => [{ type: 'Student', id: studentId }, 'Student'],
    }),
    promoteStudent: builder.mutation<{ success: boolean; data: Student }, string>({
      query: (studentId) => ({
        url: `/students/${studentId}/promote`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Student', id }, 'Student'],
    }),
    addAchievement: builder.mutation<{ success: boolean; data: Student }, { studentId: string; achievement: AddAchievementRequest }>({
      query: ({ studentId, achievement }) => ({
        url: `/students/${studentId}/achievements`,
        method: 'POST',
        body: achievement,
      }),
      invalidatesTags: (result, error, { studentId }) => [{ type: 'Student', id: studentId }],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useGetOutstandingStudentsQuery,
  useGetTopPerformersQuery,
  useGetStudentsBySemesterQuery,
  useUpdateStudentMutation,
  useUpdateGPAMutation,
  useUpdateAttendanceMutation,
  usePromoteStudentMutation,
  useAddAchievementMutation,
} = studentApi;