import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Upload,
  X,
  Save,
  Loader2,
  Award
} from 'lucide-react';
import { useCreateOutstandingStudentMutation } from '@/store/api/outstandingStudentApi';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/Navigation';

const AddOutstandingStudent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [createStudent, { isLoading: isCreating }] = useCreateOutstandingStudentMutation();

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

      navigate('/admin');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to add outstanding student",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-[64px] md:pt-[80px] p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/admin')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Add Outstanding Student
            </h1>
            <p className="text-muted-foreground mt-2">Add a new outstanding student to showcase on your homepage</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Image */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Student Photo
                </CardTitle>
                <CardDescription>Upload a high-quality photo of the student</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-violet-300 rounded-lg p-8 glass-card hover:border-violet-400 transition-colors">
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-40 h-40 rounded-full mx-auto object-cover ring-4 ring-primary/20"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2"
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
                        <Upload className="h-16 w-16 text-violet-500 mb-4" />
                        <p className="text-lg font-medium text-foreground mb-2">
                          Click to upload student photo
                        </p>
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG, WEBP up to 2MB
                        </p>
                      </label>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      min="1"
                      className="glass-card border-violet-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
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
              </CardContent>
            </Card>

            {/* Placement Information */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Placement Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="role">Job Role *</Label>
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
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter the package amount (e.g., "45 LPA" or "₹45,00,000")
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Achievement */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Skills & Achievement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate skills with commas. Example: React, Node.js, Python
                  </p>
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
                  <p className="text-xs text-muted-foreground mt-1">
                    Describe the student's notable achievement
                  </p>
                </div>

                {/* Skills Preview */}
                {formData.skills && (
                  <div>
                    <Label className="mb-2 block">Skills Preview:</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.split(',').map((skill, index) => {
                        const trimmedSkill = skill.trim();
                        return trimmedSkill ? (
                          <Badge key={index} variant="secondary" className="glass-card">
                            {trimmedSkill}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex gap-4 sticky bottom-6 z-10">
              <Button
                type="submit"
                disabled={isCreating}
                className="flex-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600 h-12 text-lg"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Adding Student...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Add Outstanding Student
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin')}
                className="glass-card h-12"
              >
                <X className="mr-2 h-5 w-5" />
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddOutstandingStudent;
