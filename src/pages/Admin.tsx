import React, { useState } from 'react';
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
  Eye
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data
const mockRegistrations = [
  { id: 1, name: 'Rahul Kumar', email: 'rahul@example.com', type: 'Student', course: 'MERN Stack', date: '2024-01-15', status: 'Active' },
  { id: 2, name: 'Priya Singh', email: 'priya@example.com', type: 'Student', course: 'AI Development', date: '2024-01-14', status: 'Pending' },
  { id: 3, name: 'Dr. Amit Sharma', email: 'amit@mernacademy.com', type: 'Faculty', course: 'System Design', date: '2024-01-13', status: 'Active' },
];

const mockCourses = [
  { id: 1, title: 'MERN Stack Development', description: 'Complete full-stack development with MongoDB, Express, React, and Node.js', duration: '6 months', students: 45, price: '25,000', category: 'Development', status: 'Active' },
  { id: 2, title: 'AI-Powered Web Development', description: 'Learn modern web development with AI tools and frameworks', duration: '6 months', students: 32, price: '30,000', category: 'AI', status: 'Active' },
  { id: 3, title: 'Data Structures & Algorithms', description: 'Master DSA concepts for technical interviews', duration: '4 months', students: 28, price: '20,000', category: 'Development', status: 'Active' },
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
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddFacultyOpen, setIsAddFacultyOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
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

  const [newFaculty, setNewFaculty] = useState({
    name: '',
    email: '',
    expertise: '',
    experience: '',
    qualification: '',
    bio: ''
  });

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    category: '',
    capacity: ''
  });

  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    manager: '',
    capacity: ''
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">Manage your MERN Academy efficiently with modern tools</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8 glass-card">
            <TabsTrigger value="overview" className="hover:scale-105 transition-transform">Overview</TabsTrigger>
            <TabsTrigger value="registrations" className="hover:scale-105 transition-transform">Registrations</TabsTrigger>
            <TabsTrigger value="courses" className="hover:scale-105 transition-transform">Courses</TabsTrigger>
            <TabsTrigger value="faculty" className="hover:scale-105 transition-transform">Faculty</TabsTrigger>
            <TabsTrigger value="students" className="hover:scale-105 transition-transform">Students</TabsTrigger>
            <TabsTrigger value="feedbacks" className="hover:scale-105 transition-transform">Feedbacks</TabsTrigger>
            <TabsTrigger value="events" className="hover:scale-105 transition-transform">Events</TabsTrigger>
            <TabsTrigger value="branches" className="hover:scale-105 transition-transform">Branches</TabsTrigger>
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

          <TabsContent value="registrations" className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">User Registrations</CardTitle>
                <CardDescription>Manage student and faculty registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Course/Specialization</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRegistrations.map((reg) => (
                      <TableRow key={reg.id} className="hover:bg-violet-50/50 dark:hover:bg-violet-950/50">
                        <TableCell className="font-medium">{reg.name}</TableCell>
                        <TableCell>{reg.email}</TableCell>
                        <TableCell>{reg.type}</TableCell>
                        <TableCell>{reg.course}</TableCell>
                        <TableCell>{reg.date}</TableCell>
                        <TableCell>
                          <Badge variant={reg.status === 'Active' ? 'default' : 'secondary'}
                                 className={reg.status === 'Active' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : ''}>
                            {reg.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button size="sm" variant="outline" className="glass-card hover:scale-110 transition-transform">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="glass-card text-red-500 hover:scale-110 transition-transform">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Course Management</h2>
              <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 hover:scale-105 transition-all">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Course
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
              {mockCourses.map((course) => (
                <Card key={course.id} className="glass-card border-0 hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">{course.title}</CardTitle>
                        <Badge className="mt-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white">{course.category}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="glass-card hover:scale-110 transition-transform">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="glass-card hover:scale-110 transition-transform">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="glass-card text-red-500 hover:scale-110 transition-transform">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span>Duration: {course.duration}</span>
                      <span className="font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">₹{course.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faculty" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Faculty Management</h2>
              <Dialog open={isAddFacultyOpen} onOpenChange={setIsAddFacultyOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-all">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Faculty
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card border-0 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Add New Faculty</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="facultyName">Full Name</Label>
                        <Input 
                          id="facultyName" 
                          className="glass-card border-blue-200 focus:border-blue-400"
                          placeholder="e.g., Dr. Rahul Sharma"
                          value={newFaculty.name}
                          onChange={(e) => setNewFaculty({...newFaculty, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="facultyEmail">Email</Label>
                        <Input 
                          id="facultyEmail" 
                          type="email"
                          className="glass-card border-blue-200 focus:border-blue-400"
                          placeholder="rahul@academy.com"
                          value={newFaculty.email}
                          onChange={(e) => setNewFaculty({...newFaculty, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="facultyExpertise">Expertise</Label>
                        <Input 
                          id="facultyExpertise" 
                          className="glass-card border-blue-200 focus:border-blue-400"
                          placeholder="e.g., Full Stack Development"
                          value={newFaculty.expertise}
                          onChange={(e) => setNewFaculty({...newFaculty, expertise: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="facultyExperience">Experience</Label>
                        <Input 
                          id="facultyExperience" 
                          className="glass-card border-blue-200 focus:border-blue-400"
                          placeholder="e.g., 8 years"
                          value={newFaculty.experience}
                          onChange={(e) => setNewFaculty({...newFaculty, experience: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="facultyQualification">Qualification</Label>
                      <Input 
                        id="facultyQualification" 
                        className="glass-card border-blue-200 focus:border-blue-400"
                        placeholder="e.g., M.Tech in Computer Science, IIT Delhi"
                        value={newFaculty.qualification}
                        onChange={(e) => setNewFaculty({...newFaculty, qualification: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="facultyBio">Bio</Label>
                      <Textarea 
                        id="facultyBio" 
                        className="glass-card border-blue-200 focus:border-blue-400"
                        placeholder="Brief biography and achievements..."
                        value={newFaculty.bio}
                        onChange={(e) => setNewFaculty({...newFaculty, bio: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex-1 hover:scale-105 transition-transform">
                        <Save className="mr-2 h-4 w-4" />
                        Save Faculty
                      </Button>
                      <Button variant="outline" className="glass-card hover:scale-105 transition-transform" onClick={() => setIsAddFacultyOpen(false)}>
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFaculty.map((member) => (
                <Card key={member.id} className="glass-card border-0 hover:scale-105 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-4 flex items-center justify-center">
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{member.name}</CardTitle>
                    <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">{member.expertise}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p><strong>Experience:</strong> {member.experience}</p>
                      <p><strong>Email:</strong> {member.email}</p>
                      <p><strong>Students:</strong> {member.students}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="glass-card flex-1 hover:scale-110 transition-transform">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="glass-card flex-1 hover:scale-110 transition-transform">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="glass-card text-red-500 hover:scale-110 transition-transform">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                    {mockStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-emerald-50/50 dark:hover:bg-emerald-950/50">
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>{student.progress}</TableCell>
                        <TableCell>
                          <Badge variant={student.performance === 'Outstanding' ? 'default' : 'secondary'}
                                 className={student.performance === 'Outstanding' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : ''}>
                            {student.performance}
                          </Badge>
                        </TableCell>
                        <TableCell>{student.joinDate}</TableCell>
                        <TableCell className="space-x-2">
                          <Button size="sm" variant="outline" className="glass-card hover:scale-110 transition-transform">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="glass-card text-red-500 hover:scale-110 transition-transform">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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
              <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:scale-105 transition-all">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card border-0 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Create New Event</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="eventTitle">Event Title</Label>
                      <Input 
                        id="eventTitle" 
                        className="glass-card border-orange-200 focus:border-orange-400"
                        placeholder="e.g., AI Workshop 2024"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventDescription">Description</Label>
                      <Textarea 
                        id="eventDescription" 
                        className="glass-card border-orange-200 focus:border-orange-400"
                        placeholder="Event details and agenda..."
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eventDate">Date</Label>
                        <Input 
                          id="eventDate" 
                          type="date"
                          className="glass-card border-orange-200 focus:border-orange-400"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventTime">Time</Label>
                        <Input 
                          id="eventTime" 
                          type="time"
                          className="glass-card border-orange-200 focus:border-orange-400"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eventVenue">Venue</Label>
                        <Input 
                          id="eventVenue" 
                          className="glass-card border-orange-200 focus:border-orange-400"
                          placeholder="e.g., Main Auditorium"
                          value={newEvent.venue}
                          onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventCapacity">Capacity</Label>
                        <Input 
                          id="eventCapacity" 
                          type="number"
                          className="glass-card border-orange-200 focus:border-orange-400"
                          placeholder="100"
                          value={newEvent.capacity}
                          onChange={(e) => setNewEvent({...newEvent, capacity: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select value={newEvent.category} onValueChange={(value) => setNewEvent({...newEvent, category: value})}>
                        <SelectTrigger className="glass-card border-orange-200">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="webinar">Webinar</SelectItem>
                          <SelectItem value="hackathon">Hackathon</SelectItem>
                          <SelectItem value="seminar">Seminar</SelectItem>
                          <SelectItem value="networking">Networking</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex-1 hover:scale-105 transition-transform">
                        <Save className="mr-2 h-4 w-4" />
                        Create Event
                      </Button>
                      <Button variant="outline" className="glass-card hover:scale-105 transition-transform" onClick={() => setIsAddEventOpen(false)}>
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {mockEvents.map((event) => (
                <Card key={event.id} className="glass-card border-0 hover:scale-[1.02] transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{event.title}</h3>
                          <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}
                                 className={event.status === 'upcoming' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : ''}>
                            {event.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{event.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-orange-500" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-red-500" />
                            {event.venue}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-blue-500" />
                            {event.attendees} attendees
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="glass-card hover:scale-110 transition-transform">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="glass-card hover:scale-110 transition-transform">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="glass-card text-red-500 hover:scale-110 transition-transform">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="branches" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Branch Management</h2>
              <Dialog open={isAddBranchOpen} onOpenChange={setIsAddBranchOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:scale-105 transition-all">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Branch
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card border-0 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Add New Branch</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="branchName">Branch Name</Label>
                      <Input 
                        id="branchName" 
                        className="glass-card border-emerald-200 focus:border-emerald-400"
                        placeholder="e.g., Chennai Campus"
                        value={newBranch.name}
                        onChange={(e) => setNewBranch({...newBranch, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="branchAddress">Address</Label>
                      <Textarea 
                        id="branchAddress" 
                        className="glass-card border-emerald-200 focus:border-emerald-400"
                        placeholder="Complete address with landmark..."
                        value={newBranch.address}
                        onChange={(e) => setNewBranch({...newBranch, address: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="branchCity">City</Label>
                        <Input 
                          id="branchCity" 
                          className="glass-card border-emerald-200 focus:border-emerald-400"
                          placeholder="e.g., Chennai"
                          value={newBranch.city}
                          onChange={(e) => setNewBranch({...newBranch, city: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="branchPhone">Phone</Label>
                        <Input 
                          id="branchPhone" 
                          className="glass-card border-emerald-200 focus:border-emerald-400"
                          placeholder="+91-9876543214"
                          value={newBranch.phone}
                          onChange={(e) => setNewBranch({...newBranch, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="branchEmail">Email</Label>
                        <Input 
                          id="branchEmail" 
                          type="email"
                          className="glass-card border-emerald-200 focus:border-emerald-400"
                          placeholder="chennai@academy.com"
                          value={newBranch.email}
                          onChange={(e) => setNewBranch({...newBranch, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="branchManager">Branch Manager</Label>
                        <Input 
                          id="branchManager" 
                          className="glass-card border-emerald-200 focus:border-emerald-400"
                          placeholder="Manager Name"
                          value={newBranch.manager}
                          onChange={(e) => setNewBranch({...newBranch, manager: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="branchCapacity">Student Capacity</Label>
                      <Input 
                        id="branchCapacity" 
                        type="number"
                        className="glass-card border-emerald-200 focus:border-emerald-400"
                        placeholder="200"
                        value={newBranch.capacity}
                        onChange={(e) => setNewBranch({...newBranch, capacity: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex-1 hover:scale-105 transition-transform">
                        <Save className="mr-2 h-4 w-4" />
                        Save Branch
                      </Button>
                      <Button variant="outline" className="glass-card hover:scale-105 transition-transform" onClick={() => setIsAddBranchOpen(false)}>
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 1, name: "Delhi Campus", address: "Connaught Place, New Delhi", students: 120, faculty: 8, phone: "+91-9876543210" },
                { id: 2, name: "Mumbai Campus", address: "Bandra West, Mumbai", students: 95, faculty: 6, phone: "+91-9876543211" },
                { id: 3, name: "Bangalore Campus", address: "Koramangala, Bangalore", students: 150, faculty: 10, phone: "+91-9876543212" },
                { id: 4, name: "Pune Campus", address: "Hinjewadi, Pune", students: 80, faculty: 5, phone: "+91-9876543213" }
              ].map((branch) => (
                <Card key={branch.id} className="glass-card border-0 hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{branch.name}</CardTitle>
                        <p className="text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {branch.address}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="glass-card hover:scale-110 transition-transform">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="glass-card hover:scale-110 transition-transform">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="glass-card text-red-500 hover:scale-110 transition-transform">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">{branch.students}</div>
                        <div className="text-sm text-muted-foreground">Students</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">{branch.faculty}</div>
                        <div className="text-sm text-muted-foreground">Faculty</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{branch.phone}</div>
                        <div className="text-sm text-muted-foreground">Contact</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
