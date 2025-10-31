import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/store';
import { selectIsAuthenticated, selectUserType } from '@/store/slices/authSlice';
import { Loader2 } from 'lucide-react';
import { useAuthPersistence } from '@/hooks/useAuthPersistence';

interface PrivateRouteProps {
  allowedRoles: ('admin' | 'faculty' | 'student')[];
}

export const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userType = useAppSelector(selectUserType);
  const currentUser = useAppSelector((state) => state.auth.user);
  const { isCheckingAuth } = useAuthPersistence();
  const location = useLocation();

  // Debug logging
  console.log('🛡️ PrivateRoute Check:', {
    isAuthenticated,
    userType,
    currentUser: currentUser?.email,
    isCheckingAuth,
    path: location.pathname,
    allowedRoles
  });

  // Show loading while checking authentication
  if (isCheckingAuth) {
    console.log('⏳ Showing loading screen - checking auth...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to appropriate login page
  if (!isAuthenticated) {
    console.log('❌ Not authenticated - redirecting to login');
    // Check if trying to access admin routes
    const isAdminRoute = location.pathname.startsWith('/admin');
    const redirectPath = isAdminRoute ? '/admin/login' : '/login';
    return <Navigate to={redirectPath} replace />;
  }

  console.log('✅ User is authenticated, checking roles...');

  // If authenticated but role doesn't match, redirect to unauthorized page
  if (userType && !allowedRoles.includes(userType)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center glass-card p-8 rounded-2xl max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // If authenticated and authorized, render child routes using Outlet
  return <Outlet />;
};
