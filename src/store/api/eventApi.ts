import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config/api';

export interface EventImage {
  url: string;
  publicId?: string;
  caption?: string;
  uploadedAt: string;
}

export interface Event {
  _id: string;
  eventName: string;
  description: string;
  eventType: 'academic' | 'cultural' | 'sports' | 'technical' | 'workshop' | 'seminar' | 'other';
  category: 'Academic' | 'Cultural' | 'Sports' | 'Technical' | 'Workshop' | 'Seminar' | 'Other';
  startDate: string;
  endDate: string;
  venue: string;
  organizer: string;
  image: {
    url: string;
    publicId: string;
  };
  images: EventImage[];
  registrationLink?: string;
  maxParticipants?: number;
  registeredParticipants: string[] | any[];
  isActive: boolean;
  isFeatured: boolean;
  createdBy: string | any;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventRequest {
  eventName: string;
  description: string;
  eventType: Event['eventType'];
  category: Event['category'];
  startDate: string;
  endDate: string;
  venue: string;
  organizer: string;
  registrationLink?: string;
  maxParticipants?: number;
  isFeatured?: boolean;
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

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include', // Send cookies with every request
    prepareHeaders: (headers) => {
      // No need to add Authorization header - using cookies only
      return headers;
    },
  }),
  tagTypes: ['Event'],
  endpoints: (builder) => ({
    getEvents: builder.query<PaginatedResponse<Event>, { page?: number; limit?: number; eventType?: string }>({
      query: ({ page = 1, limit = 10, ...params }) => ({
        url: '/events',
        params: { page, limit, ...params },
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ _id }) => ({ type: 'Event' as const, id: _id })), 'Event']
          : ['Event'],
    }),
    getEvent: builder.query<{ success: boolean; data: Event }, string>({
      query: (id) => `/events/${id}`,
      providesTags: (result, error, id) => [{ type: 'Event', id }],
    }),
    getUpcomingEvents: builder.query<PaginatedResponse<Event>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/events/upcoming',
        params: { page, limit },
      }),
      providesTags: ['Event'],
    }),
    getPastEvents: builder.query<PaginatedResponse<Event>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/events/past',
        params: { page, limit },
      }),
      providesTags: ['Event'],
    }),
    getFeaturedEvents: builder.query<PaginatedResponse<Event>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/events/featured',
        params: { page, limit },
      }),
      providesTags: ['Event'],
    }),
    createEvent: builder.mutation<{ success: boolean; data: Event }, FormData>({
      query: (formData) => ({
        url: '/events',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Event'],
    }),
    updateEvent: builder.mutation<{ success: boolean; data: Event }, { id: string; updates: Partial<CreateEventRequest> }>({
      query: ({ id, updates }) => ({
        url: `/events/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Event', id }, 'Event'],
    }),
    deleteEvent: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),
    registerForEvent: builder.mutation<{ success: boolean; data: Event }, string>({
      query: (eventId) => ({
        url: `/events/${eventId}/register`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Event', id }, 'Event'],
    }),
    unregisterFromEvent: builder.mutation<{ success: boolean; data: Event }, string>({
      query: (eventId) => ({
        url: `/events/${eventId}/unregister`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Event', id }, 'Event'],
    }),
    uploadEventImage: builder.mutation<{ success: boolean; data: Event }, { eventId: string; formData: FormData }>({
      query: ({ eventId, formData }) => ({
        url: `/events/${eventId}/images`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventQuery,
  useGetUpcomingEventsQuery,
  useGetPastEventsQuery,
  useGetFeaturedEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useRegisterForEventMutation,
  useUnregisterFromEventMutation,
  useUploadEventImageMutation,
} = eventApi;