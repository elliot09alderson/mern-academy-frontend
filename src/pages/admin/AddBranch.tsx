import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowLeft,
  Upload,
  X,
  Save,
  ImageIcon,
  Monitor,
  Wifi,
  Snowflake,
  Car,
  Coffee,
  BookOpen,
  Shield,
  Users,
  Projector,
  Presentation,
  Trophy,
  Bed,
  Heart
} from 'lucide-react';
import { useCreateBranchMutation } from '@/store/api/branchApi';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/Navigation';

const FACILITIES_OPTIONS = [
  '50+ Lab Computers',
  'High-Speed Wi-Fi',
  'Air Conditioned Rooms',
  'Parking Facility',
  'Cafeteria',
  'Library',
  '24/7 Security',
  'Career Counseling',
  'Projector Rooms',
  'Conference Hall',
  'Sports Facility',
  'Hostel',
  'Medical Room'
];

const FACILITY_ICONS: Record<string, any> = {
  '50+ Lab Computers': Monitor,
  'High-Speed Wi-Fi': Wifi,
  'Air Conditioned Rooms': Snowflake,
  'Parking Facility': Car,
  'Cafeteria': Coffee,
  'Library': BookOpen,
  '24/7 Security': Shield,
  'Career Counseling': Users,
  'Projector Rooms': Projector,
  'Conference Hall': Presentation,
  'Sports Facility': Trophy,
  'Hostel': Bed,
  'Medical Room': Heart
};

const AddBranch = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [createBranch, { isLoading }] = useCreateBranchMutation();

  const [formData, setFormData] = useState({
    branchName: '',
    branchCode: '',
    description: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    fullAddress: '',
    phone: '',
    email: '',
    alternatePhone: '',
    weekdays: 'Mon-Fri: 9:00 AM - 8:00 PM',
    weekends: 'Sat: 9:00 AM - 6:00 PM',
    totalSeats: '',
    establishedYear: '',
    isHeadquarters: false
  });

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [branchImages, setBranchImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setBranchImages(prev => [...prev, ...fileArray]);

      fileArray.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setBranchImages(prev => prev.filter((_, i) => i !== index));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleFacilityToggle = (facility: string) => {
    setSelectedFacilities(prev =>
      prev.includes(facility)
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Basic info
      formDataToSend.append('branchName', formData.branchName);
      formDataToSend.append('branchCode', formData.branchCode);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('totalSeats', formData.totalSeats);

      if (formData.establishedYear) {
        formDataToSend.append('establishedYear', formData.establishedYear);
      }

      // Address
      const address = {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        fullAddress: formData.fullAddress,
        country: 'India'
      };
      formDataToSend.append('address', JSON.stringify(address));

      // Contact Info
      const contactInfo = {
        phone: formData.phone,
        email: formData.email,
        alternatePhone: formData.alternatePhone
      };
      formDataToSend.append('contactInfo', JSON.stringify(contactInfo));

      // Operating Hours
      const operatingHours = {
        weekdays: formData.weekdays,
        weekends: formData.weekends
      };
      formDataToSend.append('operatingHours', JSON.stringify(operatingHours));

      // Facilities
      formDataToSend.append('facilities', JSON.stringify(selectedFacilities));

      // Headquarters status
      formDataToSend.append('isHeadquarters', String(formData.isHeadquarters));

      // Images
      branchImages.forEach((image) => {
        formDataToSend.append('images', image);
      });

      await createBranch(formDataToSend).unwrap();

      toast({
        title: "Success!",
        description: "Branch created successfully",
      });

      navigate('/admin');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to create branch",
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Add New Branch
          </h1>
          <p className="text-muted-foreground mt-2">Fill in the details to create a new branch location</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Branch Images */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Branch Images
              </CardTitle>
              <CardDescription>Upload high-quality images of the branch (up to 10 images)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-emerald-300 rounded-lg p-8 glass-card hover:border-emerald-400 transition-colors">
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
                  <Upload className="h-16 w-16 text-emerald-500 mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    Click to upload branch images
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG, WEBP up to 5MB (Max 10 images)
                  </p>
                </label>
              </div>

              {imagePreview.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreview.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg border-2 border-emerald-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="branchName">Branch Name *</Label>
                  <Input
                    id="branchName"
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleInputChange}
                    placeholder="e.g., MERN Academy - Delhi Main Campus"
                    required
                    className="glass-card border-emerald-200"
                  />
                </div>
                <div>
                  <Label htmlFor="branchCode">Branch Code *</Label>
                  <Input
                    id="branchCode"
                    name="branchCode"
                    value={formData.branchCode}
                    onChange={(e) => {
                      const uppercaseValue = e.target.value.toUpperCase();
                      setFormData(prev => ({ ...prev, branchCode: uppercaseValue }));
                    }}
                    placeholder="e.g., DEL001"
                    required
                    className="glass-card border-emerald-200"
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
                  placeholder="Describe the branch location, key features, and what makes it unique..."
                  required
                  rows={4}
                  className="glass-card border-emerald-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalSeats">Total Student Capacity *</Label>
                  <Input
                    id="totalSeats"
                    name="totalSeats"
                    type="number"
                    value={formData.totalSeats}
                    onChange={handleInputChange}
                    placeholder="e.g., 120"
                    required
                    min="1"
                    className="glass-card border-emerald-200"
                  />
                </div>
                <div>
                  <Label htmlFor="establishedYear">Established Year</Label>
                  <Input
                    id="establishedYear"
                    name="establishedYear"
                    type="number"
                    value={formData.establishedYear}
                    onChange={handleInputChange}
                    placeholder="e.g., 2020"
                    min="1900"
                    max={new Date().getFullYear()}
                    className="glass-card border-emerald-200"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isHeadquarters"
                  checked={formData.isHeadquarters}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isHeadquarters: checked as boolean }))}
                />
                <Label htmlFor="isHeadquarters" className="cursor-pointer">
                  Mark as Headquarters
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullAddress">Full Address</Label>
                <Textarea
                  id="fullAddress"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleInputChange}
                  placeholder="Complete address with landmark (e.g., Plot No. 45, Sector 18, Noida, Uttar Pradesh 201301)"
                  rows={3}
                  className="glass-card border-emerald-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="street">Street/Area</Label>
                  <Input
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="e.g., Plot No. 45, Sector 18"
                    className="glass-card border-emerald-200"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Noida"
                    className="glass-card border-emerald-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="e.g., Uttar Pradesh"
                    className="glass-card border-emerald-200"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="e.g., 201301"
                    className="glass-card border-emerald-200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Primary Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="glass-card border-emerald-200"
                  />
                </div>
                <div>
                  <Label htmlFor="alternatePhone">Alternate Phone</Label>
                  <Input
                    id="alternatePhone"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43211"
                    className="glass-card border-emerald-200"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="delhi@mernacademy.com"
                  className="glass-card border-emerald-200"
                />
              </div>
            </CardContent>
          </Card>

          {/* Operating Hours */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Operating Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weekdays">Weekdays</Label>
                  <Input
                    id="weekdays"
                    name="weekdays"
                    value={formData.weekdays}
                    onChange={handleInputChange}
                    placeholder="Mon-Fri: 9:00 AM - 8:00 PM"
                    className="glass-card border-emerald-200"
                  />
                </div>
                <div>
                  <Label htmlFor="weekends">Weekends</Label>
                  <Input
                    id="weekends"
                    name="weekends"
                    value={formData.weekends}
                    onChange={handleInputChange}
                    placeholder="Sat: 9:00 AM - 6:00 PM"
                    className="glass-card border-emerald-200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Facilities & Amenities */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Facilities & Amenities
              </CardTitle>
              <CardDescription>Select all facilities available at this branch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FACILITIES_OPTIONS.map((facility) => {
                  const IconComponent = FACILITY_ICONS[facility] || Monitor;
                  return (
                    <div
                      key={facility}
                      className="flex items-center space-x-2 p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors"
                    >
                      <Checkbox
                        id={facility}
                        checked={selectedFacilities.includes(facility)}
                        onCheckedChange={() => handleFacilityToggle(facility)}
                      />
                      <IconComponent className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      <Label htmlFor={facility} className="cursor-pointer text-sm">
                        {facility}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4 sticky bottom-6 z-10">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 h-12 text-lg"
            >
              <Save className="mr-2 h-5 w-5" />
              {isLoading ? 'Creating Branch...' : 'Create Branch'}
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

export default AddBranch;
