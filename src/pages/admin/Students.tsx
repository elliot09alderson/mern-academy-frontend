import React, { useState } from 'react';
import { useGetStudentsQuery, useUpdateGPAMutation, useUpdateAttendanceMutation, usePromoteStudentMutation } from '../../store/api/studentApi';
import { Search, Edit2, UserCheck, TrendingUp, Filter, Plus } from 'lucide-react';

const Students: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  const { data: studentsData, isLoading, error } = useGetStudentsQuery({
    page,
    limit: 10,
    semester: selectedSemester ? parseInt(selectedSemester) : undefined
  });

  const [updateGPA] = useUpdateGPAMutation();
  const [updateAttendance] = useUpdateAttendanceMutation();
  const [promoteStudent] = usePromoteStudentMutation();

  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ gpa: number; attendance: number }>({ gpa: 0, attendance: 0 });

  const handleEditStart = (student: any) => {
    setEditingStudent(student._id);
    setEditValues({ gpa: student.gpa, attendance: student.attendance });
  };

  const handleEditSave = async (studentId: string) => {
    try {
      await updateGPA({ studentId, gpa: editValues.gpa }).unwrap();
      await updateAttendance({ studentId, attendance: editValues.attendance }).unwrap();
      setEditingStudent(null);
    } catch (error) {
      console.error('Failed to update student:', error);
    }
  };

  const handlePromote = async (studentId: string) => {
    try {
      await promoteStudent(studentId).unwrap();
    } catch (error) {
      console.error('Failed to promote student:', error);
    }
  };

  const filteredStudents = studentsData?.data?.filter(student =>
    student.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Failed to load students. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students Management</h1>
          <p className="text-gray-600">Manage student records and academic progress</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, student ID, or roll number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            Total: {studentsData?.pagination?.total || 0} students
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Academic Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {student.userId.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.userId.name}</div>
                        <div className="text-sm text-gray-500">{student.userId.email}</div>
                        <div className="text-xs text-gray-400">ID: {student.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Roll: {student.rollNumber}</div>
                    <div className="text-sm text-gray-500">Sem: {student.currentSemester}</div>
                    <div className="text-sm text-gray-500">Year: {student.admissionYear}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingStudent === student._id ? (
                      <div className="space-y-2">
                        <input
                          type="number"
                          value={editValues.gpa}
                          onChange={(e) => setEditValues({ ...editValues, gpa: parseFloat(e.target.value) })}
                          className="w-20 px-2 py-1 border rounded text-sm"
                          min="0"
                          max="10"
                          step="0.1"
                        />
                        <input
                          type="number"
                          value={editValues.attendance}
                          onChange={(e) => setEditValues({ ...editValues, attendance: parseFloat(e.target.value) })}
                          className="w-20 px-2 py-1 border rounded text-sm"
                          min="0"
                          max="100"
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="text-sm font-medium text-gray-900">GPA: {student.gpa.toFixed(1)}</div>
                        <div className="text-sm text-gray-500">Attendance: {student.attendance}%</div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.isOutstanding ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {student.isOutstanding ? 'Outstanding' : 'Regular'}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.attendance >= 75 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {student.attendance >= 75 ? 'Good Attendance' : 'Low Attendance'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {editingStudent === student._id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditSave(student._id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingStudent(null)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditStart(student)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit Performance"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handlePromote(student._id)}
                          className="text-green-600 hover:text-green-900"
                          title="Promote to Next Semester"
                          disabled={student.currentSemester >= 8}
                        >
                          <TrendingUp className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {studentsData?.pagination && studentsData.pagination.totalPages > 1 && (
          <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, studentsData.pagination.total)} of {studentsData.pagination.total} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm">
                Page {page} of {studentsData.pagination.totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === studentsData.pagination.totalPages}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;