import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config/api';

export interface Testimonial {
  _id: string;
  name: string;
  title: string;
  role: string;
  description: string;
  rating: number;
  image: {
    url: string;
    publicId: string;
  };
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTestimonialRequest {
  name: string;
  title: string;
  role: string;
  description: string;
  rating: number;
  image: File;
  order?: number;
}

export const testimonialApi = createApi({
  reducerPath: 'testimonialApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['Testimonial'],
  endpoints: (builder) => ({
    getTestimonials: builder.query<{ success: boolean; count: number; data: Testimonial[] }, { isActive?: boolean; limit?: number }>({
      query: ({ isActive, limit }) => ({
        url: '/testimonials',
        params: {
          ...(isActive !== undefined && { isActive }),
          ...(limit && { limit }),
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ _id }) => ({ type: 'Testimonial' as const, id: _id })), 'Testimonial']
          : ['Testimonial'],
    }),
    getTestimonial: builder.query<{ success: boolean; data: Testimonial }, string>({
      query: (id) => `/testimonials/${id}`,
      providesTags: (result, error, id) => [{ type: 'Testimonial', id }],
    }),
    createTestimonial: builder.mutation<{ success: boolean; data: Testimonial }, FormData>({
      query: (formData) => ({
        url: '/testimonials',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Testimonial'],
    }),
    updateTestimonial: builder.mutation<{ success: boolean; data: Testimonial }, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/testimonials/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Testimonial', id }, 'Testimonial'],
    }),
    deleteTestimonial: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/testimonials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Testimonial'],
    }),
    toggleTestimonialStatus: builder.mutation<{ success: boolean; data: Testimonial }, string>({
      query: (id) => ({
        url: `/testimonials/${id}/toggle-status`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Testimonial', id }, 'Testimonial'],
    }),
  }),
});

export const {
  useGetTestimonialsQuery,
  useGetTestimonialQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useToggleTestimonialStatusMutation,
} = testimonialApi;
