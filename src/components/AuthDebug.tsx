import React from 'react';
import { useAppSelector } from '@/store/store';

export const AuthDebug = () => {
  const auth = useAppSelector((state) => state.auth);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm text-xs">
      <h3 className="font-bold text-green-400 mb-2">🔍 Auth Debug</h3>
      <div className="space-y-1">
        <div>
          <span className="text-gray-400">Authenticated:</span>{' '}
          <span className={auth.isAuthenticated ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
            {auth.isAuthenticated ? '✅ YES' : '❌ NO'}
          </span>
        </div>
        <div>
          <span className="text-gray-400">User Type:</span>{' '}
          <span className="text-blue-400 font-semibold">{auth.userType || 'None'}</span>
        </div>
        <div>
          <span className="text-gray-400">User ID:</span>{' '}
          <span className="text-purple-400">{auth.user?._id || 'None'}</span>
        </div>
        <div>
          <span className="text-gray-400">Email:</span>{' '}
          <span className="text-yellow-400">{auth.user?.email || 'None'}</span>
        </div>
        <div>
          <span className="text-gray-400">Name:</span>{' '}
          <span className="text-yellow-400">{auth.user?.name || 'None'}</span>
        </div>
        <div>
          <span className="text-gray-400">Role:</span>{' '}
          <span className="text-purple-400 font-semibold">{auth.user?.role || 'None'}</span>
        </div>
        {auth.user?.adminDetails && (
          <div className="mt-2 pt-2 border-t border-gray-700">
            <div className="text-green-400 font-semibold mb-1">👑 Admin Details:</div>
            <div>
              <span className="text-gray-400">Admin ID:</span>{' '}
              <span className="text-green-400">{auth.user.adminDetails.adminId}</span>
            </div>
            <div>
              <span className="text-gray-400">Department:</span>{' '}
              <span className="text-green-400">{auth.user.adminDetails.department}</span>
            </div>
            <div>
              <span className="text-gray-400">Super Admin:</span>{' '}
              <span className={auth.user.adminDetails.isSuperAdmin ? 'text-green-400' : 'text-yellow-400'}>
                {auth.user.adminDetails.isSuperAdmin ? '✅ Yes' : '❌ No'}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Permissions:</span>{' '}
              <span className="text-green-400">{auth.user.adminDetails.permissions?.length || 0}</span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-400">
        Open Console (F12) for detailed logs
      </div>
    </div>
  );
};
