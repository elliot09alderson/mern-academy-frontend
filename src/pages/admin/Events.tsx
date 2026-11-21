import React, { useState } from 'react';
import { useGetEventsQuery, useCreateEventMutation, useUpdateEventMutation, useDeleteEventMutation, useUploadEventImageMutation } from '../../store/api/eventApi';
import { Plus, Edit2, Trash2, Search, Calendar, Upload, Image as ImageIcon, X } from 'lucide-react';

interface EventFormData {
  eventName: string;
  description: string;
  eventType: 'academic' | 'cultural' | 'sports' | 'technical' | 'workshop' | 'seminar' | 'other';
  startDate: string;
  endDate: string;
  venue: string;
  organizer: string;
  registrationLink?: string;
  maxParticipants?: number;
  isFeatured?: boolean;
}

const Events: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);

  const { data: eventsData, isLoading } = useGetEventsQuery({
    page,
    limit: 10,
    eventType: selectedType || undefined
  });

  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const [uploadEventImage] = useUploadEventImageMutation();

  const [formData, setFormData] = useState<EventFormData>({
    eventName: '',
    description: '',
    eventType: 'academic',
    startDate: '',
    endDate: '',
    venue: '',
    organizer: '',
    registrationLink: '',
    maxParticipants: undefined,
    isFeatured: false
  });

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const eventTypes = [
    'academic', 'cultural', 'sports', 'technical', 'workshop', 'seminar', 'other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let eventResult;
      if (editingEvent) {
        eventResult = await updateEvent({ id: editingEvent._id, updates: formData }).unwrap();
      } else {
        eventResult = await createEvent(formData).unwrap();
      }

      // Upload images if any
      if (selectedFiles) {
        const eventId = editingEvent?._id || eventResult.data._id;
        for (let i = 0; i < selectedFiles.length; i++) {
          const formDataImg = new FormData();
          formDataImg.append('image', selectedFiles[i]);
          await uploadEventImage({ eventId, formData: formDataImg }).unwrap();
        }
      }

      handleCloseModal();
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setFormData({
      eventName: event.eventName,
      description: event.description,
      eventType: event.eventType,
      startDate: new Date(event.startDate).toISOString().slice(0, 16),
      endDate: new Date(event.endDate).toISOString().slice(0, 16),
      venue: event.venue,
      organizer: event.organizer,
      registrationLink: event.registrationLink || '',
      maxParticipants: event.maxParticipants || undefined,
      isFeatured: event.isFeatured || false
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(eventId).unwrap();
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setSelectedFiles(null);
    setFormData({
      eventName: '',
      description: '',
      eventType: 'academic',
      startDate: '',
      endDate: '',
      venue: '',
      organizer: '',
      registrationLink: '',
      maxParticipants: undefined,
      isFeatured: false
    });
  };

  const filteredEvents = eventsData?.data?.filter(event =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Events Management
          </h1>
          <p className="text-muted-foreground">Manage academy events and activities</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search events by name, organizer, or venue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Event Types</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          <div className="text-sm text-muted-foreground flex items-center">
            Total: {eventsData?.pagination?.total || 0} events
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-card rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Event Image */}
            <div className="h-48 bg-gray-200 relative">
              {event.images && event.images.length > 0 ? (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${
                    event.images[0].url
                  }`}
                  alt={event.eventName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="p-2 bg-card rounded-full shadow-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="p-2 bg-card rounded-full shadow-sm text-muted-foreground hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {event.isFeatured && (
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* Event Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                  {event.eventName}
                </h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${ event.eventType === "academic" ? "bg-primary/10 text-primary" : event.eventType === "cultural" ? "bg-primary/10 text-primary" : event.eventType === "sports" ? "bg-green-100 text-green-800" : event.eventType === "technical" ? "bg-primary/10 text-primary" : "bg-secondary text-foreground" }`}
                >
                  {event.eventType}
                </span>
              </div>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {event.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Organizer:</span>
                  <span className="font-medium">{event.organizer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Venue:</span>
                  <span className="font-medium">{event.venue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="font-medium">
                    {new Date(event.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">End Date:</span>
                  <span className="font-medium">
                    {new Date(event.endDate).toLocaleDateString()}
                  </span>
                </div>
                {event.maxParticipants && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span className="font-medium">
                      {event.registeredParticipants?.length || 0} /{" "}
                      {event.maxParticipants}
                    </span>
                  </div>
                )}
              </div>

              {event.images && event.images.length > 1 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ImageIcon className="w-4 h-4 mr-1" />
                    {event.images.length} photos
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {eventsData?.pagination && eventsData.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between bg-card rounded-lg shadow-sm border p-4">
          <div className="text-sm text-foreground">
            Showing {(page - 1) * 10 + 1} to{" "}
            {Math.min(page * 10, eventsData.pagination.total)} of{" "}
            {eventsData.pagination.total} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border border-border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm">
              Page {page} of {eventsData.pagination.totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === eventsData.pagination.totalPages}
              className="px-3 py-1 border border-border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-foreground">
                {editingEvent ? "Edit Event" : "Add New Event"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 text-muted-foreground hover:text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.eventName}
                    onChange={(e) =>
                      setFormData({ ...formData, eventName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Event Type *
                  </label>
                  <select
                    required
                    value={formData.eventType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        eventType: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Start Date *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    End Date *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Venue *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData({ ...formData, venue: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Organizer *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organizer}
                    onChange={(e) =>
                      setFormData({ ...formData, organizer: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Registration Link
                  </label>
                  <input
                    type="url"
                    value={formData.registrationLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationLink: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Max Participants
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.maxParticipants || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxParticipants: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Event Images
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <label htmlFor="images" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-foreground">
                          Upload event images
                        </span>
                        <input
                          id="images"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => setSelectedFiles(e.target.files)}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      PNG, JPG, GIF up to 5MB each
                    </p>
                  </div>
                </div>
                {selectedFiles && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    {selectedFiles.length} file(s) selected
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 block text-sm text-foreground"
                >
                  Mark as featured event
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-background transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors"
                >
                  {editingEvent ? "Update Event" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;