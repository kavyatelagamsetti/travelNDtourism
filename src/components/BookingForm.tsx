import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Users, Phone, Mail, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { API_ENDPOINTS } from "@/lib/api";

interface BookingFormProps {
  destination: {
    id: number;
    name: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingForm = ({ destination, isOpen, onClose }: BookingFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelers: '1',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    specialRequests: ''
  });

  const handleInputChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTotalAmount = () => {
    const travelers = parseInt(formData.travelers);
    const basePrice = 5000; // Base price per person
    return travelers * basePrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.startDate || !formData.endDate) {
      toast({
        title: "Error",
        description: "Please select both start and end dates.",
        variant: "destructive",
      });
      return;
    }

    if (formData.startDate >= formData.endDate) {
      toast({
        title: "Error",
        description: "End date must be after start date.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: "Error",
          description: "Please login to book a package.",
          variant: "destructive",
        });
        onClose();
        return;
      }

      const bookingData = {
        packageName: destination?.name || '',
        packageId: destination?.id || 0,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        travelers: parseInt(formData.travelers),
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
        specialRequests: formData.specialRequests,
        totalAmount: calculateTotalAmount()
      };

      const response = await fetch(API_ENDPOINTS.BOOKING.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Booking Submitted!",
          description: "Your booking request has been submitted and is pending admin approval.",
        });
        onClose();
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          travelers: '1',
          startDate: undefined,
          endDate: undefined,
          specialRequests: ''
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to submit booking.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book Package: {destination?.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="travelers">Number of Travelers *</Label>
                <Select value={formData.travelers} onValueChange={(value) => handleInputChange('travelers', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select travelers" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Traveler' : 'Travelers'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Travel Dates */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Travel Dates</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(formData.startDate, "PPP") : "Pick start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => handleInputChange('startDate', date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? format(formData.endDate, "PPP") : "Pick end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => handleInputChange('endDate', date)}
                      disabled={(date) => date < (formData.startDate || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Textarea
              id="specialRequests"
              placeholder="Any special requirements or preferences..."
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              rows={3}
            />
          </div>

          {/* Price Summary */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Price Summary</h3>
            <div className="flex justify-between items-center">
              <span>Total Amount:</span>
              <span className="text-2xl font-bold text-primary">₹{calculateTotalAmount().toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              * Price per person: ₹5,000 | Includes accommodation, meals, and transportation
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4 border-t">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-hero shadow-glow"
              size="lg"
            >
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} size="lg">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;