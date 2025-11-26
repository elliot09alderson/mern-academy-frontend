import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import {
  ArrowLeft,
  Upload,
  X,
  Save,
  Loader2,
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
import { useGetBranchQuery, useUpdateBranchMutation } from '@/store/api/branchApi';
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

const EditBranch = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: branchData, isLoading: isLoadingBranch } = useGetBranchQuery(id!, { skip: !id });
  const [updateBranch, { isLoading: isUpdating }] = useUpdateBranchMutation();

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
    availableSeats: '',
    establishedYear: '',
    isHeadquarters: false,
    isActive: true
  });

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

  // Load branch data
  useEffect(() => {
    if (branchData?.data) {
      const branch = branchData.data;
      setFormData({
        branchName: branch.branchName || '',
        branchCode: branch.branchCode || '',
        description: branch.description || '',
        street: branch.address?.street || '',
        city: branch.address?.city || '',
        state: branch.address?.state || '',
        zipCode: branch.address?.zipCode || '',
        fullAddress: branch.address?.fullAddress || '',
        phone: branch.contactInfo?.phone || '',
        email: branch.contactInfo?.email || '',
        alternatePhone: branch.contactInfo?.alternatePhone || '',
        weekdays: branch.operatingHours?.weekdays || 'Mon-Fri: 9:00 AM - 8:00 PM',
        weekends: branch.operatingHours?.weekends || 'Sat: 9:00 AM - 6:00 PM',
        totalSeats: branch.totalSeats?.toString() || '',
        availableSeats: branch.availableSeats?.toString() || '',
        establishedYear: branch.establishedYear?.toString() || '',
        isHeadquarters: branch.isHeadquarters || false,
        isActive: branch.isActive !== false
      });

      setSelectedFacilities(branch.facilities || []);
      setExistingImages(branch.images || []);
    }
  }, [branchData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setNewImages(prev => [...prev, ...fileArray]);

      fileArray.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
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

    if (!id) return;

    try {
      const formDataToSend = new FormData();

      // Basic info
      formDataToSend.append('branchName', formData.branchName);
      formDataToSend.append('branchCode', formData.branchCode);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('totalSeats', formData.totalSeats);
      formDataToSend.append('availableSeats', formData.availableSeats || formData.totalSeats);
      formDataToSend.append('isActive', String(formData.isActive));

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

      // New Images
      newImages.forEach((image) => {
        formDataToSend.append('images', image);
      });

      await updateBranch({ id, formData: formDataToSend }).unwrap();

      toast({
        title: "Success!",
        description: "Branch updated successfully",
      });

      navigate('/admin/branches');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to update branch",
        variant: "destructive",
      });
    }
  };

  if (isLoadingBranch) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-[64px] md:pt-[80px] flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
        </div>
      </>
    );
  }

  if (!branchData?.data) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-[64px] md:pt-[80px] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Branch Not Found</h2>
            <p className="text-gray-600 mb-4">The branch you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/admin/branches')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Branches
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
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/branches')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Branches
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Edit Branch
            </h1>
            <p className="text-muted-foreground mt-2">Update branch details and information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Toggle */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Branch Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    {formData.isActive ? 'Active - Branch is visible' : 'Inactive - Branch is hidden'}
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Current Images
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {existingImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.url}
                          alt={`Branch ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-emerald-200"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* New Images */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Add New Images
                </CardTitle>
                <CardDescription>Upload additional images for the branch</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                      Click to upload new images
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </label>
                </div>

                {newImagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {newImagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`New ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-emerald-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div className="absolute bottom-1 left-1 bg-black/50 text-white px-2 py-0.5 rounded text-xs">
                          New
                        </div>
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
                      onChange={(e) => setFormData(prev => ({ ...prev, branchCode: e.target.value.toUpperCase() }))}
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
                    required
                    rows={3}
                    className="glass-card border-emerald-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="totalSeats">Total Seats *</Label>
                    <Input
                      id="totalSeats"
                      name="totalSeats"
                      type="number"
                      value={formData.totalSeats}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="glass-card border-emerald-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="availableSeats">Available Seats</Label>
                    <Input
                      id="availableSeats"
                      name="availableSeats"
                      type="number"
                      value={formData.availableSeats}
                      onChange={handleInputChange}
                      min="0"
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
                    rows={2}
                    className="glass-card border-emerald-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="glass-card border-emerald-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
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
                      className="glass-card border-emerald-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="glass-card border-emerald-200"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Facilities & Amenities
                </CardTitle>
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
                disabled={isUpdating}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 h-12 text-lg"
              >
                <Save className="mr-2 h-5 w-5" />
                {isUpdating ? 'Updating...' : 'Update Branch'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/branches')}
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

export default EditBranch;
