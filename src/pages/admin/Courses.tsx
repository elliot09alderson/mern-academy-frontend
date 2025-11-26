import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCoursesQuery, useDeleteCourseMutation } from '../../store/api/courseApi';
import { Plus, Edit2, Trash2, Search, BookOpen, Eye, IndianRupee, Clock, Users, Award } from 'lucide-react';

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: coursesData, isLoading } = useGetCoursesQuery({ page, limit: 12 });
  const [deleteCourse] = useDeleteCourseMutation();

  const handleEdit = (courseId: string) => {
    navigate(`/admin/courses/edit/${courseId}`);
  };

  const handleDelete = async (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(courseId).unwrap();
      } catch (error) {
        console.error('Failed to delete course:', error);
      }
    }
  };

  const filteredCourses = coursesData?.data?.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses Management</h1>
          <p className="text-gray-600">Manage course catalog and curriculum</p>
        </div>
        <button
          onClick={() => navigate('/admin/courses/add')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search courses by name or code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            {/* Banner Image */}
            {course.bannerImage?.url ? (
              <div className="relative h-40 overflow-hidden">
                <img
                  src={course.bannerImage.url}
                  alt={course.courseName}
                  className="w-full h-full object-cover"
                />
                {course.isLimitedOffer && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Limited Offer
                  </span>
                )}
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => handleEdit(course._id)}
                    className="p-2 bg-white/90 hover:bg-white rounded-full text-blue-600 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="p-2 bg-white/90 hover:bg-white rounded-full text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white/50" />
                {course.isLimitedOffer && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Limited Offer
                  </span>
                )}
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => handleEdit(course._id)}
                    className="p-2 bg-white/90 hover:bg-white rounded-full text-blue-600 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="p-2 bg-white/90 hover:bg-white rounded-full text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            <div className="p-4">
              {/* Course Code & Level Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {course.courseCode}
                </span>
                {course.level && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    course.level === 'Beginner Friendly' ? 'bg-green-100 text-green-700' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {course.level}
                  </span>
                )}
              </div>

              {/* Course Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{course.courseName}</h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>

              {/* Course Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                {course.batchSize && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.batchSize}</span>
                  </div>
                )}
              </div>

              {/* Features */}
              {course.features && course.features.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {course.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                  {course.features.length > 3 && (
                    <span className="text-xs text-gray-400">+{course.features.length - 3} more</span>
                  )}
                </div>
              )}

              {/* Pricing */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-2">
                  {course.discountedPrice && course.originalPrice && course.discountedPrice < course.originalPrice ? (
                    <>
                      <span className="text-lg font-bold text-green-600">
                        Rs {course.discountedPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        Rs {course.originalPrice.toLocaleString()}
                      </span>
                      {course.discountPercentage > 0 && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          {course.discountPercentage}% OFF
                        </span>
                      )}
                    </>
                  ) : course.originalPrice ? (
                    <span className="text-lg font-bold text-gray-900">
                      Rs {course.originalPrice.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">Price not set</span>
                  )}
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  course.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {course.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Additional Info */}
              <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2 text-xs text-gray-500">
                {course.branchId?.branchName && (
                  <div>
                    <span className="font-medium">Branch:</span> {course.branchId.branchName}
                  </div>
                )}
                {course.semester && (
                  <div>
                    <span className="font-medium">Semester:</span> {course.semester}
                  </div>
                )}
                {course.credits && (
                  <div>
                    <span className="font-medium">Credits:</span> {course.credits}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && !isLoading && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first course'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => navigate('/admin/courses/add')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {coursesData?.pagination && coursesData.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border p-4">
          <div className="text-sm text-gray-700">
            Showing {((page - 1) * 12) + 1} to {Math.min(page * 12, coursesData.pagination.total)} of {coursesData.pagination.total} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm">
              Page {page} of {coursesData.pagination.totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === coursesData.pagination.totalPages}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
