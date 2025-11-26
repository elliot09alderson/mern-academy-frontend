import React, { useState } from 'react';
import { useGetStudentsQuery, useUpdateGPAMutation, useUpdateAttendanceMutation, usePromoteStudentMutation, useUpdateStudentMutation, useDeleteStudentMutation } from '../../store/api/studentApi';
import { Search, Edit2, UserCheck, TrendingUp, Filter, Eye, Save, X, Award, User, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Students: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [viewStudent, setViewStudent] = useState<any>(null);
  const [editStudent, setEditStudent] = useState<any>(null);
  const { toast } = useToast();

  const { data: studentsData, isLoading, error } = useGetStudentsQuery({
    page,
    limit: 10,
    semester: selectedSemester ? parseInt(selectedSemester) : undefined
  });

  const [updateGPA] = useUpdateGPAMutation();
  const [updateAttendance] = useUpdateAttendanceMutation();
  const [promoteStudent] = usePromoteStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();

  const [editValues, setEditValues] = useState({
    gpa: 0,
    attendance: 0,
    guardianName: '',
    guardianContact: '',
    bloodGroup: '',
    isOutstanding: false
  });

  const handleViewStudent = (student: any) => {
    setViewStudent(student);
  };

  const handleEditStart = (student: any) => {
    setEditStudent(student);
    setEditValues({
      gpa: student.gpa || 0,
      attendance: student.attendance || 0,
      guardianName: student.guardianName || '',
      guardianContact: student.guardianContact || '',
      bloodGroup: student.bloodGroup || '',
      isOutstanding: student.isOutstanding || false
    });
  };

  const handleEditSave = async () => {
    if (!editStudent) return;

    try {
      await updateStudent({
        id: editStudent._id,
        updates: {
          gpa: editValues.gpa,
          attendance: editValues.attendance,
          guardianName: editValues.guardianName,
          guardianContact: editValues.guardianContact,
          bloodGroup: editValues.bloodGroup,
          isOutstanding: editValues.isOutstanding
        }
      }).unwrap();

      toast({
        title: "Success!",
        description: "Student updated successfully",
      });
      setEditStudent(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to update student",
        variant: "destructive",
      });
    }
  };

  const handlePromote = async (studentId: string, currentSemester: number) => {
    if (currentSemester >= 8) {
      toast({
        title: "Cannot Promote",
        description: "Student is already in final semester",
        variant: "destructive",
      });
      return;
    }

    try {
      await promoteStudent(studentId).unwrap();
      toast({
        title: "Success!",
        description: "Student promoted to next semester",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to promote student",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (studentId: string, studentName: string) => {
    if (window.confirm(`Are you sure you want to delete student "${studentName}"? This action cannot be undone.`)) {
      try {
        await deleteStudent(studentId).unwrap();
        toast({
          title: "Success!",
          description: "Student deleted successfully",
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error?.data?.message || "Failed to delete student",
          variant: "destructive",
        });
      }
    }
  };

  const filteredStudents = studentsData?.data?.filter(student =>
    student.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Students Management</h1>
          <p className="text-gray-600">Manage student records and academic progress</p>
        </div>
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent appearance-none"
            >
              <option value="">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            Total: <span className="font-bold text-violet-600 ml-1">{studentsData?.pagination?.total || 0}</span> students
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Student Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Academic Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No students found</p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student._id} className="hover:bg-violet-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {student.userId?.name?.charAt(0) || 'S'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.userId?.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{student.userId?.email || 'N/A'}</div>
                          <div className="text-xs text-violet-600 font-mono">ID: {student.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Roll: <span className="font-semibold">{student.rollNumber}</span></div>
                      <div className="text-sm text-gray-500">Semester: <span className="font-semibold text-violet-600">{student.currentSemester}</span></div>
                      <div className="text-sm text-gray-500">Year: {student.admissionYear}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">GPA:</span>
                          <Badge className={`${student.gpa >= 8 ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600' : student.gpa >= 6 ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
                            {student.gpa?.toFixed(1) || '0.0'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Attendance:</span>
                          <Badge className={`${student.attendance >= 75 ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600' : 'bg-red-500'} text-white`}>
                            {student.attendance || 0}%
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        {student.isOutstanding && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                            <Award className="w-3 h-3 mr-1" />
                            Outstanding
                          </Badge>
                        )}
                        <Badge variant={student.attendance >= 75 ? 'default' : 'destructive'}
                               className={student.attendance >= 75 ? 'bg-green-500' : ''}>
                          {student.attendance >= 75 ? 'Regular' : 'Low Attendance'}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-pink-700"
                          onClick={() => handleViewStudent(student)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-pink-700"
                          onClick={() => handleEditStart(student)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-pink-700"
                          onClick={() => handlePromote(student._id, student.currentSemester)}
                          disabled={student.currentSemester >= 8}
                          title="Promote to Next Semester"
                        >
                          <TrendingUp className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                          onClick={() => handleDelete(student._id, student.userId?.name || 'Unknown')}
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
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
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-50"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm">
                Page {page} of {studentsData.pagination.totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === studentsData.pagination.totalPages}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Student Dialog */}
      <Dialog open={!!viewStudent} onOpenChange={() => setViewStudent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Student Details
            </DialogTitle>
          </DialogHeader>
          {viewStudent && (
            <div className="space-y-6 mt-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {viewStudent.userId?.name?.charAt(0) || 'S'}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{viewStudent.userId?.name}</h3>
                  <p className="text-gray-500">{viewStudent.userId?.email}</p>
                  <p className="text-sm text-violet-600 font-mono">ID: {viewStudent.studentId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Roll Number</p>
                  <p className="font-semibold">{viewStudent.rollNumber}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Current Semester</p>
                  <p className="font-semibold">{viewStudent.currentSemester}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Admission Year</p>
                  <p className="font-semibold">{viewStudent.admissionYear}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">GPA</p>
                  <p className="font-semibold text-violet-600">{viewStudent.gpa?.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Attendance</p>
                  <p className="font-semibold">{viewStudent.attendance}%</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Blood Group</p>
                  <p className="font-semibold">{viewStudent.bloodGroup || 'N/A'}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Guardian Name</p>
                  <p className="font-semibold">{viewStudent.guardianName || 'N/A'}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Guardian Contact</p>
                  <p className="font-semibold">{viewStudent.guardianContact || 'N/A'}</p>
                </div>
              </div>

              {viewStudent.isOutstanding && (
                <div className="p-4 bg-gradient-to-r from-violet-100 to-pink-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-violet-600" />
                    <span className="font-semibold text-violet-600">Outstanding Student</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={!!editStudent} onOpenChange={() => setEditStudent(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Edit Student
            </DialogTitle>
          </DialogHeader>
          {editStudent && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gpa">GPA (0-10)</Label>
                  <Input
                    id="gpa"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={editValues.gpa}
                    onChange={(e) => setEditValues({ ...editValues, gpa: parseFloat(e.target.value) || 0 })}
                    className="border-violet-200 focus:border-violet-500"
                  />
                </div>
                <div>
                  <Label htmlFor="attendance">Attendance (%)</Label>
                  <Input
                    id="attendance"
                    type="number"
                    min="0"
                    max="100"
                    value={editValues.attendance}
                    onChange={(e) => setEditValues({ ...editValues, attendance: parseFloat(e.target.value) || 0 })}
                    className="border-violet-200 focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="guardianName">Guardian Name</Label>
                <Input
                  id="guardianName"
                  value={editValues.guardianName}
                  onChange={(e) => setEditValues({ ...editValues, guardianName: e.target.value })}
                  className="border-violet-200 focus:border-violet-500"
                />
              </div>

              <div>
                <Label htmlFor="guardianContact">Guardian Contact</Label>
                <Input
                  id="guardianContact"
                  value={editValues.guardianContact}
                  onChange={(e) => setEditValues({ ...editValues, guardianContact: e.target.value })}
                  className="border-violet-200 focus:border-violet-500"
                />
              </div>

              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Input
                  id="bloodGroup"
                  value={editValues.bloodGroup}
                  onChange={(e) => setEditValues({ ...editValues, bloodGroup: e.target.value })}
                  placeholder="e.g., A+, B-, O+"
                  className="border-violet-200 focus:border-violet-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isOutstanding"
                  checked={editValues.isOutstanding}
                  onChange={(e) => setEditValues({ ...editValues, isOutstanding: e.target.checked })}
                  className="w-4 h-4 text-violet-600 border-violet-300 rounded focus:ring-violet-500"
                />
                <Label htmlFor="isOutstanding">Mark as Outstanding Student</Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  className="flex-1 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-pink-700"
                  onClick={handleEditSave}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditStudent(null)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Students;
