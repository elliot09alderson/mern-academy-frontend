import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Upload, X, Loader2 } from 'lucide-react';
import { useGetFacultyQuery, useUpdateFacultyMutation } from '@/store/api/facultyApi';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/Navigation';

const EditFaculty = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: facultyData, isLoading: isLoadingFaculty } = useGetFacultyQuery(id!, { skip: !id });
  const [updateFaculty, { isLoading: isUpdating }] = useUpdateFacultyMutation();

  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    specialization: '',
    qualification: '',
    experience: '',
    expertise: '',
    officeHours: '',
    isActive: true
  });

  const [facultyImage, setFacultyImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [existingImage, setExistingImage] = useState<string>('');

  // Load faculty data
  useEffect(() => {
    if (facultyData?.data) {
      const faculty = facultyData.data;
      setFormData({
        employeeId: faculty.employeeId || '',
        name: faculty.name || '',
        email: faculty.email || '',
        specialization: faculty.specialization || '',
        qualification: faculty.qualification || '',
        experience: faculty.experience?.toString() || '',
        expertise: Array.isArray(faculty.expertise) ? faculty.expertise.join(', ') : '',
        officeHours: faculty.officeHours || '',
        isActive: faculty.isActive !== false
      });

      if (faculty.image?.url) {
        setExistingImage(faculty.image.url);
      }
    }
  }, [facultyData]);

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

    if (!id) return;

    try {
      // Parse expertise
      const expertiseArray = formData.expertise.split(',').map(e => e.trim()).filter(e => e);

      const updates: any = {
        employeeId: formData.employeeId,
        name: formData.name,
        email: formData.email,
        specialization: formData.specialization,
        qualification: formData.qualification,
        experience: parseInt(formData.experience) || 0,
        expertise: expertiseArray,
        officeHours: formData.officeHours,
        isActive: formData.isActive
      };

      await updateFaculty({ id, updates }).unwrap();

      toast({
        title: "Success!",
        description: "Faculty member updated successfully",
      });

      navigate('/admin/faculty');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to update faculty member",
        variant: "destructive",
      });
    }
  };

  if (isLoadingFaculty) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-[64px] md:pt-[80px] flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      </>
    );
  }

  if (!facultyData?.data) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-[64px] md:pt-[80px] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Faculty Not Found</h2>
            <p className="text-gray-600 mb-4">The faculty member you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/admin/faculty')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Faculty
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-[64px] md:pt-[80px] p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/faculty')}
              className="mb-4 hover:bg-blue-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Faculty
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Edit Faculty
            </h1>
            <p className="text-muted-foreground mt-2">Update faculty member details</p>
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
                {/* Status Toggle */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    {formData.isActive ? 'Active - Faculty is visible' : 'Inactive - Faculty is hidden'}
                  </Label>
                </div>

                {/* Current Image */}
                {(imagePreview || existingImage) && (
                  <div className="flex justify-center">
                    <div className="relative">
                      <img
                        src={imagePreview || existingImage}
                        alt="Faculty"
                        className="w-48 h-48 object-cover rounded-lg border-4 border-blue-200"
                      />
                      {imagePreview && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                        {imagePreview ? 'New Image' : 'Current Image'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Image Upload */}
                <div>
                  <Label htmlFor="facultyImage" className="text-base font-semibold">Update Photo</Label>
                  <div className="mt-2">
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <Label
                        htmlFor="facultyImage"
                        className="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                      >
                        <span className="text-blue-600 font-semibold">Click to upload new photo</span>
                      </Label>
                      <Input
                        id="facultyImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
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
                    disabled={isUpdating}
                  >
                    <Save className="mr-2 h-5 w-5" />
                    {isUpdating ? 'Updating...' : 'Update Faculty'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="glass-card text-base py-6"
                    onClick={() => navigate('/admin/faculty')}
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
    </>
  );
};

export default EditFaculty;
