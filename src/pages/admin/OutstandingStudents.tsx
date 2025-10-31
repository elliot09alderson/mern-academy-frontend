import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  ArrowLeft,
  Upload,
  X,
  Save,
  Trash2,
  Edit,
  Award,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import { useGetOutstandingStudentsQuery, useCreateOutstandingStudentMutation, useDeleteOutstandingStudentMutation, useToggleStudentStatusMutation } from '@/store/api/outstandingStudentApi';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const OutstandingStudents = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // API hooks
  const { data: studentsData, isLoading } = useGetOutstandingStudentsQuery({});
  const [createStudent, { isLoading: isCreating }] = useCreateOutstandingStudentMutation();
  const [deleteStudent] = useDeleteOutstandingStudentMutation();
  const [toggleStatus] = useToggleStudentStatusMutation();

  // Form state
  const [formData, setFormData] = useState({
    rank: '',
    name: '',
    college: '',
    company: '',
    role: '',
    packageAmount: '',
    achievement: '',
    skills: ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast({
        title: "Error",
        description: "Please upload a student image",
        variant: "destructive",
      });
      return;
    }

    try {
      const submitFormData = new FormData();
      submitFormData.append('rank', formData.rank);
      submitFormData.append('name', formData.name);
      submitFormData.append('college', formData.college);
      submitFormData.append('company', formData.company);
      submitFormData.append('role', formData.role);
      submitFormData.append('packageAmount', formData.packageAmount);
      submitFormData.append('achievement', formData.achievement);
      submitFormData.append('image', imageFile);

      // Parse skills (comma-separated)
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
      submitFormData.append('skills', JSON.stringify(skillsArray));

      await createStudent(submitFormData).unwrap();

      toast({
        title: "Success!",
        description: "Outstanding student added successfully",
      });

      // Reset form
      setFormData({
        rank: '',
        name: '',
        college: '',
        company: '',
        role: '',
        packageAmount: '',
        achievement: '',
        skills: ''
      });
      setImageFile(null);
      setImagePreview('');
      setIsAddModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to add outstanding student",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
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

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatus(id).unwrap();
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Outstanding Students
          </h1>
          <p className="text-muted-foreground mt-2">Manage outstanding student profiles</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-0 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Add Outstanding Student
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              {/* Image Upload */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Student Image *</Label>
                <div className="border-2 border-dashed border-violet-300 rounded-lg p-6 glass-card hover:border-violet-400 transition-colors">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 rounded-full mx-auto object-cover ring-4 ring-primary/20"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-0 right-1/2 translate-x-16 bg-red-500 text-white rounded-full p-1.5"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <input
                        type="file"
                        id="studentImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        required
                      />
                      <label
                        htmlFor="studentImage"
                        className="flex flex-col items-center justify-center cursor-pointer"
                      >
                        <Upload className="h-12 w-12 text-violet-500 mb-3" />
                        <p className="text-sm font-medium text-foreground mb-1">
                          Click to upload student photo
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, WEBP up to 2MB
                        </p>
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rank">Rank *</Label>
                  <Input
                    id="rank"
                    name="rank"
                    type="number"
                    value={formData.rank}
                    onChange={handleInputChange}
                    placeholder="e.g., 1"
                    required
                    className="glass-card border-violet-200"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Rahul Sharma"
                    required
                    className="glass-card border-violet-200"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="college">College/Institution *</Label>
                <Input
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  placeholder="e.g., IIT Delhi"
                  required
                  className="glass-card border-violet-200"
                />
              </div>

              {/* Company Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g., Google"
                    required
                    className="glass-card border-violet-200"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role *</Label>
                  <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Engineer"
                    required
                    className="glass-card border-violet-200"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="packageAmount">Package *</Label>
                <Input
                  id="packageAmount"
                  name="packageAmount"
                  value={formData.packageAmount}
                  onChange={handleInputChange}
                  placeholder="e.g., 45 LPA"
                  required
                  className="glass-card border-violet-200"
                />
              </div>

              <div>
                <Label htmlFor="skills">Skills * (comma-separated)</Label>
                <Input
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g., React, Node.js, Python, System Design"
                  required
                  className="glass-card border-violet-200"
                />
              </div>

              <div>
                <Label htmlFor="achievement">Achievement *</Label>
                <Textarea
                  id="achievement"
                  name="achievement"
                  value={formData.achievement}
                  onChange={handleInputChange}
                  placeholder="e.g., All India Rank 1 in Placement"
                  required
                  rows={3}
                  className="glass-card border-violet-200"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex-1"
                >
                  {isCreating ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</>
                  ) : (
                    <><Save className="mr-2 h-4 w-4" />Save Student</>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="glass-card"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Students List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
        </div>
      ) : studentsData && studentsData.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentsData.data.map((student) => (
            <Card key={student._id} className="glass-card border-0 hover:scale-105 transition-all duration-300 overflow-hidden">
              <CardHeader className="relative">
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass-card"
                    onClick={() => handleToggleStatus(student._id)}
                  >
                    {student.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass-card text-red-500"
                    onClick={() => handleDelete(student._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={student.image.url}
                      alt={student.name}
                      className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/20"
                    />
                    <div className="absolute -top-2 -left-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full p-2 text-white font-bold text-sm">
                      #{student.rank}
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-lg bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      {student.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{student.college}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 glass-card rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Now at</p>
                    <p className="font-bold text-lg gradient-text">{student.company}</p>
                    <p className="text-sm font-medium text-muted-foreground">{student.role}</p>
                    <p className="text-sm font-semibold text-green-500 mt-1">{student.package}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {student.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs glass-card">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 glass-card rounded-lg">
                    <div className="flex items-start gap-2">
                      <Award className="h-4 w-4 text-violet-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{student.achievement}</p>
                    </div>
                  </div>

                  <Badge variant={student.isActive ? "default" : "secondary"} className="w-full justify-center">
                    {student.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="glass-card border-0">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Award className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No outstanding students found</p>
            <p className="text-sm text-muted-foreground mt-2">Click "Add Student" to create your first entry</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OutstandingStudents;
