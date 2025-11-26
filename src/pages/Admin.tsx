import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Users,
  BookOpen,
  GraduationCap,
  MapPin,
  MessageSquare,
  Calendar,
  Trophy,
  BarChart3,
  UserPlus,
  Trash2,
  Edit,
  Plus,
  Save,
  X,
  Eye,
  EyeOff,
  Upload,
  Image as ImageIcon,
  Award,
  Building2,
  TrendingUp,
  Edit2,
  Star,
  Quote
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetBranchesQuery, useCreateBranchMutation, useDeleteBranchMutation } from '@/store/api/branchApi';
import { useGetOutstandingStudentsQuery, useDeleteOutstandingStudentMutation, useToggleStudentStatusMutation } from '@/store/api/outstandingStudentApi';
import { useGetEventsQuery, useDeleteEventMutation } from '@/store/api/eventApi';
import { useGetFacultiesQuery, useDeleteFacultyMutation, useToggleFacultyStatusMutation } from '@/store/api/facultyApi';
import { useGetCoursesQuery, useDeleteCourseMutation } from '@/store/api/courseApi';
import { useGetAllInquiriesQuery, useUpdateInquiryMutation, useDeleteInquiryMutation } from '@/store/api/inquiryApi';
import { useGetStudentsQuery, useDeleteStudentMutation, useUpdateStudentMutation, usePromoteStudentMutation } from '@/store/api/studentApi';
import { useGetTestimonialsQuery, useCreateTestimonialMutation, useUpdateTestimonialMutation, useDeleteTestimonialMutation, useToggleTestimonialStatusMutation } from '@/store/api/testimonialApi';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/Navigation';
import { format } from 'date-fns';

// Mock data
const mockRegistrations = [
  { id: 1, name: 'Rahul Kumar', email: 'rahul@example.com', type: 'Student', course: 'MERN Stack', date: '2024-01-15', status: 'Active' },
  { id: 2, name: 'Priya Singh', email: 'priya@example.com', type: 'Student', course: 'AI Development', date: '2024-01-14', status: 'Pending' },
  { id: 3, name: 'Dr. Amit Sharma', email: 'amit@mernacademy.com', type: 'Faculty', course: 'System Design', date: '2024-01-13', status: 'Active' },
];

const mockFaculty = [
  { id: 1, name: 'Dr. Amit Sharma', email: 'amit@mernacademy.com', expertise: 'MERN Stack', experience: '8 years', students: 45, status: 'Active' },
  { id: 2, name: 'Prof. Neha Gupta', email: 'neha@mernacademy.com', expertise: 'AI/ML', experience: '6 years', students: 32, status: 'Active' },
  { id: 3, name: 'Mr. Rohit Verma', email: 'rohit@mernacademy.com', expertise: 'System Design', experience: '10 years', students: 28, status: 'On Leave' },
];

const mockStudents = [
  { id: 1, name: 'Rahul Kumar', course: 'MERN Stack', progress: '75%', performance: 'Excellent', joinDate: '2024-01-15' },
  { id: 2, name: 'Priya Singh', course: 'AI Development', progress: '60%', performance: 'Good', joinDate: '2024-01-14' },
  { id: 3, name: 'Ankit Jain', course: 'DSA', progress: '90%', performance: 'Outstanding', joinDate: '2024-01-10' },
];

const mockFeedbacks = [
  { id: 1, student: 'Rahul Kumar', course: 'MERN Stack', rating: 5, feedback: 'Excellent teaching methodology and practical approach.', date: '2024-01-20' },
  { id: 2, student: 'Priya Singh', course: 'AI Development', rating: 4, feedback: 'Good content but need more hands-on projects.', date: '2024-01-18' },
];

const mockEvents = [
  { id: 1, title: 'Web Development Workshop', description: 'Hands-on workshop on modern web development', date: '2024-02-15', venue: 'Main Auditorium', type: 'Workshop', attendees: 50, status: 'upcoming' },
  { id: 2, title: 'Placement Drive - TCS', description: 'Campus placement drive with TCS', date: '2024-02-20', venue: 'Conference Hall', type: 'Placement', attendees: 25, status: 'upcoming' },
  { id: 3, title: 'AI Hackathon', description: '48-hour AI development hackathon', date: '2024-01-10', venue: 'Tech Lab', type: 'Competition', attendees: 75, status: 'completed' },
];

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);

  // Form states for adding new items
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    category: '',
    level: '',
    technologies: ''
  });

  const [newBranch, setNewBranch] = useState({
    branchName: '',
    branchCode: '',
    description: '',
    totalSeats: '',
    establishedYear: ''
  });

  const [branchImages, setBranchImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  // API hooks
  const { data: branchesData, isLoading: branchesLoading } = useGetBranchesQuery({ page: 1, limit: 50 });
  const [createBranch, { isLoading: isCreating }] = useCreateBranchMutation();
  const [deleteBranch] = useDeleteBranchMutation();
  const { data: outstandingStudentsData, isLoading: studentsLoading } = useGetOutstandingStudentsQuery({});
  const [deleteOutstandingStudent] = useDeleteOutstandingStudentMutation();
  const [toggleStudentStatus] = useToggleStudentStatusMutation();
  const { data: eventsData, isLoading: eventsLoading } = useGetEventsQuery({ page: 1, limit: 50 });
  const [deleteEvent] = useDeleteEventMutation();
  const { data: facultiesData, isLoading: facultiesLoading } = useGetFacultiesQuery({ page: 1, limit: 50 });
  const [deleteFaculty] = useDeleteFacultyMutation();
  const [toggleFacultyStatus] = useToggleFacultyStatusMutation();
  const { data: coursesData, isLoading: coursesLoading } = useGetCoursesQuery({ page: 1, limit: 50 });
  const [deleteCourse] = useDeleteCourseMutation();
  const { data: inquiriesData, isLoading: inquiriesLoading } = useGetAllInquiriesQuery({ page: 1, limit: 50 });
  const [updateInquiry] = useUpdateInquiryMutation();
  const [deleteInquiry] = useDeleteInquiryMutation();
  const { data: studentsData, isLoading: studentsDataLoading } = useGetStudentsQuery({ page: 1, limit: 100 });
  const [deleteStudent] = useDeleteStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [promoteStudent] = usePromoteStudentMutation();
  const { toast } = useToast();

  // Student edit state
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [studentEditValues, setStudentEditValues] = useState({
    gpa: 0,
    attendance: 0,
    guardianName: '',
    guardianContact: '',
    bloodGroup: '',
    isOutstanding: false
  });

  // Testimonial API hooks
  const { data: testimonialsData, isLoading: testimonialsLoading } = useGetTestimonialsQuery({});
  const [createTestimonial, { isLoading: isCreatingTestimonial }] = useCreateTestimonialMutation();
  const [updateTestimonial] = useUpdateTestimonialMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();
  const [toggleTestimonialStatus] = useToggleTestimonialStatusMutation();

  // Testimonial state
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    title: '',
    role: '',
    description: '',
    rating: 5
  });
  const [testimonialImage, setTestimonialImage] = useState<File | null>(null);
  const [testimonialImagePreview, setTestimonialImagePreview] = useState<string>('');

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setBranchImages(prev => [...prev, ...fileArray]);

      // Create preview URLs
      fileArray.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove image from selection
  const removeImage = (index: number) => {
    setBranchImages(prev => prev.filter((_, i) => i !== index));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  // Handle branch creation
  const handleCreateBranch = async () => {
    try {
      const formData = new FormData();
      formData.append('branchName', newBranch.branchName);
      formData.append('branchCode', newBranch.branchCode);
      formData.append('description', newBranch.description);
      formData.append('totalSeats', newBranch.totalSeats);
      if (newBranch.establishedYear) {
        formData.append('establishedYear', newBranch.establishedYear);
      }

      // Append images
      branchImages.forEach((image) => {
        formData.append('images', image);
      });

      await createBranch(formData).unwrap();

      toast({
        title: "Success!",
        description: "Branch created successfully",
      });

      // Reset form
      setNewBranch({
        branchName: '',
        branchCode: '',
        description: '',
        totalSeats: '',
        establishedYear: ''
      });
      setBranchImages([]);
      setImagePreview([]);
      setIsAddBranchOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to create branch",
        variant: "destructive",
      });
    }
  };

  // Handle branch deletion
  const handleDeleteBranch = async (id: string) => {
    try {
      await deleteBranch(id).unwrap();
      toast({
        title: "Success!",
        description: "Branch deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to delete branch",
        variant: "destructive",
      });
    }
  };

  // Handle outstanding student deletion
  const handleDeleteStudent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this outstanding student?')) {
      return;
    }

    try {
      await deleteOutstandingStudent(id).unwrap();
      toast({
        title: "Success!",
        description: "Outstanding student deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to delete student",
        variant: "destructive",
      });
    }
  };

  // Handle toggle student status
  const handleToggleStudentStatus = async (id: string) => {
    try {
      await toggleStudentStatus(id).unwrap();
      toast({
        title: "Success!",
        description: "Student status updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  // Handle regular student deletion
  const handleDeleteRegularStudent = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete student "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteStudent(id).unwrap();
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
  };

  // Handle promote student to next semester
  const handlePromoteStudent = async (id: string, currentSemester: number) => {
    if (currentSemester >= 8) {
      toast({
        title: "Cannot Promote",
        description: "Student is already in final semester",
        variant: "destructive",
      });
      return;
    }

    try {
      await promoteStudent(id).unwrap();
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

  // Handle student edit start
  const handleEditStudentStart = (student: any) => {
    setEditingStudent(student);
    setStudentEditValues({
      gpa: student.gpa || 0,
      attendance: student.attendance || 0,
      guardianName: student.guardianName || '',
      guardianContact: student.guardianContact || '',
      bloodGroup: student.bloodGroup || '',
      isOutstanding: student.isOutstanding || false
    });
  };

  // Handle save student edit
  const handleSaveStudentEdit = async () => {
    if (!editingStudent) return;

    try {
      await updateStudent({
        id: editingStudent._id,
        updates: studentEditValues
      }).unwrap();
      toast({
        title: "Success!",
        description: "Student updated successfully",
      });
      setEditingStudent(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to update student",
        variant: "destructive",
      });
    }
  };

  // Testimonial handlers
  const handleTestimonialImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTestimonialImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTestimonialImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetTestimonialForm = () => {
    setTestimonialForm({
      name: '',
      title: '',
      role: '',
      description: '',
      rating: 5
    });
    setTestimonialImage(null);
    setTestimonialImagePreview('');
    setShowAddTestimonial(false);
    setEditingTestimonial(null);
  };

  const handleCreateTestimonial = async () => {
    if (!testimonialForm.name || !testimonialForm.description || !testimonialImage) {
      toast({
        title: "Error",
        description: "Please fill all required fields and upload an image",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', testimonialForm.name);
      formData.append('title', testimonialForm.title);
      formData.append('role', testimonialForm.role);
      formData.append('description', testimonialForm.description);
      formData.append('rating', testimonialForm.rating.toString());
      formData.append('image', testimonialImage);

      await createTestimonial(formData).unwrap();
      toast({
        title: "Success!",
        description: "Testimonial created successfully",
      });
      resetTestimonialForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to create testimonial",
        variant: "destructive",
      });
    }
  };

  const handleEditTestimonialStart = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setTestimonialForm({
      name: testimonial.name,
      title: testimonial.title || '',
      role: testimonial.role || '',
      description: testimonial.description,
      rating: testimonial.rating
    });
    setTestimonialImagePreview(testimonial.image?.url || '');
  };

  const handleUpdateTestimonial = async () => {
    if (!editingTestimonial) return;

    try {
      const formData = new FormData();
      formData.append('name', testimonialForm.name);
      formData.append('title', testimonialForm.title);
      formData.append('role', testimonialForm.role);
      formData.append('description', testimonialForm.description);
      formData.append('rating', testimonialForm.rating.toString());
      if (testimonialImage) {
        formData.append('image', testimonialImage);
      }

      await updateTestimonial({ id: editingTestimonial._id, formData }).unwrap();
      toast({
        title: "Success!",
        description: "Testimonial updated successfully",
      });
      resetTestimonialForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to update testimonial",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      await deleteTestimonial(id).unwrap();
      toast({
        title: "Success!",
        description: "Testimonial deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to delete testimonial",
        variant: "destructive",
      });
    }
  };

  const handleToggleTestimonialStatus = async (id: string) => {
    try {
      await toggleTestimonialStatus(id).unwrap();
      toast({
        title: "Success!",
        description: "Testimonial status updated",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  // Handle event deletion
  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await deleteEvent(id).unwrap();
      toast({
        title: "Success!",
        description: "Event deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  // Handle faculty deletion
  const handleDeleteFaculty = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this faculty member?')) {
      return;
    }

    try {
      await deleteFaculty(id).unwrap();
      toast({
        title: "Success!",
        description: "Faculty member deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to delete faculty member",
        variant: "destructive",
      });
    }
  };

  // Handle toggle faculty status
  const handleToggleFacultyStatus = async (id: string) => {
    try {
      await toggleFacultyStatus(id).unwrap();
      toast({
        title: "Success!",
        description: "Faculty status updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to update faculty status",
        variant: "destructive",
      });
    }
  };

  // Handle course deletion
  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      await deleteCourse(id).unwrap();
      toast({
        title: "Success!",
        description: "Course deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to delete course",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-[64px] md:pt-[80px] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2 text-lg">Manage your MERN Academy efficiently with modern tools</p>
          </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-10 mb-8 glass-card">
            <TabsTrigger value="overview" className="hover:scale-105 transition-transform">Overview</TabsTrigger>
            <TabsTrigger value="inquiries" className="hover:scale-105 transition-transform">Inquiries</TabsTrigger>
            <TabsTrigger value="courses" className="hover:scale-105 transition-transform">Courses</TabsTrigger>
            <TabsTrigger value="faculty" className="hover:scale-105 transition-transform">Faculty</TabsTrigger>
            <TabsTrigger value="students" className="hover:scale-105 transition-transform">Students</TabsTrigger>
            <TabsTrigger value="feedbacks" className="hover:scale-105 transition-transform">Feedbacks</TabsTrigger>
            <TabsTrigger value="events" className="hover:scale-105 transition-transform">Events</TabsTrigger>
            <TabsTrigger value="branches" className="hover:scale-105 transition-transform">Branches</TabsTrigger>
            <TabsTrigger value="outstanding" className="hover:scale-105 transition-transform">Outstanding</TabsTrigger>
            <TabsTrigger value="testimonials" className="hover:scale-105 transition-transform">Testimonials</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card border-0 hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-violet-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">120</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card border-0 hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">4</div>
                  <p className="text-xs text-muted-foreground">All courses active</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card border-0 hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
                  <GraduationCap className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">8</div>
                  <p className="text-xs text-muted-foreground">2 on leave</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card border-0 hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Placements</CardTitle>
                  <Trophy className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">16+</div>
                  <p className="text-xs text-muted-foreground">This year</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Course Inquiries</CardTitle>
                <CardDescription>Manage all course information requests from prospective students</CardDescription>
              </CardHeader>
              <CardContent>
                {inquiriesLoading ? (
                  <div className="text-center py-8">Loading inquiries...</div>
                ) : !inquiriesData?.data || inquiriesData.data.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No inquiries yet</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Qualification</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inquiriesData.data.map((inquiry) => (
                        <TableRow key={inquiry._id} className="hover:bg-violet-50/50 dark:hover:bg-violet-950/50">
                          <TableCell className="font-medium">{inquiry.name}</TableCell>
                          <TableCell>{inquiry.email}</TableCell>
                          <TableCell>{inquiry.phone}</TableCell>
                          <TableCell>{inquiry.qualification}</TableCell>
                          <TableCell className="capitalize">{inquiry.hereAboutUs}</TableCell>
                          <TableCell>{format(new Date(inquiry.createdAt), 'MMM dd, yyyy')}</TableCell>
                          <TableCell>
                            <Select
                              value={inquiry.status}
                              onValueChange={async (value) => {
                                try {
                                  await updateInquiry({ id: inquiry._id, data: { status: value as any } }).unwrap();
                                  toast({
                                    title: "Success",
                                    description: "Inquiry status updated successfully",
                                  });
                                } catch (error) {
                                  toast({
                                    title: "Error",
                                    description: "Failed to update inquiry status",
                                    variant: "destructive",
                                  });
                                }
                              }}
                            >
                              <SelectTrigger className="h-8 w-32">
                                <SelectValue>
                                  <Badge
                                    variant={inquiry.status === 'enrolled' ? 'default' : 'secondary'}
                                    className={
                                      inquiry.status === 'enrolled' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' :
                                      inquiry.status === 'contacted' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                                      inquiry.status === 'rejected' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' : ''
                                    }
                                  >
                                    {inquiry.status}
                                  </Badge>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="enrolled">Enrolled</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="glass-card hover:scale-110 transition-transform">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="glass-card">
                                <DialogHeader>
                                  <DialogTitle>Inquiry Details</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label className="font-semibold">Name:</Label>
                                    <p>{inquiry.name}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Email:</Label>
                                    <p>{inquiry.email}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Phone:</Label>
                                    <p>{inquiry.phone}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Qualification:</Label>
                                    <p>{inquiry.qualification}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">How they heard about us:</Label>
                                    <p className="capitalize">{inquiry.hereAboutUs}</p>
                                  </div>
                                  {inquiry.message && (
                                    <div>
                                      <Label className="font-semibold">Message:</Label>
                                      <p>{inquiry.message}</p>
                                    </div>
                                  )}
                                  {inquiry.notes && (
                                    <div>
                                      <Label className="font-semibold">Admin Notes:</Label>
                                      <p>{inquiry.notes}</p>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              variant="outline"
                              className="glass-card text-red-500 hover:scale-110 transition-transform"
                              onClick={async () => {
                                if (confirm('Are you sure you want to delete this inquiry?')) {
                                  try {
                                    await deleteInquiry(inquiry._id).unwrap();
                                    toast({
                                      title: "Success",
                                      description: "Inquiry deleted successfully",
                                    });
                                  } catch (error) {
                                    toast({
                                      title: "Error",
                                      description: "Failed to delete inquiry",
                                      variant: "destructive",
                                    });
                                  }
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Course Management</h2>
              <Button
                onClick={() => navigate('/admin/courses/add')}
                className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 hover:scale-105 transition-all"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </div>

            <div className="hidden">
              <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 hover:scale-105 transition-all">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Course (Old)
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card border-0 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Add New Course</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="courseTitle">Course Title</Label>
                        <Input 
                          id="courseTitle" 
                          className="glass-card border-violet-200 focus:border-violet-400"
                          placeholder="e.g., Full Stack MERN Development"
                          value={newCourse.title}
                          onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="courseDuration">Duration</Label>
                        <Input 
                          id="courseDuration" 
                          className="glass-card border-violet-200 focus:border-violet-400"
                          placeholder="e.g., 6 months"
                          value={newCourse.duration}
                          onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="courseDescription">Description</Label>
                      <Textarea 
                        id="courseDescription" 
                        className="glass-card border-violet-200 focus:border-violet-400"
                        placeholder="Comprehensive course description..."
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="coursePrice">Price (₹)</Label>
                        <Input 
                          id="coursePrice" 
                          type="number"
                          className="glass-card border-violet-200 focus:border-violet-400"
                          placeholder="25000"
                          value={newCourse.price}
                          onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select value={newCourse.category} onValueChange={(value) => setNewCourse({...newCourse, category: value})}>
                          <SelectTrigger className="glass-card border-violet-200">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="development">Development</SelectItem>
                            <SelectItem value="ai">AI & ML</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="data-science">Data Science</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Level</Label>
                        <Select value={newCourse.level} onValueChange={(value) => setNewCourse({...newCourse, level: value})}>
                          <SelectTrigger className="glass-card border-violet-200">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="courseTechnologies">Technologies (comma-separated)</Label>
                      <Input 
                        id="courseTechnologies" 
                        className="glass-card border-violet-200 focus:border-violet-400"
                        placeholder="React, Node.js, MongoDB, Express"
                        value={newCourse.technologies}
                        onChange={(e) => setNewCourse({...newCourse, technologies: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex-1 hover:scale-105 transition-transform">
                        <Save className="mr-2 h-4 w-4" />
                        Save Course
                      </Button>
                      <Button variant="outline" className="glass-card hover:scale-105 transition-transform" onClick={() => setIsAddCourseOpen(false)}>
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesLoading ? (
                <Card className="glass-card border-0 col-span-full">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Loading courses...</p>
                  </CardContent>
                </Card>
              ) : coursesData && coursesData.data.length > 0 ? (
                coursesData.data.map((course) => (
                  <Card key={course._id} className="glass-card border-0 hover:scale-105 transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">{course.courseName}</CardTitle>
                          <Badge className="mt-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white">{course.courseCode}</Badge>
                          {course.isLimitedOffer && (
                            <Badge className="mt-2 ml-2 bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse">
                              Limited Offer
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-card text-blue-500 hover:scale-110 transition-transform"
                            onClick={() => navigate(`/admin/courses/edit/${course._id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-card text-red-500 hover:scale-110 transition-transform"
                            onClick={() => handleDeleteCourse(course._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between items-center">
                          <span>Duration: {course.duration}</span>
                          <Badge variant={course.isActive ? 'default' : 'secondary'} className={course.isActive ? 'bg-green-500' : 'bg-gray-500'}>
                            {course.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        {course.level && (
                          <div className="flex justify-between items-center">
                            <span>Level: {course.level}</span>
                            <span>Batch Size: {course.batchSize || 'N/A'}</span>
                          </div>
                        )}
                      </div>
                      {course.features && course.features.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold mb-1">Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {course.features.slice(0, 3).map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {course.features.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{course.features.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-2 border-t">
                        {course.discountedPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="line-through text-sm text-muted-foreground">₹{course.originalPrice}</span>
                            <span className="font-bold text-lg bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">₹{course.discountedPrice}</span>
                            {course.discountPercentage && (
                              <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                                {course.discountPercentage}% OFF
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="font-bold text-lg bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">₹{course.originalPrice}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="glass-card border-0 col-span-full">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No courses available. Add your first course!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="faculty" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Faculty Management</h2>
              <Button
                className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 hover:scale-105 transition-all shadow-lg"
                onClick={() => navigate('/admin/faculty/add')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Faculty
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facultiesLoading ? (
                <Card className="glass-card border-0 col-span-full">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Loading faculty members...</p>
                  </CardContent>
                </Card>
              ) : facultiesData && facultiesData.data.length > 0 ? (
                facultiesData.data.map((member) => (
                  <Card key={member._id} className="glass-card border border-border/40 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <CardContent className="p-6">
                      {/* Profile Image */}
                      <div className="flex justify-center mb-4">
                        <div className="relative">
                          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-violet-200/50 dark:ring-violet-800/50">
                            <img
                              src={member.image.url}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-background ${member.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="text-center text-2xl font-bold mb-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        {member.name}
                      </h3>

                      {/* Role Badge */}
                      <div className="flex justify-center mb-4">
                        <div className="px-6 py-2 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white text-center font-semibold shadow-lg">
                          {member.specialization}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex justify-center mb-6">
                        <div className={`px-6 py-2 rounded-full text-center font-semibold shadow-lg ${
                          member.isActive
                            ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white'
                            : 'bg-gray-400 text-white'
                        }`}>
                          {member.isActive ? 'Active' : 'Inactive'}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-3 text-base mb-6">
                        <div className="flex items-start">
                          <span className="font-bold min-w-[120px]">Experience:</span>
                          <span>{member.experience} years</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-bold min-w-[120px]">Email:</span>
                          <span className="break-all">{member.email}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-bold min-w-[120px]">Qualification:</span>
                          <span>{member.qualification}</span>
                        </div>
                      </div>

                      {/* Expertise */}
                      {member.expertise && member.expertise.length > 0 && (
                        <div className="mb-6">
                          <p className="font-bold text-base mb-3">Expertise:</p>
                          <div className="flex flex-wrap gap-2">
                            {member.expertise.map((skill, idx) => (
                              <div key={idx} className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground border border-border text-sm font-medium">
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4 border-t">
                        <Button
                          className="flex-1 rounded-xl py-6 text-base font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
                          onClick={() => navigate(`/admin/faculty/edit/${member._id}`)}
                        >
                          <Edit className="h-5 w-5 mr-2" />
                          Edit
                        </Button>
                        <Button
                          className="flex-1 rounded-xl py-6 text-base font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
                          onClick={() => handleToggleFacultyStatus(member._id)}
                        >
                          {member.isActive ? (
                            <>
                              <EyeOff className="h-5 w-5 mr-2" />
                              Hide
                            </>
                          ) : (
                            <>
                              <Eye className="h-5 w-5 mr-2" />
                              Show
                            </>
                          )}
                        </Button>
                        <Button
                          className="w-16 rounded-xl py-6 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
                          onClick={() => handleDeleteFaculty(member._id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="glass-card border-0 col-span-full">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No faculty members found. Add your first faculty member!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Student Management</CardTitle>
                <CardDescription>Monitor student progress and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentsDataLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                            <span className="ml-3 text-muted-foreground">Loading students...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : studentsData?.data && studentsData.data.length > 0 ? (
                      studentsData.data.map((student) => (
                        <TableRow key={student._id} className="hover:bg-emerald-50/50 dark:hover:bg-emerald-950/50">
                          <TableCell className="font-medium">{student.userId?.name || 'N/A'}</TableCell>
                          <TableCell>{student.userId?.branchId || 'N/A'}</TableCell>
                          <TableCell>{student.currentSemester ? `Semester ${student.currentSemester}` : 'N/A'}</TableCell>
                          <TableCell>
                            <Badge variant={student.gpa >= 8.5 ? 'default' : 'secondary'}
                                   className={student.gpa >= 8.5 ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : ''}>
                              GPA: {student.gpa?.toFixed(2) || 'N/A'}
                            </Badge>
                          </TableCell>
                          <TableCell>{student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
                                onClick={() => handleEditStudentStart(student)}
                                title="View/Edit"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600"
                                onClick={() => handleEditStudentStart(student)}
                                title="Edit"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                                onClick={() => handlePromoteStudent(student._id, student.currentSemester)}
                                disabled={student.currentSemester >= 8}
                                title="Promote to Next Semester"
                              >
                                <TrendingUp className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                                onClick={() => handleDeleteRegularStudent(student._id, student.userId?.name || 'Unknown')}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No students found. Students will appear here after registration.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Student Edit Dialog */}
            <Dialog open={!!editingStudent} onOpenChange={() => setEditingStudent(null)}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Edit Student - {editingStudent?.userId?.name}
                  </DialogTitle>
                </DialogHeader>
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
                        value={studentEditValues.gpa}
                        onChange={(e) => setStudentEditValues({ ...studentEditValues, gpa: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="attendance">Attendance (%)</Label>
                      <Input
                        id="attendance"
                        type="number"
                        min="0"
                        max="100"
                        value={studentEditValues.attendance}
                        onChange={(e) => setStudentEditValues({ ...studentEditValues, attendance: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="guardianName">Guardian Name</Label>
                    <Input
                      id="guardianName"
                      value={studentEditValues.guardianName}
                      onChange={(e) => setStudentEditValues({ ...studentEditValues, guardianName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardianContact">Guardian Contact</Label>
                    <Input
                      id="guardianContact"
                      value={studentEditValues.guardianContact}
                      onChange={(e) => setStudentEditValues({ ...studentEditValues, guardianContact: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Input
                      id="bloodGroup"
                      value={studentEditValues.bloodGroup}
                      onChange={(e) => setStudentEditValues({ ...studentEditValues, bloodGroup: e.target.value })}
                      placeholder="e.g., A+, B-, O+"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isOutstanding"
                      checked={studentEditValues.isOutstanding}
                      onChange={(e) => setStudentEditValues({ ...studentEditValues, isOutstanding: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500"
                    />
                    <Label htmlFor="isOutstanding">Mark as Outstanding Student</Label>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
                      onClick={handleSaveStudentEdit}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditingStudent(null)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="feedbacks" className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Student Feedbacks</CardTitle>
                <CardDescription>Review and manage student feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFeedbacks.map((feedback) => (
                    <div key={feedback.id} className="border rounded-lg p-4 glass-card hover:scale-[1.02] transition-all duration-300">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{feedback.student}</h4>
                          <p className="text-sm text-muted-foreground">{feedback.course}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-amber-500">{'★'.repeat(feedback.rating)}</span>
                          <span className="text-gray-300">{'★'.repeat(5 - feedback.rating)}</span>
                          <span className="ml-2 text-sm text-muted-foreground">{feedback.date}</span>
                        </div>
                      </div>
                      <p className="text-foreground">{feedback.feedback}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Event Management</h2>
              <Button
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:scale-105 transition-all"
                onClick={() => navigate('/admin/events/add')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </div>

            <div className="space-y-4">
              {eventsLoading ? (
                <Card className="glass-card border-0">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Loading events...</p>
                  </CardContent>
                </Card>
              ) : eventsData && eventsData.data.length > 0 ? (
                eventsData.data.map((event) => {
                  const isUpcoming = new Date(event.startDate) > new Date();
                  const isPast = new Date(event.endDate) < new Date();
                  const isActive = !isPast && !isUpcoming;

                  return (
                    <Card key={event._id} className="glass-card border-0 hover:scale-[1.02] transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          {/* Event Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={event.image.url}
                              alt={event.eventName}
                              className="w-32 h-32 object-cover rounded-lg"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <h3 className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                {event.eventName}
                              </h3>
                              <Badge
                                variant={isUpcoming ? 'default' : isPast ? 'secondary' : 'default'}
                                className={isUpcoming ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : isPast ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'}
                              >
                                {isUpcoming ? 'Upcoming' : isPast ? 'Past' : 'Active'}
                              </Badge>
                              <Badge variant="outline">{event.category}</Badge>
                              {event.isFeatured && (
                                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-orange-500" />
                                {new Date(event.startDate).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-red-500" />
                                {event.venue}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-blue-500" />
                                {event.registeredParticipants.length}
                                {event.maxParticipants ? `/${event.maxParticipants}` : ''} participants
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 items-start">
                            <Button
                              size="sm"
                              variant="outline"
                              className="glass-card text-blue-500 hover:scale-110 transition-transform"
                              onClick={() => navigate(`/admin/events`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="glass-card text-red-500 hover:scale-110 transition-transform"
                              onClick={() => handleDeleteEvent(event._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card className="glass-card border-0">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No events found. Create your first event!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="branches" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Branch Management</h2>
              <Button
                onClick={() => window.location.href = '/admin/branches/add'}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:scale-105 transition-all"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Branch
              </Button>
            </div>

            {/* Removed Dialog Content - Now using separate page */}
            <div className="hidden">
              <Dialog open={isAddBranchOpen} onOpenChange={setIsAddBranchOpen} modal>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:scale-105 transition-all">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Branch (Old)
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="glass-card border-0 max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0"
                  onPointerDownOutside={(e) => e.preventDefault()}
                >
                  <DialogHeader className="flex-shrink-0 px-6 pt-6">
                    <DialogTitle className="text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Add New Branch</DialogTitle>
                  </DialogHeader>
                  <div
                    className="space-y-6 mt-6 overflow-y-auto px-6 flex-1 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-gray-200"
                    style={{maxHeight: 'calc(90vh - 180px)'}}
                    onWheel={(e) => e.stopPropagation()}
                  >

                    {/* Branch Images Upload */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Branch Images</Label>
                      <div className="border-2 border-dashed border-emerald-300 rounded-lg p-6 glass-card hover:border-emerald-400 transition-colors">
                        <input
                          type="file"
                          id="branchImages"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="branchImages"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <Upload className="h-12 w-12 text-emerald-500 mb-3" />
                          <p className="text-sm font-medium text-foreground mb-1">
                            Click to upload branch images
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, WEBP up to 5MB (Max 10 images)
                          </p>
                        </label>
                      </div>

                      {/* Image Preview */}
                      {imagePreview.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                          {imagePreview.map((preview, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border-2 border-emerald-200"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Branch Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="branchName">Branch Name *</Label>
                        <Input
                          id="branchName"
                          className="glass-card border-emerald-200 focus:border-emerald-400"
                          placeholder="e.g., Chennai Campus"
                          value={newBranch.branchName}
                          onChange={(e) => setNewBranch({...newBranch, branchName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="branchCode">Branch Code *</Label>
                        <Input
                          id="branchCode"
                          className="glass-card border-emerald-200 focus:border-emerald-400"
                          placeholder="e.g., CHN001"
                          value={newBranch.branchCode}
                          onChange={(e) => setNewBranch({...newBranch, branchCode: e.target.value.toUpperCase()})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        className="glass-card border-emerald-200 focus:border-emerald-400 min-h-[100px]"
                        placeholder="Describe the branch location, facilities, and key features..."
                        value={newBranch.description}
                        onChange={(e) => setNewBranch({...newBranch, description: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="totalSeats">Total Seats *</Label>
                        <Input
                          id="totalSeats"
                          type="number"
                          min="1"
                          className="glass-card border-emerald-200 focus:border-emerald-400"
                          placeholder="e.g., 200"
                          value={newBranch.totalSeats}
                          onChange={(e) => setNewBranch({...newBranch, totalSeats: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="establishedYear">Established Year</Label>
                        <Input
                          id="establishedYear"
                          type="number"
                          min="1900"
                          max={new Date().getFullYear()}
                          className="glass-card border-emerald-200 focus:border-emerald-400"
                          placeholder="e.g., 2020"
                          value={newBranch.establishedYear}
                          onChange={(e) => setNewBranch({...newBranch, establishedYear: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fixed Footer Buttons */}
                  <div className="flex gap-4 pt-4 px-6 pb-6 border-t flex-shrink-0">
                    <Button
                      onClick={handleCreateBranch}
                      disabled={isCreating || !newBranch.branchName || !newBranch.branchCode || !newBranch.description || !newBranch.totalSeats}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex-1 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {isCreating ? 'Creating...' : 'Save Branch'}
                    </Button>
                    <Button
                      variant="outline"
                      className="glass-card hover:scale-105 transition-transform"
                      onClick={() => {
                        setIsAddBranchOpen(false);
                        setNewBranch({
                          branchName: '',
                          branchCode: '',
                          description: '',
                          totalSeats: '',
                          establishedYear: ''
                        });
                        setBranchImages([]);
                        setImagePreview([]);
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Branch Cards */}
            {branchesLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
              </div>
            ) : branchesData && branchesData.data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {branchesData.data.map((branch) => (
                  <Card key={branch._id} className="glass-card border-0 hover:scale-105 transition-all duration-300 overflow-hidden">
                    {/* Branch Image */}
                    {branch.images && branch.images.length > 0 ? (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={branch.images[0].url}
                          alt={branch.branchName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center">
                        <ImageIcon className="h-16 w-16 text-white opacity-50" />
                      </div>
                    )}

                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            {branch.branchName}
                          </CardTitle>
                          <Badge className="mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                            {branch.branchCode}
                          </Badge>
                          {branch.establishedYear && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Est. {branch.establishedYear}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-card text-blue-500 hover:scale-110 transition-transform"
                            onClick={() => navigate(`/admin/branches/edit/${branch._id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-card text-red-500 hover:scale-110 transition-transform"
                            onClick={() => handleDeleteBranch(branch._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {branch.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-center pt-4 border-t">
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                            {branch.totalSeats - branch.availableSeats}
                          </div>
                          <div className="text-xs text-muted-foreground">Enrolled</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                            {branch.availableSeats}
                          </div>
                          <div className="text-xs text-muted-foreground">Available</div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t text-center">
                        <div className="text-sm font-medium">
                          Total Capacity: {branch.totalSeats}
                        </div>
                        <Badge
                          variant={branch.isActive ? "default" : "secondary"}
                          className={branch.isActive ? "mt-2 bg-gradient-to-r from-emerald-500 to-teal-500" : "mt-2"}
                        >
                          {branch.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass-card border-0">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MapPin className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">No branches found</p>
                  <p className="text-sm text-muted-foreground mt-2">Click "Add Branch" to create your first branch</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="outstanding" className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Outstanding Students</CardTitle>
                  <CardDescription>Manage outstanding student profiles for the homepage</CardDescription>
                </div>
                <Button
                  onClick={() => navigate('/admin/outstanding-students/add')}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </CardHeader>
              <CardContent>
                {studentsLoading ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Loading students...</p>
                  </div>
                ) : outstandingStudentsData && outstandingStudentsData.data.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {outstandingStudentsData.data.map((student) => (
                      <Card key={student._id} className="glass-card border-0 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                        {/* Header with Gradient */}
                        <div className="relative h-24 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 overflow-hidden">
                          <div className="absolute inset-0 bg-black/20" />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                            <Trophy className="h-3 w-3 text-violet-600" />
                            <span className="text-xs font-bold text-violet-600">#{student.rank}</span>
                          </div>
                        </div>

                        <CardContent className="p-6 -mt-12">
                          {/* Profile Image */}
                          <div className="flex justify-center mb-4">
                            <div className="relative">
                              <img
                                src={student.image.url}
                                alt={student.name}
                                className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
                              />
                              <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white ${student.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                            </div>
                          </div>

                          {/* Student Info */}
                          <div className="text-center mb-4">
                            <h3 className="font-bold text-xl mb-1 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                              {student.name}
                            </h3>
                            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mb-2">
                              <Building2 className="h-3 w-3" />
                              {student.college}
                            </p>
                          </div>

                          {/* Company Card */}
                          <div className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-xl mb-4 border border-violet-100 dark:border-violet-900">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-muted-foreground">Current Position</span>
                              <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                                {student.package}
                              </Badge>
                            </div>
                            <p className="font-bold text-base gradient-text">{student.company}</p>
                            <p className="text-sm text-muted-foreground">{student.role}</p>
                          </div>

                          {/* Skills */}
                          <div className="mb-4">
                            <p className="text-xs font-semibold mb-2 text-muted-foreground">SKILLS</p>
                            <div className="flex flex-wrap gap-1.5">
                              {student.skills.slice(0, 4).map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs glass-card hover:scale-105 transition-transform">
                                  {skill}
                                </Badge>
                              ))}
                              {student.skills.length > 4 && (
                                <Badge variant="secondary" className="text-xs glass-card">
                                  +{student.skills.length - 4} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Achievement */}
                          <div className="p-3 glass-card rounded-lg mb-4">
                            <div className="flex items-start gap-2">
                              <Award className="h-4 w-4 text-violet-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground mb-1">ACHIEVEMENT</p>
                                <p className="text-sm line-clamp-2">{student.achievement}</p>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate('/admin/outstanding-students')}
                              className="flex-1 glass-card text-blue-500 hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleToggleStudentStatus(student._id)}
                              className={`glass-card ${student.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400'}`}
                            >
                              {student.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteStudent(student._id)}
                              className="glass-card text-red-500 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium text-muted-foreground">No outstanding students found</p>
                    <p className="text-sm text-muted-foreground mt-2">Click "Add Student" to create your first outstanding student profile</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Testimonials Management</h2>
              <Button
                onClick={() => setShowAddTestimonial(true)}
                className="bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-700 hover:to-rose-700 hover:scale-105 transition-all"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Testimonial
              </Button>
            </div>

            {/* Testimonials Grid */}
            {testimonialsLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
              </div>
            ) : testimonialsData?.data && testimonialsData.data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonialsData.data.map((testimonial) => (
                  <Card key={testimonial._id} className="glass-card border-0 overflow-hidden hover:scale-[1.02] transition-all duration-300">
                    <div className="relative">
                      <img
                        src={testimonial.image?.url || '/placeholder.svg'}
                        alt={testimonial.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
                          onClick={() => handleEditTestimonialStart(testimonial)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className={testimonial.isActive
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                            : "bg-gradient-to-r from-gray-400 to-gray-500 text-white"}
                          onClick={() => handleToggleTestimonialStatus(testimonial._id)}
                          title={testimonial.isActive ? "Hide" : "Show"}
                        >
                          {testimonial.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                          onClick={() => handleDeleteTestimonial(testimonial._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {!testimonial.isActive && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-gray-500 text-white">Hidden</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      {testimonial.title && <p className="text-sm text-pink-600 font-medium">{testimonial.title}</p>}
                      {testimonial.role && <p className="text-xs text-muted-foreground">{testimonial.role}</p>}
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                        <Quote className="inline h-3 w-3 mr-1 text-pink-400" />
                        {testimonial.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass-card border-0">
                <CardContent className="py-12 text-center">
                  <MessageSquare className="h-16 w-16 text-pink-500 mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground mb-2">No Testimonials Yet</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Add your first testimonial to showcase student success stories
                  </p>
                  <Button
                    onClick={() => setShowAddTestimonial(true)}
                    className="bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-700 hover:to-rose-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Testimonial
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Add/Edit Testimonial Dialog */}
            <Dialog open={showAddTestimonial || !!editingTestimonial} onOpenChange={() => resetTestimonialForm()}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="testimonialName">Name *</Label>
                    <Input
                      id="testimonialName"
                      value={testimonialForm.name}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                      placeholder="Student name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="testimonialTitle">Title</Label>
                      <Input
                        id="testimonialTitle"
                        value={testimonialForm.title}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, title: e.target.value })}
                        placeholder="e.g., MERN Stack Graduate"
                      />
                    </div>
                    <div>
                      <Label htmlFor="testimonialRole">Role</Label>
                      <Input
                        id="testimonialRole"
                        value={testimonialForm.role}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                        placeholder="e.g., Software Developer"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="testimonialDescription">Testimonial *</Label>
                    <Textarea
                      id="testimonialDescription"
                      value={testimonialForm.description}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, description: e.target.value })}
                      placeholder="What the student said..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <div className="flex items-center gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setTestimonialForm({ ...testimonialForm, rating: star })}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 transition-colors ${
                              star <= testimonialForm.rating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300 hover:text-yellow-400'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">{testimonialForm.rating}/5</span>
                    </div>
                  </div>
                  <div>
                    <Label>Photo {!editingTestimonial && '*'}</Label>
                    <div className="mt-2 flex items-center gap-4">
                      {testimonialImagePreview && (
                        <img
                          src={testimonialImagePreview}
                          alt="Preview"
                          className="w-20 h-20 rounded-full object-cover border-2 border-pink-200"
                        />
                      )}
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleTestimonialImageChange}
                          className="cursor-pointer"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {editingTestimonial ? 'Leave empty to keep current image' : 'Required: Upload student photo'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-700 hover:to-rose-700"
                      onClick={editingTestimonial ? handleUpdateTestimonial : handleCreateTestimonial}
                      disabled={isCreatingTestimonial}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetTestimonialForm}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </>
  );
};

export default Admin;
