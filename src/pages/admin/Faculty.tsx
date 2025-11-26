import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetFacultiesQuery, useDeleteFacultyMutation, useToggleFacultyStatusMutation } from '../../store/api/facultyApi';
import { Plus, Edit2, Trash2, Search, User, Eye, EyeOff, Mail, Briefcase, GraduationCap } from 'lucide-react';

const Faculty: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: facultyData, isLoading } = useGetFacultiesQuery({ page, limit: 12 });
  const [deleteFaculty] = useDeleteFacultyMutation();
  const [toggleStatus] = useToggleFacultyStatusMutation();

  const handleEdit = (facultyId: string) => {
    navigate(`/admin/faculty/edit/${facultyId}`);
  };

  const handleDelete = async (facultyId: string) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      try {
        await deleteFaculty(facultyId).unwrap();
      } catch (error) {
        console.error('Failed to delete faculty:', error);
      }
    }
  };

  const handleToggleStatus = async (facultyId: string) => {
    try {
      await toggleStatus(facultyId).unwrap();
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const filteredFaculty = facultyData?.data?.filter(faculty =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.specialization.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-900">Faculty Management</h1>
          <p className="text-gray-600">Manage faculty members and their profiles</p>
        </div>
        <button
          onClick={() => navigate('/admin/faculty/add')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name, email or specialization"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((faculty) => (
          <div key={faculty._id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            {/* Faculty Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-500 to-cyan-600">
              {faculty.image?.url ? (
                <img
                  src={faculty.image.url}
                  alt={faculty.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-20 h-20 text-white/50" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={() => handleToggleStatus(faculty._id)}
                  className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
                  title={faculty.isActive ? 'Deactivate' : 'Activate'}
                >
                  {faculty.isActive ? (
                    <Eye className="w-4 h-4 text-green-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-600" />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(faculty._id)}
                  className="p-2 bg-white/90 hover:bg-white rounded-full text-blue-600 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(faculty._id)}
                  className="p-2 bg-white/90 hover:bg-white rounded-full text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {/* Employee ID Badge */}
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {faculty.employeeId}
              </div>
            </div>

            <div className="p-4">
              {/* Name & Status */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{faculty.name}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  faculty.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {faculty.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Mail className="w-4 h-4" />
                <span className="truncate">{faculty.email}</span>
              </div>

              {/* Specialization */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Briefcase className="w-4 h-4" />
                <span>{faculty.specialization}</span>
              </div>

              {/* Qualification & Experience */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <GraduationCap className="w-4 h-4" />
                <span>{faculty.qualification} | {faculty.experience} yrs exp</span>
              </div>

              {/* Expertise Tags */}
              {faculty.expertise && faculty.expertise.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {faculty.expertise.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                  {faculty.expertise.length > 4 && (
                    <span className="text-xs text-gray-400">+{faculty.expertise.length - 4} more</span>
                  )}
                </div>
              )}

              {/* Office Hours */}
              {faculty.officeHours && (
                <div className="text-xs text-gray-500 pt-2 border-t">
                  Office Hours: {faculty.officeHours}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFaculty.length === 0 && !isLoading && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No faculty found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first faculty member'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => navigate('/admin/faculty/add')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Faculty</span>
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {facultyData?.pagination && facultyData.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border p-4">
          <div className="text-sm text-gray-700">
            Showing {((page - 1) * 12) + 1} to {Math.min(page * 12, facultyData.pagination.total)} of {facultyData.pagination.total} results
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
              Page {page} of {facultyData.pagination.totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === facultyData.pagination.totalPages}
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

export default Faculty;
