import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config/api';

export interface Course {
  _id: string;
  courseName: string;
  courseCode: string;
  description: string;
  duration: string;
  icon: string;
  bannerImage?: {
    url: string;
    publicId: string;
  };
  level: string;
  batchSize: string;
  features: string[];
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  isLimitedOffer: boolean;
  branchId?: string | any;
  facultyId?: string | any;
  credits?: number;
  semester?: number;
  isActive: boolean;
  syllabus?: string;
  prerequisites?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseRequest {
  courseName: string;
  courseCode: string;
  description: string;
  duration: string;
  icon?: string;
  level: string;
  batchSize?: string;
  features?: string[];
  originalPrice: number;
  discountedPrice: number;
  discountPercentage?: number;
  isLimitedOffer?: boolean;
  branchId?: string;
  facultyId?: string;
  credits?: number;
  semester?: number;
  syllabus?: string;
  prerequisites?: string[];
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

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include', // Send cookies with every request
    prepareHeaders: (headers) => {
      // No need to add Authorization header - using cookies only
      return headers;
    },
  }),
  tagTypes: ['Course'],
  endpoints: (builder) => ({
    getCourses: builder.query<PaginatedResponse<Course>, { page?: number; limit?: number; branchId?: string }>({
      query: ({ page = 1, limit = 10, ...params }) => ({
        url: '/courses',
        params: { page, limit, ...params },
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ _id }) => ({ type: 'Course' as const, id: _id })), 'Course']
          : ['Course'],
    }),
    getCourse: builder.query<{ success: boolean; data: Course }, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (result, error, id) => [{ type: 'Course', id }],
    }),
    getActiveCourses: builder.query<PaginatedResponse<Course>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/courses/active',
        params: { page, limit },
      }),
      providesTags: ['Course'],
    }),
    getCoursesByBranch: builder.query<PaginatedResponse<Course>, { branchId: string; page?: number; limit?: number }>({
      query: ({ branchId, page = 1, limit = 10 }) => ({
        url: `/courses/branch/${branchId}`,
        params: { page, limit },
      }),
      providesTags: ['Course'],
    }),
    getCoursesBySemester: builder.query<PaginatedResponse<Course>, { semester: number; branchId?: string; page?: number; limit?: number }>({
      query: ({ semester, branchId, page = 1, limit = 10 }) => ({
        url: `/courses/semester/${semester}`,
        params: { page, limit, branchId },
      }),
      providesTags: ['Course'],
    }),
    createCourse: builder.mutation<{ success: boolean; data: Course }, FormData>({
      query: (formData) => ({
        url: '/courses',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Course'],
    }),
    updateCourse: builder.mutation<{ success: boolean; data: Course }, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/courses/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Course', id }, 'Course'],
    }),
    deleteCourse: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),
    assignFacultyToCourse: builder.mutation<{ success: boolean; data: Course }, { courseId: string; facultyId: string }>({
      query: ({ courseId, facultyId }) => ({
        url: `/courses/${courseId}/assign-faculty`,
        method: 'POST',
        body: { facultyId },
      }),
      invalidatesTags: (result, error, { courseId }) => [{ type: 'Course', id: courseId }, 'Course'],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetActiveCoursesQuery,
  useGetCoursesByBranchQuery,
  useGetCoursesBySemesterQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useAssignFacultyToCourseMutation,
} = courseApi;