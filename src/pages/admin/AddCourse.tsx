import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowLeft,
  Save,
  X,
  Loader2,
  Code2,
  Brain,
  Rocket,
  Star,
  Trophy,
  Target,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { useCreateCourseMutation } from '@/store/api/courseApi';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/Navigation';

const ICON_OPTIONS = [
  { value: 'code', label: 'Code', icon: Code2 },
  { value: 'brain', label: 'Brain', icon: Brain },
  { value: 'rocket', label: 'Rocket', icon: Rocket },
  { value: 'star', label: 'Star', icon: Star },
  { value: 'trophy', label: 'Trophy', icon: Trophy },
  { value: 'target', label: 'Target', icon: Target },
];

const LEVEL_OPTIONS = ['Beginner Friendly', 'Intermediate', 'Advanced'];
const BATCH_SIZE_OPTIONS = ['Small Batch', 'Medium Batch', 'Large Batch'];

const AddCourse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();

  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    description: '',
    duration: '',
    icon: 'code',
    level: 'Beginner Friendly',
    batchSize: 'Small Batch',
    features: '',
    originalPrice: '',
    discountedPrice: '',
    discountPercentage: '',
    isLimitedOffer: false,
  });

  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBanner = () => {
    setBannerImage(null);
    setBannerPreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Parse features (comma-separated)
      const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f);

      // Calculate discount percentage if not provided
      let discountPercentage = parseFloat(formData.discountPercentage) || 0;
      if (!discountPercentage && formData.originalPrice && formData.discountedPrice) {
        const original = parseFloat(formData.originalPrice);
        const discounted = parseFloat(formData.discountedPrice);
        discountPercentage = Math.round(((original - discounted) / original) * 100);
      }

      // Create FormData for file upload
      const submitFormData = new FormData();
      submitFormData.append('courseName', formData.courseName);
      submitFormData.append('courseCode', formData.courseCode.toUpperCase());
      submitFormData.append('description', formData.description);
      submitFormData.append('duration', formData.duration);
      submitFormData.append('icon', formData.icon);
      submitFormData.append('level', formData.level);
      submitFormData.append('batchSize', formData.batchSize);
      submitFormData.append('features', JSON.stringify(featuresArray));
      submitFormData.append('originalPrice', formData.originalPrice);
      submitFormData.append('discountedPrice', formData.discountedPrice);
      submitFormData.append('discountPercentage', discountPercentage.toString());
      submitFormData.append('isLimitedOffer', formData.isLimitedOffer.toString());

      // Add banner image if uploaded
      if (bannerImage) {
        submitFormData.append('bannerImage', bannerImage);
      }

      await createCourse(submitFormData).unwrap();

      toast({
        title: "Success!",
        description: "Course created successfully",
      });

      navigate('/admin');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to create course",
        variant: "destructive",
      });
    }
  };

  const selectedIcon = ICON_OPTIONS.find(opt => opt.value === formData.icon);
  const IconComponent = selectedIcon?.icon || Code2;

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
              Add New Course
            </h1>
            <p className="text-muted-foreground mt-2">Create a new course for your academy</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Course Banner Image */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Course Banner Image
                </CardTitle>
                <CardDescription>Upload a banner image for the course (Recommended: 1200x600px)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-violet-300 rounded-lg p-8 glass-card hover:border-violet-400 transition-colors">
                  {bannerPreview ? (
                    <div className="relative">
                      <img
                        src={bannerPreview}
                        alt="Banner Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeBanner}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <input
                        type="file"
                        id="bannerImage"
                        accept="image/*"
                        onChange={handleBannerChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="bannerImage"
                        className="flex flex-col items-center justify-center cursor-pointer"
                      >
                        <ImageIcon className="h-16 w-16 text-violet-500 mb-4" />
                        <p className="text-lg font-medium text-foreground mb-2">
                          Click to upload course banner
                        </p>
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG, WEBP up to 5MB (Optional)
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
                    <Label htmlFor="courseName">Course Name *</Label>
                    <Input
                      id="courseName"
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleInputChange}
                      placeholder="e.g., Full Stack MERN Development"
                      required
                      className="glass-card border-violet-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="courseCode">Course Code *</Label>
                    <Input
                      id="courseCode"
                      name="courseCode"
                      value={formData.courseCode}
                      onChange={handleInputChange}
                      placeholder="e.g., MERN101"
                      required
                      className="glass-card border-violet-200"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Complete MERN stack development with React, Node.js, MongoDB, and Express"
                    required
                    rows={3}
                    className="glass-card border-violet-200"
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 6 months"
                    required
                    className="glass-card border-violet-200"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Course Details */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Course Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="icon">Icon *</Label>
                    <Select
                      value={formData.icon}
                      onValueChange={(value) => handleSelectChange('icon', value)}
                    >
                      <SelectTrigger className="glass-card border-violet-200">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            {selectedIcon?.label}
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {ICON_OPTIONS.map((option) => {
                          const Icon = option.icon;
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {option.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="level">Level *</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(value) => handleSelectChange('level', value)}
                    >
                      <SelectTrigger className="glass-card border-violet-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LEVEL_OPTIONS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="batchSize">Batch Size *</Label>
                    <Select
                      value={formData.batchSize}
                      onValueChange={(value) => handleSelectChange('batchSize', value)}
                    >
                      <SelectTrigger className="glass-card border-violet-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BATCH_SIZE_OPTIONS.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="features">Features (comma-separated) *</Label>
                  <Textarea
                    id="features"
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    placeholder="e.g., Live Projects, 1-on-1 Sessions, Placement Support, Industry Mentorship"
                    required
                    rows={2}
                    className="glass-card border-violet-200"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate each feature with a comma
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="originalPrice">Original Price (₹) *</Label>
                    <Input
                      id="originalPrice"
                      name="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      placeholder="49999"
                      required
                      className="glass-card border-violet-200"
                    />
                  </div>

                  <div>
                    <Label htmlFor="discountedPrice">Discounted Price (₹) *</Label>
                    <Input
                      id="discountedPrice"
                      name="discountedPrice"
                      type="number"
                      value={formData.discountedPrice}
                      onChange={handleInputChange}
                      placeholder="44999"
                      required
                      className="glass-card border-violet-200"
                    />
                  </div>

                  <div>
                    <Label htmlFor="discountPercentage">Discount % (Optional)</Label>
                    <Input
                      id="discountPercentage"
                      name="discountPercentage"
                      type="number"
                      value={formData.discountPercentage}
                      onChange={handleInputChange}
                      placeholder="10"
                      className="glass-card border-violet-200"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Auto-calculated if left empty
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isLimitedOffer"
                    checked={formData.isLimitedOffer}
                    onCheckedChange={(checked) =>
                      setFormData(prev => ({ ...prev, isLimitedOffer: checked as boolean }))
                    }
                  />
                  <Label htmlFor="isLimitedOffer" className="cursor-pointer">
                    Mark as Limited Time Offer
                  </Label>
                </div>
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
                    Creating Course...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Create Course
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

export default AddCourse;
