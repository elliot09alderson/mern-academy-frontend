import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export interface CourseInquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  hereAboutUs: 'linkedin' | 'friend' | 'college' | 'poster' | 'website' | 'googlemap' | 'other';
  message?: string;
  status: 'pending' | 'contacted' | 'enrolled' | 'rejected';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInquiryRequest {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  hereAboutUs: string;
  message?: string;
}

export interface UpdateInquiryRequest {
  status?: 'pending' | 'contacted' | 'enrolled' | 'rejected';
  notes?: string;
}

export interface InquiryPaginatedResponse {
  success: boolean;
  data: CourseInquiry[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface InquiryStatsResponse {
  success: boolean;
  data: {
    total: number;
    byStatus: Array<{
      _id: string;
      count: number;
    }>;
  };
}

export const inquiryApi = createApi({
  reducerPath: 'inquiryApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Inquiry'],
  endpoints: (builder) => ({
    getAllInquiries: builder.query<InquiryPaginatedResponse, { page?: number; limit?: number; status?: string }>({
      query: ({ page = 1, limit = 10, status }) => ({
        url: '/inquiries',
        params: {
          page,
          limit,
          ...(status && { status }),
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ _id }) => ({ type: 'Inquiry' as const, id: _id })), 'Inquiry']
          : ['Inquiry'],
    }),
    getInquiry: builder.query<{ success: boolean; data: CourseInquiry }, string>({
      query: (id) => `/inquiries/${id}`,
      providesTags: (result, error, id) => [{ type: 'Inquiry', id }],
    }),
    createInquiry: builder.mutation<{ success: boolean; message: string; data: CourseInquiry }, CreateInquiryRequest>({
      query: (data) => ({
        url: '/inquiries',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Inquiry'],
    }),
    updateInquiry: builder.mutation<{ success: boolean; message: string; data: CourseInquiry }, { id: string; data: UpdateInquiryRequest }>({
      query: ({ id, data }) => ({
        url: `/inquiries/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Inquiry', id }, 'Inquiry'],
    }),
    deleteInquiry: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/inquiries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Inquiry'],
    }),
    getInquiryStats: builder.query<InquiryStatsResponse, void>({
      query: () => '/inquiries/stats',
      providesTags: ['Inquiry'],
    }),
  }),
});

export const {
  useGetAllInquiriesQuery,
  useGetInquiryQuery,
  useCreateInquiryMutation,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
  useGetInquiryStatsQuery,
} = inquiryApi;
