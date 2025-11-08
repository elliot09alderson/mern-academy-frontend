import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  Star,
  Quote,
  Edit
} from 'lucide-react';
import { useGetTestimonialsQuery, useDeleteTestimonialMutation, useToggleTestimonialStatusMutation } from '@/store/api/testimonialApi';
import { useToast } from '@/hooks/use-toast';

const Testimonials = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // API hooks
  const { data: testimonialsData, isLoading } = useGetTestimonialsQuery({});
  const [deleteTestimonial] = useDeleteTestimonialMutation();
  const [toggleStatus] = useToggleTestimonialStatusMutation();

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      await deleteTestimonial(id).unwrap();
      toast({
        title: "Success!",
        description: "Testimonial deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to delete testimonial",
        variant: "destructive",
      });
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatus(id).unwrap();
      toast({
        title: "Success!",
        description: "Testimonial status updated successfully",
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
            Testimonials
          </h1>
          <p className="text-muted-foreground mt-2">Manage student testimonials</p>
        </div>
        <Button
          onClick={() => navigate('/admin/add-testimonial')}
          className="bg-gradient-to-r from-violet-600 to-purple-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      {/* Testimonials List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
        </div>
      ) : testimonialsData && testimonialsData.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.data.map((testimonial) => (
            <Card key={testimonial._id} className="glass-card border-0 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={testimonial.isActive ? "default" : "secondary"} className="mb-2">
                    {testimonial.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Order: {testimonial.order}
                  </Badge>
                </div>

                {/* Student Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-violet-500/20">
                    <img
                      src={testimonial.image.url}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Title */}
                <h4 className="font-semibold text-sm mb-2">{testimonial.title}</h4>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {testimonial.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/edit-testimonial/${testimonial._id}`)}
                    className="flex-1"
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(testimonial._id)}
                  >
                    {testimonial.isActive ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(testimonial._id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="glass-card border-0">
          <CardContent className="py-20">
            <div className="text-center">
              <Quote className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Testimonials Yet</h3>
              <p className="text-muted-foreground mb-6">
                Start by adding your first student testimonial
              </p>
              <Button
                onClick={() => navigate('/admin/add-testimonial')}
                className="bg-gradient-to-r from-violet-600 to-purple-600 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Testimonial
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Testimonials;
