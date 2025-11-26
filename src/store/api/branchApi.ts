import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export interface Branch {
  _id: string;
  branchName: string;
  branchCode: string;
  description: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    fullAddress?: string;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    alternatePhone?: string;
  };
  operatingHours?: {
    weekdays?: string;
    weekends?: string;
  };
  facilities?: string[];
  isHeadquarters?: boolean;
  departmentHead?: string | any;
  totalSeats: number;
  availableSeats: number;
  establishedYear?: number;
  images?: {
    url: string;
    publicId: string;
    uploadedAt: string;
  }[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBranchRequest {
  branchName: string;
  branchCode: string;
  description: string;
  departmentHead?: string;
  totalSeats: number;
  availableSeats?: number;
  establishedYear?: number;
  images?: File[];
}

export interface BranchStatistics extends Branch {
  occupiedSeats: number;
  occupancyRate: string;
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

export const branchApi = createApi({
  reducerPath: 'branchApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Branch'],
  endpoints: (builder) => ({
    getBranches: builder.query<PaginatedResponse<Branch>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/branches',
        params: { page, limit },
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ _id }) => ({ type: 'Branch' as const, id: _id })), 'Branch']
          : ['Branch'],
    }),
    getBranch: builder.query<{ success: boolean; data: Branch }, string>({
      query: (id) => `/branches/${id}`,
      providesTags: (result, error, id) => [{ type: 'Branch', id }],
    }),
    getActiveBranches: builder.query<PaginatedResponse<Branch>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/branches/active',
        params: { page, limit },
      }),
      providesTags: ['Branch'],
    }),
    getBranchStatistics: builder.query<{ success: boolean; data: BranchStatistics }, string>({
      query: (id) => `/branches/${id}/statistics`,
      providesTags: (result, error, id) => [{ type: 'Branch', id }],
    }),
    createBranch: builder.mutation<{ success: boolean; data: Branch }, FormData>({
      query: (formData) => ({
        url: '/branches',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Branch'],
    }),
    updateBranch: builder.mutation<{ success: boolean; data: Branch }, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/branches/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Branch', id }, 'Branch'],
    }),
    deleteBranch: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/branches/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Branch'],
    }),
    assignDepartmentHead: builder.mutation<{ success: boolean; data: Branch }, { branchId: string; facultyId: string }>({
      query: ({ branchId, facultyId }) => ({
        url: `/branches/${branchId}/assign-head`,
        method: 'POST',
        body: { facultyId },
      }),
      invalidatesTags: (result, error, { branchId }) => [{ type: 'Branch', id: branchId }, 'Branch'],
    }),
  }),
});

export const {
  useGetBranchesQuery,
  useGetBranchQuery,
  useGetActiveBranchesQuery,
  useGetBranchStatisticsQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
  useAssignDepartmentHeadMutation,
} = branchApi;