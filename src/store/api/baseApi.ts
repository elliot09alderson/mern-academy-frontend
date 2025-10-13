import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define base query with credentials for cookies
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5003/api/v1',
  credentials: 'include', // Important for cookies
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// Create base API slice
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  tagTypes: ['Faculty', 'Student'],
  endpoints: () => ({}),
});