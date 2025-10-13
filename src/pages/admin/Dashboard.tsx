import React from 'react';
import { Users, BookOpen, Building, Calendar, TrendingUp, Award } from 'lucide-react';
import { useGetStudentsQuery } from '../../store/api/studentApi';
import { useGetCoursesQuery } from '../../store/api/courseApi';
import { useGetBranchesQuery } from '../../store/api/branchApi';
import { useGetUpcomingEventsQuery } from '../../store/api/eventApi';

const Dashboard: React.FC = () => {
  const { data: studentsData } = useGetStudentsQuery({ page: 1, limit: 1 });
  const { data: coursesData } = useGetCoursesQuery({ page: 1, limit: 1 });
  const { data: branchesData } = useGetBranchesQuery({ page: 1, limit: 1 });
  const { data: eventsData } = useGetUpcomingEventsQuery({ page: 1, limit: 5 });

  const stats = [
    {
      title: 'Total Students',
      value: studentsData?.pagination?.total || 0,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Total Courses',
      value: coursesData?.pagination?.total || 0,
      icon: BookOpen,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: 'Total Branches',
      value: branchesData?.pagination?.total || 0,
      icon: Building,
      color: 'bg-purple-500',
      change: '+3%',
    },
    {
      title: 'Upcoming Events',
      value: eventsData?.pagination?.total || 0,
      icon: Calendar,
      color: 'bg-orange-500',
      change: '+15%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to MERN Academy Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {eventsData?.data?.slice(0, 5).map((event) => (
              <div key={event._id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.eventName}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(event.startDate).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  event.eventType === 'academic' ? 'bg-blue-100 text-blue-800' :
                  event.eventType === 'cultural' ? 'bg-purple-100 text-purple-800' :
                  event.eventType === 'sports' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.eventType}
                </span>
              </div>
            ))}
            {(!eventsData?.data || eventsData.data.length === 0) && (
              <p className="text-sm text-gray-500 text-center py-4">No upcoming events</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            <Award className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Add New Student</p>
                  <p className="text-sm text-gray-500">Register a new student</p>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-green-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Create Course</p>
                  <p className="text-sm text-gray-500">Add a new course</p>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-orange-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Schedule Event</p>
                  <p className="text-sm text-gray-500">Create a new event</p>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Building className="w-5 h-5 text-purple-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Add Branch</p>
                  <p className="text-sm text-gray-500">Create a new branch</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;