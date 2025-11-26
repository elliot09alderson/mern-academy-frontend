import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useGetProfileQuery } from '@/store/api/authApi';
import { setCredentials, logout } from '@/store/slices/authSlice';

/**
 * Hook for authentication persistence with smart validation
 * 
 * Strategy:
 * - Initial check on mount (only if persisted auth exists)
 * - Revalidate on window focus (user returns to tab)
 * - Revalidate on network reconnect
 * - NO continuous polling (401 interceptor handles expired tokens)
 */
export const useAuthPersistence = () => {
  const dispatch = useAppDispatch();
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const persistedAuth = useAppSelector((state) => state.auth);

  // Only make API call if we have persisted auth (user was previously logged in)
  // This prevents unnecessary API calls on first load for non-authenticated users
  const shouldCheckAuth = persistedAuth.isAuthenticated;

  // Smart validation: only on mount, focus, and reconnect
  const { data, isSuccess, isError, isLoading, error, isFetching } = useGetProfileQuery(undefined, {
    skip: !shouldCheckAuth, // Skip API call if user is not authenticated
    refetchOnMountOrArgChange: true,  // Check when component mounts
    refetchOnReconnect: true,          // Check when network reconnects
    refetchOnFocus: true,              // Check when user returns to tab
  });

  useEffect(() => {
    console.log('🔍 Auth Check - shouldCheckAuth:', shouldCheckAuth, 'isSuccess:', isSuccess, 'isError:', isError, 'isLoading:', isLoading);

    // If we're not checking auth (no persisted state), mark as done immediately
    if (!shouldCheckAuth) {
      console.log('⏭️ No persisted auth - skipping check');
      setInitialCheckDone(true);
      return;
    }

    if (isSuccess && data) {
      console.log('✅ Auth persistence - API Success');

      // Check if response has the expected structure
      if (data.success && data.data) {
        const userData = data.data;
        console.log('✅ User authenticated:', userData.email, 'Role:', userData.role);

        // Update Redux store with complete user data
        dispatch(setCredentials({
          user: userData
        }));

        console.log('✅ Redux state updated');
        setInitialCheckDone(true);
      } else {
        console.warn('⚠️ Unexpected response format:', data);
        setInitialCheckDone(true);
      }
    }

    if (isError) {
      console.error('❌ Auth persistence - Session invalid or expired');
      console.error('❌ Error details:', error);
      
      // Clear auth state on error
      dispatch(logout());
      setInitialCheckDone(true);
    }

    // If not loading and not fetching, mark as done
    if (!isLoading && !isFetching && shouldCheckAuth) {
      setInitialCheckDone(true);
    }
  }, [isSuccess, data, isError, isLoading, isFetching, dispatch, error, shouldCheckAuth]);

  // Return loading state
  // We're checking auth if: API is loading AND initial check not done AND we should check auth
  const isCheckingAuth = (isLoading || isFetching) && !initialCheckDone && shouldCheckAuth;

  console.log('🎯 useAuthPersistence return:', {
    isCheckingAuth,
    isAuthenticated: persistedAuth.isAuthenticated,
    initialCheckDone,
    shouldCheckAuth
  });

  return {
    isCheckingAuth,
    isAuthenticated: persistedAuth.isAuthenticated,
    isError,
  };
};