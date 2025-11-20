import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Bike, Bus, MapPin, Clock, Users, IndianRupee, Star, Zap, Shield, Headphones } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Rides = () => {
  const { toast } = useToast();
  const [selectedRide, setSelectedRide] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupLocation: '',
    destination: '',
    pickupDate: '',
    pickupTime: '',
    passengers: '1',
    tripType: 'oneway',
    specialRequests: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTotalAmount = (ride: { basePrice: number; perKm: boolean }) => {
    const basePrice = ride.basePrice;
    if (ride.perKm) {
      return basePrice * 10; // Assuming 10km minimum
    }
    return basePrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRide) return;

    if (!formData.pickupDate || !formData.pickupTime) {
      toast({
        title: "Error",
        description: "Please select pickup date and time.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate booking process
    setTimeout(() => {
      toast({
        title: "Ride Booked Successfully!",
        description: "Your ride has been booked and confirmed.",
      });
      // Reset form and close dialog
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        pickupLocation: '',
        destination: '',
        pickupDate: '',
        pickupTime: '',
        passengers: '1',
        tripType: 'oneway',
        specialRequests: ''
      });
      setSelectedRide(null);
      setIsDialogOpen(false);
      setIsSubmitting(false);
    }, 1000);
  };

  const rideTypes = [
    {
      id: 1,
      name: "Premium Sedan",
      icon: Car,
      description: "Comfortable sedans perfect for city tours and short distances",
      basePrice: 12,
      perKm: true,
      capacity: "4 passengers",
      features: ["AC", "GPS", "Music System", "Water Bottles"],
      popular: false,
      rating: 4.6,
      availability: "24/7"
    },
    {
      id: 2,
      name: "SUV/Innova",
      icon: Car,
      description: "Spacious SUVs ideal for families and group travel with luggage",
      basePrice: 18,
      perKm: true,
      capacity: "6-7 passengers",
      features: ["AC", "GPS", "Extra Luggage Space", "First Aid Kit"],
      popular: true,
      rating: 4.8,
      availability: "24/7"
    },
    {
      id: 3,
      name: "Tempo Traveller",
      icon: Bus,
      description: "Perfect for larger groups and family outings",
      basePrice: 25,
      perKm: true,
      capacity: "12-14 passengers",
      features: ["AC", "Comfortable Seating", "Music System", "Charging Points"],
      popular: false,
      rating: 4.5,
      availability: "6 AM - 10 PM"
    },
    {
      id: 4,
      name: "Royal Enfield",
      icon: Bike,
      description: "Adventure bikes for solo explorers and thrill seekers",
      basePrice: 1200,
      perKm: false,
      capacity: "1-2 riders",
      features: ["Helmet Included", "Full Insurance", "24/7 Support", "GPS Mount"],
      popular: true,
      rating: 4.9,
      availability: "6 AM - 8 PM"
    },
    {
      id: 5,
      name: "Luxury Car",
      icon: Car,
      description: "Premium vehicles for special occasions and VIP travel",
      basePrice: 35,
      perKm: true,
      capacity: "4 passengers",
      features: ["Leather Seats", "Premium Sound", "Chauffeur", "Refreshments"],
      popular: false,
      rating: 4.9,
      availability: "24/7"
    },
    {
      id: 6,
      name: "Local Taxi",
      icon: Car,
      description: "Budget-friendly option for everyday commuting",
      basePrice: 8,
      perKm: true,
      capacity: "4 passengers",
      features: ["Basic AC", "Local Driver", "Budget Friendly", "City Knowledge"],
      popular: false,
      rating: 4.3,
      availability: "24/7"
    }
  ];

  const popularRoutes = [
    { from: "Srinagar Airport", to: "Dal Lake", distance: "12 km", time: "25 min", price: 450 },
    { from: "Srinagar", to: "Gulmarg", distance: "50 km", time: "1.5 hrs", price: 1200 },
    { from: "Srinagar", to: "Pahalgam", distance: "95 km", time: "2.5 hrs", price: 2200 },
    { from: "Srinagar", to: "Sonamarg", distance: "80 km", time: "2 hrs", price: 1800 },
    { from: "Jammu", to: "Srinagar", distance: "270 km", time: "6 hrs", price: 4500 },
    { from: "Leh Airport", to: "Leh City", distance: "8 km", time: "20 min", price: 350 }
  ];

  const BookingForm = ({ rideData }) => (
    <form key={`booking-form-${selectedRide?.id}`} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            key={`fullName-${selectedRide?.id}`}
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            key={`email-${selectedRide?.id}`}
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            key={`phone-${selectedRide?.id}`}
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <Label htmlFor="pickupLocation">Pickup Location *</Label>
          <Input
            key={`pickupLocation-${selectedRide?.id}`}
            id="pickupLocation"
            value={formData.pickupLocation}
            onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
            placeholder="Enter pickup address"
            required
          />
        </div>
        <div>
          <Label htmlFor="destination">Destination *</Label>
          <Input
            key={`destination-${selectedRide?.id}`}
            id="destination"
            value={formData.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
            placeholder="Enter destination address"
            required
          />
        </div>
        <div>
          <Label htmlFor="pickupDate">Pickup Date *</Label>
          <Input
            key={`pickupDate-${selectedRide?.id}`}
            id="pickupDate"
            type="date"
            value={formData.pickupDate}
            onChange={(e) => handleInputChange('pickupDate', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="pickupTime">Pickup Time *</Label>
          <Input
            key={`pickupTime-${selectedRide?.id}`}
            id="pickupTime"
            type="time"
            value={formData.pickupTime}
            onChange={(e) => handleInputChange('pickupTime', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="passengers">Number of Passengers *</Label>
          <Select key={`passengers-${selectedRide?.id}`} value={formData.passengers} onValueChange={(value) => handleInputChange('passengers', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select passengers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Passenger</SelectItem>
              <SelectItem value="2">2 Passengers</SelectItem>
              <SelectItem value="3">3 Passengers</SelectItem>
              <SelectItem value="4">4 Passengers</SelectItem>
              <SelectItem value="5">5+ Passengers</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="tripType">Trip Type</Label>
          <Select key={`tripType-${selectedRide?.id}`} value={formData.tripType} onValueChange={(value) => handleInputChange('tripType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select trip type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oneway">One Way</SelectItem>
              <SelectItem value="roundtrip">Round Trip</SelectItem>
              <SelectItem value="hourly">Hourly Rental</SelectItem>
              <SelectItem value="daily">Full Day</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
        <Input
          key={`specialRequests-${selectedRide?.id}`}
          id="specialRequests"
          value={formData.specialRequests}
          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
          placeholder="Any special requirements..."
        />
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Ride Summary:</h4>
        <p className="text-sm text-muted-foreground mb-2">{rideData?.name} - {rideData?.capacity}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm">Estimated Price:</span>
          <span className="text-xl font-bold text-primary">
            ₹{calculateTotalAmount(rideData).toLocaleString()}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          * Final price may vary based on actual distance and duration
        </p>
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <Button
          type="submit"
          className="flex-1 bg-gradient-hero shadow-glow"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Booking..." : "Book Ride Now"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => setIsDialogOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-mountain">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Kashmir Rides & 
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Transportation
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Safe, comfortable, and reliable transportation across Kashmir. 
            From airport transfers to adventure rides, we've got you covered.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Fully Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-primary" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Instant Booking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Routes
            </h2>
            <p className="text-xl text-muted-foreground">
              Pre-calculated fares for common destinations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route, index) => (
              <Card key={index} className="hover:shadow-card transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium">{route.from}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                        </div>
                        <span className="text-sm">{route.to}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">₹{route.price}</div>
                      <div className="text-xs text-muted-foreground">Starting from</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{route.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{route.time}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline" size="sm">
                    Book This Route
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Ride
            </h2>
            <p className="text-xl text-muted-foreground">
              From budget-friendly to luxury, find the perfect vehicle for your journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rideTypes.map((ride) => (
              <Card key={ride.id} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
                {ride.popular && (
                  <Badge className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground">
                    Popular
                  </Badge>
                )}
                
                <div className="relative h-32 bg-gradient-lake flex items-center justify-center">
                  <ride.icon className="h-16 w-16 text-white" />
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{ride.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      <span>{ride.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {ride.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Pricing */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        ₹{ride.basePrice}{ride.perKm ? "/km" : "/day"}
                      </div>
                      <div className="text-sm text-muted-foreground">{ride.capacity}</div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>Available:</div>
                      <div>{ride.availability}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {ride.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          className="flex-1 bg-gradient-hero shadow-glow"
                          size="sm"
                          onClick={() => {
                            setSelectedRide(ride);
                            setIsDialogOpen(true);
                          }}
                        >
                          <IndianRupee className="h-4 w-4 mr-1" />
                          Book Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Book {selectedRide?.name}</DialogTitle>
                          <DialogDescription>
                            Fill in your travel details to book this vehicle.
                          </DialogDescription>
                        </DialogHeader>
                        <BookingForm rideData={selectedRide} />
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      Get Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Contact us for special group bookings, airport transfers, or multi-day packages
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              <Headphones className="h-5 w-5 mr-2" />
              Call Support
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8">
              WhatsApp Booking
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rides;