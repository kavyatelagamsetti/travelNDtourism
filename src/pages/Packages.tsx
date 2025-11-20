import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, Users, Clock, Star, IndianRupee, Wifi, Car, Camera, Mountain, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_ENDPOINTS } from "@/lib/api";

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [myBookings, setMyBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

  // Fetch user's bookings on component mount
  useEffect(() => {
    if (isLoggedIn) {
      fetchMyBookings();
    }
  }, [isLoggedIn]);

  const fetchMyBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.BOOKING.MY_BOOKINGS, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMyBookings(data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const packages = [
    {
      id: 1,
      name: "Kashmir Valley Explorer",
      duration: "5 Days / 4 Nights",
      price: 25999,
      originalPrice: 32999,
      rating: 4.8,
      reviews: 124,
      image: "bg-gradient-lake",
      destinations: ["Srinagar", "Gulmarg", "Pahalgam"],
      highlights: ["Dal Lake Shikara Ride", "Gondola Cable Car", "Mughal Gardens", "Local Cuisine"],
      includes: ["Accommodation", "Meals", "Transportation", "Guide"],
      groupSize: "2-6 People",
      difficulty: "Easy",
      bestTime: "Mar-Oct"
    },
    {
      id: 2,
      name: "Adventure Kashmir",
      duration: "7 Days / 6 Nights", 
      price: 45999,
      originalPrice: 55999,
      rating: 4.9,
      reviews: 89,
      image: "bg-gradient-mountain",
      destinations: ["Srinagar", "Gulmarg", "Sonamarg", "Pahalgam"],
      highlights: ["Skiing in Gulmarg", "Trekking to Thajiwas", "River Rafting", "Camping"],
      includes: ["Accommodation", "All Meals", "Adventure Gear", "Expert Guide"],
      groupSize: "4-8 People",
      difficulty: "Moderate",
      bestTime: "May-Sep"
    },
    {
      id: 3,
      name: "Spiritual Kashmir",
      duration: "4 Days / 3 Nights",
      price: 18999,
      originalPrice: 24999,
      rating: 4.7,
      reviews: 67,
      image: "bg-gradient-sunset",
      destinations: ["Jammu", "Srinagar", "Gulmarg"],
      highlights: ["Vaishno Devi Darshan", "Hazratbal Shrine", "Shankaracharya Temple", "Spiritual Guidance"],
      includes: ["Accommodation", "Meals", "Temple Visits", "Spiritual Guide"],
      groupSize: "2-10 People",
      difficulty: "Easy",
      bestTime: "Year Round"
    },
    {
      id: 4,
      name: "Leh Ladakh Expedition",
      duration: "8 Days / 7 Nights",
      price: 65999,
      originalPrice: 79999,
      rating: 4.9,
      reviews: 156,
      image: "bg-gradient-hero",
      destinations: ["Leh", "Nubra Valley", "Pangong Lake", "Tso Moriri"],
      highlights: ["Magnetic Hill", "Camel Safari", "Monastery Visits", "High Altitude Lakes"],
      includes: ["Accommodation", "Meals", "Permits", "Oxygen Support"],
      groupSize: "4-6 People",
      difficulty: "Challenging",
      bestTime: "Jun-Sep"
    },
    {
      id: 5,
      name: "Honeymoon Special",
      duration: "6 Days / 5 Nights",
      price: 39999,
      originalPrice: 49999,
      rating: 4.8,
      reviews: 201,
      image: "bg-gradient-lake",
      destinations: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg"],
      highlights: ["Romantic Houseboat Stay", "Candlelight Dinner", "Couple Photography", "Private Shikara"],
      includes: ["Luxury Accommodation", "All Meals", "Private Transport", "Couple Activities"],
      groupSize: "2 People",
      difficulty: "Easy",
      bestTime: "Mar-Nov"
    },
    {
      id: 6,
      name: "Family Fun Kashmir",
      duration: "5 Days / 4 Nights",
      price: 22999,
      originalPrice: 29999,
      rating: 4.6,
      reviews: 93,
      image: "bg-gradient-mountain",
      destinations: ["Srinagar", "Gulmarg", "Pahalgam"],
      highlights: ["Kid-Friendly Activities", "Pony Rides", "Garden Visits", "Cultural Shows"],
      includes: ["Family Accommodation", "Meals", "Child Care", "Entertainment"],
      groupSize: "3-8 People",
      difficulty: "Easy",
      bestTime: "Apr-Oct"
    }
  ];

  const BookingForm = ({ packageData }) => {
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phone: '',
      travelers: '1',
      startDate: '',
      endDate: '',
      specialRequests: ''
    });

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [id]: value
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!isLoggedIn) {
        toast({
          title: "Login Required",
          description: "Please login to book a package",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_ENDPOINTS.BOOKING.CREATE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            packageName: packageData.name,
            packageId: packageData.id,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            travelers: formData.travelers,
            startDate: formData.startDate,
            endDate: formData.endDate,
            specialRequests: formData.specialRequests,
            totalAmount: packageData.price
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast({
            title: "Booking Request Submitted",
            description: "Your booking request has been sent to the admin for approval",
          });
          fetchMyBookings(); // Refresh bookings
          setSelectedPackage(null); // Close dialog
        } else {
          toast({
            title: "Error",
            description: data.message || "Failed to submit booking request",
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
        setIsLoading(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="travelers">Number of Travelers *</Label>
            <Input
              id="travelers"
              type="number"
              min="1"
              placeholder="2"
              value={formData.travelers}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="startDate">Preferred Start Date *</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate">Preferred End Date *</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="specialRequests">Special Requirements</Label>
          <Textarea
            id="specialRequests"
            placeholder="Any special dietary requirements, accessibility needs, or preferences..."
            rows={3}
            value={formData.specialRequests}
            onChange={handleInputChange}
          />
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Package Summary:</h4>
          <p className="text-sm text-muted-foreground mb-2">{packageData?.name} - {packageData?.duration}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm">Total Price:</span>
            <span className="text-xl font-bold text-primary">₹{packageData?.price?.toLocaleString()}</span>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-hero shadow-glow"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Booking Request"}
        </Button>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Kashmir Tour Packages
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Carefully crafted packages to help you experience the best of Kashmir. 
            From adventure to spirituality, find your perfect journey.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>4.8+ Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>5000+ Happy Travelers</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span>Expert Local Guides</span>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className={`relative h-48 ${pkg.image} overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-accent text-accent-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        {pkg.rating}
                      </Badge>
                      <div className="text-right text-white">
                        <div className="text-sm opacity-80 line-through">₹{pkg.originalPrice.toLocaleString()}</div>
                        <div className="text-xl font-bold">₹{pkg.price.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                      <div className="flex items-center gap-4 text-sm opacity-90">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{pkg.groupSize}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                    <Badge variant="secondary">{pkg.difficulty}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{pkg.destinations.length} Cities</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{pkg.bestTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{pkg.reviews} reviews</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Destinations */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Destinations:</h4>
                    <div className="flex flex-wrap gap-1">
                      {pkg.destinations.map((dest, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {dest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Highlights:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {pkg.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Includes */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Package Includes:</h4>
                    <div className="flex flex-wrap gap-1">
                      {pkg.includes.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="flex-1 bg-gradient-hero shadow-glow" 
                          size="sm"
                          onClick={() => setSelectedPackage(pkg)}
                        >
                          <IndianRupee className="h-4 w-4 mr-1" />
                          Book Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Book {pkg.name}</DialogTitle>
                          <DialogDescription>
                            Fill in your details below to book this amazing Kashmir experience.
                          </DialogDescription>
                        </DialogHeader>
                        <BookingForm packageData={pkg} />
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* My Packages Section */}
      {isLoggedIn && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                My Packages
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Track your booking requests and confirmed trips
              </p>
            </div>

            {myBookings.length === 0 ? (
              <div className="text-center py-12">
                <Mountain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No bookings yet</h3>
                <p className="text-muted-foreground">Book your first Kashmir adventure above!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myBookings.map((booking) => (
                  <Card key={booking.id} className="hover:shadow-elegant transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{booking.packageName}</CardTitle>
                        <Badge
                          className={
                            booking.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {booking.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {booking.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                          {booking.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription>
                        Booked on {new Date(booking.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{booking.travelers} travelers</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm font-medium">Total Amount:</span>
                        <span className="text-lg font-bold text-primary">₹{booking.totalAmount.toLocaleString()}</span>
                      </div>
                      {booking.status === 'approved' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                          <p className="text-sm text-green-800 font-medium">🎉 Trip Confirmed!</p>
                          <p className="text-xs text-green-700 mt-1">
                            Your booking has been approved. Get ready for an amazing Kashmir experience!
                          </p>
                        </div>
                      )}
                      {booking.status === 'rejected' && booking.rejectionReason && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
                          <p className="text-sm text-red-800 font-medium">Booking Rejected</p>
                          <p className="text-xs text-red-700 mt-1">
                            Reason: {booking.rejectionReason}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Packages?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We ensure every detail is perfect for your Kashmir adventure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Mountain, title: "Local Expertise", desc: "Native guides with deep local knowledge" },
              { icon: Car, title: "Comfortable Transport", desc: "Premium vehicles for all terrains" },
              { icon: Wifi, title: "24/7 Support", desc: "Round-the-clock assistance during your trip" },
              { icon: Camera, title: "Memory Making", desc: "Professional photography services included" }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-hero p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;