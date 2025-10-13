import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config/api';

export interface Branch {
  _id: string;
  branchName: string;
  branchCode: string;
  description: string;
  departmentHead?: string | any;
  totalSeats: number;
  availableSeats: number;
  establishedYear?: number;
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
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
    createBranch: builder.mutation<{ success: boolean; data: Branch }, CreateBranchRequest>({
      query: (branch) => ({
        url: '/branches',
        method: 'POST',
        body: branch,
      }),
      invalidatesTags: ['Branch'],
    }),
    updateBranch: builder.mutation<{ success: boolean; data: Branch }, { id: string; updates: Partial<CreateBranchRequest> }>({
      query: ({ id, updates }) => ({
        url: `/branches/${id}`,
        method: 'PUT',
        body: updates,
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