import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { useCreateEventMutation } from '@/store/api/eventApi';
import { useToast } from '@/hooks/use-toast';

const AddEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();

  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    startDate: '',
    endDate: '',
    venue: '',
    organizer: '',
    eventType: 'workshop' as const,
    category: 'Workshop' as const,
    registrationLink: '',
    maxParticipants: '',
    isFeatured: false
  });

  const [eventImage, setEventImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setEventImage(null);
    setImagePreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventImage) {
      toast({
        title: "Error",
        description: "Please select an image for the event",
        variant: "destructive",
      });
      return;
    }

    if (!formData.eventName || !formData.description || !formData.startDate ||
        !formData.endDate || !formData.venue || !formData.organizer) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('eventName', formData.eventName);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('startDate', new Date(formData.startDate).toISOString());
      formDataToSend.append('endDate', new Date(formData.endDate).toISOString());
      formDataToSend.append('venue', formData.venue);
      formDataToSend.append('organizer', formData.organizer);
      formDataToSend.append('eventType', formData.eventType);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('image', eventImage);

      if (formData.registrationLink) {
        formDataToSend.append('registrationLink', formData.registrationLink);
      }
      if (formData.maxParticipants) {
        formDataToSend.append('maxParticipants', formData.maxParticipants);
      }
      formDataToSend.append('isFeatured', String(formData.isFeatured));

      await createEvent(formDataToSend).unwrap();

      toast({
        title: "Success!",
        description: "Event created successfully",
      });

      navigate('/admin');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to create event",
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
            className="mb-4 hover:bg-orange-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Create New Event
          </h1>
          <p className="text-muted-foreground mt-2">Add event details and upload images</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card className="glass-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Event Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Upload */}
              <div>
                <Label htmlFor="eventImage" className="text-base font-semibold">Event Image *</Label>
                <div className="mt-2">
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                      <Label
                        htmlFor="eventImage"
                        className="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                      >
                        <span className="text-orange-600 font-semibold">Click to upload</span> or drag and drop
                        <br />
                        PNG, JPG, WEBP up to 5MB
                      </Label>
                      <Input
                        id="eventImage"
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
                        alt="Event preview"
                        className="w-full h-64 object-cover rounded-lg"
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

              {/* Event Name */}
              <div>
                <Label htmlFor="eventName" className="text-base font-semibold">Event Name *</Label>
                <Input
                  id="eventName"
                  className="glass-card border-orange-200 focus:border-orange-400 mt-2"
                  placeholder="e.g., AI Workshop 2024"
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-base font-semibold">Description *</Label>
                <Textarea
                  id="description"
                  className="glass-card border-orange-200 focus:border-orange-400 mt-2"
                  placeholder="Event details and agenda..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="startDate" className="text-base font-semibold">Start Date & Time *</Label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    className="glass-card border-orange-200 focus:border-orange-400 mt-2"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate" className="text-base font-semibold">End Date & Time *</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    className="glass-card border-orange-200 focus:border-orange-400 mt-2"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Venue & Organizer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="venue" className="text-base font-semibold">Venue *</Label>
                  <Input
                    id="venue"
                    className="glass-card border-orange-200 focus:border-orange-400 mt-2"
                    placeholder="e.g., Main Auditorium"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="organizer" className="text-base font-semibold">Organizer *</Label>
                  <Input
                    id="organizer"
                    className="glass-card border-orange-200 focus:border-orange-400 mt-2"
                    placeholder="e.g., MERN Academy"
                    value={formData.organizer}
                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Event Type & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-semibold">Event Type *</Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value: any) => setFormData({ ...formData, eventType: value })}
                  >
                    <SelectTrigger className="glass-card border-orange-200 mt-2">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="seminar">Seminar</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-base font-semibold">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: any) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="glass-card border-orange-200 mt-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Seminar">Seminar</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Registration Link & Max Participants */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="registrationLink" className="text-base font-semibold">Registration Link</Label>
                  <Input
                    id="registrationLink"
                    type="url"
                    className="glass-card border-orange-200 focus:border-orange-400 mt-2"
                    placeholder="https://..."
                    value={formData.registrationLink}
                    onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="maxParticipants" className="text-base font-semibold">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    min="0"
                    className="glass-card border-orange-200 focus:border-orange-400 mt-2"
                    placeholder="e.g., 100"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                  />
                </div>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-3 p-4 glass-card rounded-lg">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-5 h-5 rounded border-orange-300 text-orange-600 focus:ring-orange-500"
                />
                <Label htmlFor="isFeatured" className="cursor-pointer text-base font-semibold">
                  Mark as Featured Event
                </Label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex-1 hover:from-emerald-600 hover:to-teal-600 text-base py-6"
                  disabled={isCreating}
                >
                  <Save className="mr-2 h-5 w-5" />
                  {isCreating ? 'Creating Event...' : 'Create Event'}
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

export default AddEvent;
