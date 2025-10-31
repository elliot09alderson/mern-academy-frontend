import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { useCreateFacultyMutation } from '@/store/api/facultyApi';
import { useToast } from '@/hooks/use-toast';

const AddFaculty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [createFaculty, { isLoading: isCreating }] = useCreateFacultyMutation();

  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    specialization: '',
    qualification: '',
    experience: '',
    expertise: '',
    officeHours: ''
  });

  const [facultyImage, setFacultyImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFacultyImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFacultyImage(null);
    setImagePreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!facultyImage) {
      toast({
        title: "Error",
        description: "Please select an image for the faculty member",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.employeeId ||
        !formData.specialization || !formData.qualification || !formData.experience) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('employeeId', formData.employeeId);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('specialization', formData.specialization);
      formDataToSend.append('qualification', formData.qualification);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('image', facultyImage);

      if (formData.expertise) {
        formDataToSend.append('expertise', formData.expertise);
      }
      if (formData.officeHours) {
        formDataToSend.append('officeHours', formData.officeHours);
      }

      await createFaculty(formDataToSend).unwrap();

      toast({
        title: "Success!",
        description: "Faculty member added successfully",
      });

      navigate('/admin');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to add faculty member",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin')}
            className="mb-4 hover:bg-blue-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Add New Faculty
          </h1>
          <p className="text-muted-foreground mt-2">Add faculty member details and upload photo</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card className="glass-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Faculty Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Upload */}
              <div>
                <Label htmlFor="facultyImage" className="text-base font-semibold">Faculty Photo *</Label>
                <div className="mt-2">
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                      <Label
                        htmlFor="facultyImage"
                        className="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                      >
                        <span className="text-blue-600 font-semibold">Click to upload</span> or drag and drop
                        <br />
                        PNG, JPG, WEBP up to 2MB
                      </Label>
                      <Input
                        id="facultyImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Faculty preview"
                        className="w-48 h-48 object-cover rounded-lg mx-auto border-4 border-blue-200"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Employee ID & Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="employeeId" className="text-base font-semibold">Employee ID *</Label>
                  <Input
                    id="employeeId"
                    className="glass-card border-blue-200 focus:border-blue-400 mt-2"
                    placeholder="e.g., FAC001"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value.toUpperCase() })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name" className="text-base font-semibold">Full Name *</Label>
                  <Input
                    id="name"
                    className="glass-card border-blue-200 focus:border-blue-400 mt-2"
                    placeholder="e.g., Dr. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Email & Specialization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-base font-semibold">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    className="glass-card border-blue-200 focus:border-blue-400 mt-2"
                    placeholder="e.g., john@mernacademy.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="specialization" className="text-base font-semibold">Specialization *</Label>
                  <Input
                    id="specialization"
                    className="glass-card border-blue-200 focus:border-blue-400 mt-2"
                    placeholder="e.g., Full Stack Development"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Qualification & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="qualification" className="text-base font-semibold">Qualification *</Label>
                  <Input
                    id="qualification"
                    className="glass-card border-blue-200 focus:border-blue-400 mt-2"
                    placeholder="e.g., M.Tech in Computer Science"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="experience" className="text-base font-semibold">Experience (Years) *</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    className="glass-card border-blue-200 focus:border-blue-400 mt-2"
                    placeholder="e.g., 8"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Expertise */}
              <div>
                <Label htmlFor="expertise" className="text-base font-semibold">Expertise (comma-separated)</Label>
                <Textarea
                  id="expertise"
                  className="glass-card border-blue-200 focus:border-blue-400 mt-2"
                  placeholder="e.g., React, Node.js, MongoDB, Express"
                  rows={3}
                  value={formData.expertise}
                  onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                />
                <p className="text-sm text-muted-foreground mt-1">Separate multiple items with commas</p>
              </div>

              {/* Office Hours */}
              <div>
                <Label htmlFor="officeHours" className="text-base font-semibold">Office Hours</Label>
                <Input
                  id="officeHours"
                  className="glass-card border-blue-200 focus:border-blue-400 mt-2"
                  placeholder="e.g., Mon-Fri: 10:00 AM - 5:00 PM"
                  value={formData.officeHours}
                  onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex-1 hover:from-emerald-600 hover:to-teal-600 text-base py-6"
                  disabled={isCreating}
                >
                  <Save className="mr-2 h-5 w-5" />
                  {isCreating ? 'Adding Faculty...' : 'Add Faculty'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="glass-card text-base py-6"
                  onClick={() => navigate('/admin')}
                >
                  <X className="mr-2 h-5 w-5" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default AddFaculty;
