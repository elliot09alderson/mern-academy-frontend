import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../store/api/authApi';
import { useAppSelector } from '../../store/store';
import {
  Users,
  BookOpen,
  Building,
  Calendar,
  Trophy,
  BarChart3,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Navigation } from '../Navigation';

const AdminLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem('token');
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/admin/students', label: 'Students', icon: Users },
    { path: '/admin/faculty', label: 'Faculty', icon: Users },
    { path: '/admin/courses', label: 'Courses', icon: BookOpen },
    { path: '/admin/branches', label: 'Branches', icon: Building },
    { path: '/admin/events', label: 'Events', icon: Calendar },
    { path: '/admin/outstanding-students', label: 'Outstanding Students', icon: Trophy },
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 flex pt-[64px] md:pt-[80px]">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 mt-[64px] md:mt-[80px]`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 mb-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center px-6">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 mr-4"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">
            MERN Academy - Administration
          </h2>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

        {/* Overlay for mobile */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden mt-[64px] md:mt-[80px]"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default AdminLayout;