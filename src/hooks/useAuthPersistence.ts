import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import { useGetProfileQuery } from '@/store/api/authApi';
import { setCredentials } from '@/store/slices/authSlice';

export const useAuthPersistence = () => {
  const dispatch = useAppDispatch();

  // Check if token exists in localStorage
  const token = localStorage.getItem('token');

  // Try to get user profile if token exists
  const { data, isSuccess, isError, isLoading } = useGetProfileQuery(undefined, {
    skip: !token, // Only try if token exists
  });

  useEffect(() => {
    if (isSuccess && data) {
      // Update Redux store with user data
      dispatch(setCredentials({
        user: data.data,
        token: token || '',
        userType: data.data.role
      }));
    }
  }, [isSuccess, data, dispatch, token]);

  // Return loading state
  return {
    isCheckingAuth: isLoading,
    isAuthenticated: isSuccess && !!data,
    isError,
  };
};