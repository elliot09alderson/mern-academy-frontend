import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useGetProfileQuery } from '@/store/api/authApi';
import { setCredentials, logout, selectIsAuthenticated } from '@/store/slices/authSlice';

/**
 * Hook to poll authentication status every 15 seconds
 * Keeps user data fresh and validates token
 */
export const useAuthPolling = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // Check if token exists in localStorage
  const token = localStorage.getItem('token');

  // Query to get profile - will run every 15 seconds if token exists
  const { data, isSuccess, isError, isFetching, refetch } = useGetProfileQuery(undefined, {
    skip: !token, // Only poll if token exists
    pollingInterval: 15000, // Poll every 15 seconds
    refetchOnMountOrArgChange: true,
  });

  // Log polling status on mount
  useEffect(() => {
    if (token) {
      console.log('🔄 Auth polling started - checking every 15 seconds');
    } else {
      console.log('⏸️  Auth polling paused - no token found');
    }
  }, [token]);

  // Handle successful authentication
  useEffect(() => {
    if (isSuccess && data && data.success) {
      const timestamp = new Date().toLocaleTimeString();
      console.log(`✅ [${timestamp}] Auth poll - User authenticated:`, data.data.name);

      // Update Redux store with fresh user data
      dispatch(setCredentials({
        user: data.data,
        token: token || ''
      }));
    }
  }, [isSuccess, data, dispatch, token]);

  // Handle authentication errors
  useEffect(() => {
    if (isError) {
      const timestamp = new Date().toLocaleTimeString();
      console.error(`❌ [${timestamp}] Auth poll - Token invalid or expired`);

      // Clear invalid token and logout
      localStorage.removeItem('token');
      dispatch(logout());
    }
  }, [isError, dispatch]);

  // Log when fetching
  useEffect(() => {
    if (isFetching && token) {
      const timestamp = new Date().toLocaleTimeString();
      console.log(`🔍 [${timestamp}] Auth poll - Validating token...`);
    }
  }, [isFetching, token]);

  // Manual refresh function
  const refreshAuth = () => {
    if (token) {
      console.log('🔄 Manual auth refresh triggered');
      refetch();
    }
  };

  return {
    isAuthenticated,
    isPolling: !!token,
    isFetching,
    refreshAuth
  };
};
