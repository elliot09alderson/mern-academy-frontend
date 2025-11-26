
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { logout } from '../slices/authSlice';
import { API_BASE_URL } from '../../config/api';

/**
 * Base query with automatic reauthentication handling
 * 
 * This wrapper intercepts all API responses and handles 401 Unauthorized errors globally.
 * When a 401 is detected, it:
 * 1. Immediately logs out the user (clears Redux state)
 * 2. Redirects to the appropriate login page
 * 3. Returns the original error for component-level handling
 */
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Create the base query with credentials for cookie-based auth
  const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include', // Send cookies with every request
    prepareHeaders: (headers) => {
      // No need to add Authorization header - using cookies only
      return headers;
    },
  });

  // Execute the query
  const result = await baseQuery(args, api, extraOptions);

  // Check if the response is a 401 Unauthorized error
  if (result.error && result.error.status === 401) {
    console.error('🚪 401 Unauthorized - Token expired or invalid');
    console.error('🚪 Logging out user immediately...');

    // Dispatch logout action to clear Redux state
    api.dispatch(logout());

    // Determine redirect path based on current location
    const currentPath = window.location.pathname;
    const isAdminRoute = currentPath.startsWith('/admin');
    const redirectPath = isAdminRoute ? '/admin/login' : '/login';

    console.log(`🚪 Redirecting to ${redirectPath}`);

    // Redirect to login page
    // Using window.location.href for a hard redirect to ensure clean state
    window.location.href = redirectPath;
  }

  // Return the result (error or success) for component-level handling
  return result;
};
