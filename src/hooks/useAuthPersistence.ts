import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useGetProfileQuery } from '@/store/api/authApi';
import { setCredentials, logout } from '@/store/slices/authSlice';

export const useAuthPersistence = () => {
  const dispatch = useAppDispatch();
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const persistedAuth = useAppSelector((state) => state.auth);

  // Try to get user profile using cookies (no token check needed)
  // The cookie will be automatically sent with the request
  // Poll every 10 seconds to keep session alive and detect changes
  const { data, isSuccess, isError, isLoading, error, isFetching } = useGetProfileQuery(undefined, {
    pollingInterval: 10000, // Poll every 10 seconds
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  useEffect(() => {
    console.log('🔍 Auth Check - isSuccess:', isSuccess, 'isError:', isError, 'isLoading:', isLoading, 'isFetching:', isFetching);
    console.log('🔍 Auth Data:', data);
    console.log('🔍 Persisted Auth State:', persistedAuth.isAuthenticated);

    if (isSuccess && data) {
      console.log('✅ Auth persistence - API Success');
      console.log('📦 Response data:', JSON.stringify(data, null, 2));

      // Check if response has the expected structure
      // API returns: { success: true, data: { _id, name, email, role, adminDetails, ... } }
      if (data.success && data.data) {
        const userData = data.data;
        console.log('✅ User authenticated:', userData.email, 'Role:', userData.role);
        console.log('📋 User details:', {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          isActive: userData.isActive,
          hasAdminDetails: !!userData.adminDetails,
          isSuperAdmin: userData.adminDetails?.isSuperAdmin
        });

        // Update Redux store with complete user data including adminDetails
        dispatch(setCredentials({
          user: userData
        }));

        console.log('✅ Redux state updated - check AuthDebug panel');
        setInitialCheckDone(true);
      } else {
        console.warn('⚠️ Unexpected response format:', data);
        console.warn('Expected: { success: true, data: {...} }');
        console.warn('Received:', JSON.stringify(data, null, 2));
        setInitialCheckDone(true);
      }
    }

    if (isError) {
      console.error('❌ Auth persistence - Session invalid or expired');
      console.error('❌ Error details:', error);
      // Only clear Redux state if there's no persisted auth
      // This allows the app to work offline with persisted state
      if (!persistedAuth.isAuthenticated) {
        dispatch(logout());
      }
      setInitialCheckDone(true);
    }

    // If we have persisted auth but API is still loading, don't wait
    if (!isLoading && !isFetching && persistedAuth.isAuthenticated) {
      setInitialCheckDone(true);
    }
  }, [isSuccess, data, isError, isLoading, isFetching, dispatch, error, persistedAuth.isAuthenticated]);

  // Return loading state
  // We're checking auth if: 1) Initial API call is loading AND 2) Initial check not done yet
  const isCheckingAuth = (isLoading || isFetching) && !initialCheckDone && !persistedAuth.isAuthenticated;

  console.log('🎯 useAuthPersistence return:', {
    isCheckingAuth,
    isAuthenticated: persistedAuth.isAuthenticated,
    initialCheckDone,
    apiSuccess: isSuccess,
    hasData: !!data
  });

  return {
    isCheckingAuth,
    isAuthenticated: persistedAuth.isAuthenticated,
    isError,
  };
};