import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  Upload,
  X,
  Save,
  Loader2,
  Star
} from 'lucide-react';
import { useCreateTestimonialMutation } from '@/store/api/testimonialApi';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/Navigation';

const AddTestimonial = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [createTestimonial, { isLoading: isCreating }] = useCreateTestimonialMutation();

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    role: '',
    description: '',
    rating: '5',
    order: '0'
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
        description: "Please upload a testimonial image",
        variant: "destructive",
      });
      return;
    }

    try {
      const submitFormData = new FormData();
      submitFormData.append('name', formData.name);
      submitFormData.append('title', formData.title);
      submitFormData.append('role', formData.role);
      submitFormData.append('description', formData.description);
      submitFormData.append('rating', formData.rating);
      submitFormData.append('order', formData.order);
      submitFormData.append('image', imageFile);

      await createTestimonial(submitFormData).unwrap();

      toast({
        title: "Success!",
        description: "Testimonial added successfully",
      });

      navigate('/admin/testimonials');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to add testimonial",
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
              onClick={() => navigate('/admin/testimonials')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Testimonials
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Add Testimonial
            </h1>
            <p className="text-muted-foreground mt-2">Add a new student testimonial to showcase on your homepage</p>
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
                        id="testimonialImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        required
                      />
                      <label
                        htmlFor="testimonialImage"
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
                    <Label htmlFor="name">Student Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Rahul Sharma"
                      required
                      className="glass-card border-0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="role">Role/Position *</Label>
                    <Input
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      placeholder="e.g., Full Stack Developer"
                      required
                      className="glass-card border-0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="rating">Rating (1-5) *</Label>
                    <Input
                      id="rating"
                      name="rating"
                      type="number"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={handleInputChange}
                      required
                      className="glass-card border-0"
                    />
                    <div className="flex gap-1 mt-2">
                      {[...Array(parseInt(formData.rating) || 0)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="order">Display Order</Label>
                    <Input
                      id="order"
                      name="order"
                      type="number"
                      value={formData.order}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="glass-card border-0"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Lower numbers appear first</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Testimonial Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Best Learning Experience"
                    required
                    className="glass-card border-0"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Testimonial Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Share the student's experience and feedback..."
                    rows={5}
                    required
                    className="glass-card border-0 resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.description.length}/1000 characters
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/testimonials')}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCreating}
                className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 text-white"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Add Testimonial
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTestimonial;
