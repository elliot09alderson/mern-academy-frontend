import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export interface Offer {
  _id: string;
  text: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export const offerApi = createApi({
  reducerPath: 'offerApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Offer'],
  endpoints: (builder) => ({
    getOffers: builder.query<{ success: boolean; count: number; data: Offer[] }, { isActive?: boolean }>({
      query: ({ isActive } = {}) => ({
        url: '/offers',
        params: isActive !== undefined ? { isActive } : {},
      }),
      providesTags: ['Offer'],
    }),
    createOffer: builder.mutation<{ success: boolean; data: Offer }, { text: string; isActive?: boolean; order?: number }>({
      query: (body) => ({ url: '/offers', method: 'POST', body }),
      invalidatesTags: ['Offer'],
    }),
    updateOffer: builder.mutation<{ success: boolean; data: Offer }, { id: string; text?: string; isActive?: boolean; order?: number }>({
      query: ({ id, ...body }) => ({ url: `/offers/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Offer'],
    }),
    deleteOffer: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/offers/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Offer'],
    }),
    toggleOfferStatus: builder.mutation<{ success: boolean; data: Offer }, string>({
      query: (id) => ({ url: `/offers/${id}/toggle`, method: 'PATCH' }),
      invalidatesTags: ['Offer'],
    }),
  }),
});

export const {
  useGetOffersQuery,
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
  useToggleOfferStatusMutation,
} = offerApi;
