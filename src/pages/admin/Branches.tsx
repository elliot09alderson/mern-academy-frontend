import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetBranchesQuery, useDeleteBranchMutation } from '../../store/api/branchApi';
import { Plus, Edit2, Trash2, Search, Building2, MapPin, Phone, Mail, Users, Calendar } from 'lucide-react';

const Branches: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: branchesData, isLoading } = useGetBranchesQuery({ page, limit: 12 });
  const [deleteBranch] = useDeleteBranchMutation();

  const handleEdit = (branchId: string) => {
    navigate(`/admin/branches/edit/${branchId}`);
  };

  const handleDelete = async (branchId: string) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      try {
        await deleteBranch(branchId).unwrap();
      } catch (error) {
        console.error('Failed to delete branch:', error);
      }
    }
  };

  const filteredBranches = branchesData?.data?.filter(branch =>
    branch.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.branchCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address?.city?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Branches Management</h1>
          <p className="text-gray-600">Manage academy branches and locations</p>
        </div>
        <button
          onClick={() => navigate('/admin/branches/add')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Branch</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name, code or city"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBranches.map((branch) => (
          <div key={branch._id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            {/* Branch Image */}
            <div className="relative h-48 bg-gradient-to-br from-emerald-500 to-teal-600">
              {branch.images && branch.images.length > 0 ? (
                <img
                  src={branch.images[0].url}
                  alt={branch.branchName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Building2 className="w-20 h-20 text-white/50" />
                </div>
              )}
              {branch.isHeadquarters && (
                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  HQ
                </span>
              )}
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={() => handleEdit(branch._id)}
                  className="p-2 bg-white/90 hover:bg-white rounded-full text-emerald-600 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(branch._id)}
                  className="p-2 bg-white/90 hover:bg-white rounded-full text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {/* Branch Code Badge */}
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {branch.branchCode}
              </div>
            </div>

            <div className="p-4">
              {/* Name & Status */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{branch.branchName}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                  branch.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {branch.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{branch.description}</p>

              {/* Location */}
              {branch.address && (
                <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">
                    {branch.address.fullAddress || `${branch.address.city}, ${branch.address.state}`}
                  </span>
                </div>
              )}

              {/* Contact Info */}
              {branch.contactInfo?.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>{branch.contactInfo.phone}</span>
                </div>
              )}

              {branch.contactInfo?.email && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{branch.contactInfo.email}</span>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>
                    <span className="font-semibold">{branch.availableSeats}</span>
                    <span className="text-gray-500">/{branch.totalSeats} seats</span>
                  </span>
                </div>
                {branch.establishedYear && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Est. {branch.establishedYear}</span>
                  </div>
                )}
              </div>

              {/* Facilities */}
              {branch.facilities && branch.facilities.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t">
                  {branch.facilities.slice(0, 3).map((facility, idx) => (
                    <span key={idx} className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded">
                      {facility}
                    </span>
                  ))}
                  {branch.facilities.length > 3 && (
                    <span className="text-xs text-gray-400">+{branch.facilities.length - 3} more</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBranches.length === 0 && !isLoading && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No branches found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first branch'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => navigate('/admin/branches/add')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Branch</span>
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {branchesData?.pagination && branchesData.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border p-4">
          <div className="text-sm text-gray-700">
            Showing {((page - 1) * 12) + 1} to {Math.min(page * 12, branchesData.pagination.total)} of {branchesData.pagination.total} results
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
              Page {page} of {branchesData.pagination.totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === branchesData.pagination.totalPages}
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

export default Branches;
