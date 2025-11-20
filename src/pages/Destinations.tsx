import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Users, Camera } from "lucide-react";
import destinationsImage from "@/assets/destinations-collage.jpg";
import DestinationDetails from "@/components/DestinationDetails";
import BookingForm from "@/components/BookingForm";

const Destinations = () => {
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const destinations = [
    {
      id: 1,
      name: "Srinagar - The Lake City",
      description: "Famous for Dal Lake, houseboats, and Mughal gardens. Experience the floating markets and traditional shikaras.",
      cultural: "Mughal Heritage & Kashmiri Culture",
      rating: 4.8,
      reviews: 324,
      duration: "2-3 days",
      bestFor: "Couples & Families",
      highlights: ["Dal Lake", "Shalimar Bagh", "Hazratbal Shrine", "Floating Market"]
    },
    {
      id: 2,
      name: "Gulmarg - Meadow of Flowers",
      description: "World-class skiing destination and Asia's highest 18-hole golf course. Perfect for adventure enthusiasts.",
      cultural: "Alpine Adventure & Snow Sports",
      rating: 4.9,
      reviews: 256,
      duration: "1-2 days",  
      bestFor: "Adventure Seekers",
      highlights: ["Gondola Ride", "Skiing", "Golf Course", "Apharwat Peak"]
    },
    {
      id: 3,
      name: "Pahalgam - Valley of Shepherds",
      description: "Pristine valleys, crystal-clear streams, and base camp for Amarnath Yatra. Nature's paradise.",
      cultural: "Spiritual Journey & Natural Beauty",
      rating: 4.7,
      reviews: 189,
      duration: "2-3 days",
      bestFor: "Nature Lovers",
      highlights: ["Betaab Valley", "Aru Valley", "Chandanwari", "Lidder River"]
    },
    {
      id: 4,
      name: "Sonamarg - Meadow of Gold",
      description: "Gateway to Ladakh with stunning alpine scenery and glacier views. Perfect for trekking and camping.",
      cultural: "Alpine Meadows & Glacier Views",
      rating: 4.6,
      reviews: 145,
      duration: "1-2 days",
      bestFor: "Trekkers",
      highlights: ["Thajiwas Glacier", "Zoji La Pass", "Krishnasar Lake", "Camping"]
    },
    {
      id: 5,
      name: "Leh-Ladakh - Land of High Passes",
      description: "Buddhist monasteries, high-altitude lakes, and dramatic landscapes. An adventurer's dream destination.",
      cultural: "Buddhist Heritage & High Altitude Desert",
      rating: 4.9,
      reviews: 412,
      duration: "5-7 days",
      bestFor: "Adventure Enthusiasts",
      highlights: ["Pangong Lake", "Nubra Valley", "Monasteries", "Magnetic Hill"]
    },
    {
      id: 6,
      name: "Jammu - City of Temples",
      description: "Religious heritage with ancient temples and rich cultural traditions. The winter capital of J&K.",
      cultural: "Hindu Temples & Cultural Heritage",
      rating: 4.4,
      reviews: 98,
      duration: "1-2 days",
      bestFor: "Pilgrims & Culture Enthusiasts",
      highlights: ["Vaishno Devi", "Raghunath Temple", "Bahu Fort", "Amar Mahal"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-mountain overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={destinationsImage}
            alt="Kashmir destinations collage"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Discover Kashmir's
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Hidden Gems
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From serene lakes to snow-capped peaks, explore the most breathtaking destinations 
            that make Kashmir truly paradise on earth.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Card key={destination.id} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="relative h-48 bg-gradient-lake overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/20 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                      <div className="flex items-center gap-2 text-sm opacity-90">
                        <MapPin className="h-4 w-4" />
                        <span>{destination.cultural}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    {destination.rating}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{destination.name.split(' - ')[1] || destination.name}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {destination.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{destination.bestFor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Camera className="h-4 w-4" />
                      <span>{destination.reviews} reviews</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Top Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {destination.highlights.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{destination.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      className="flex-1 bg-gradient-hero shadow-glow"
                      size="sm"
                      onClick={() => {
                        setSelectedDestination(destination);
                        setShowDetails(true);
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedDestination(destination);
                        setShowBooking(true);
                      }}
                    >
                      Book Package
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-lake text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore Kashmir?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Let us help you plan the perfect Kashmir experience with customized packages 
            and local expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              View All Packages
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8">
              Plan Custom Trip
            </Button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <DestinationDetails
        destination={selectedDestination}
        isOpen={showDetails}
        onClose={() => {
          setShowDetails(false);
          setSelectedDestination(null);
        }}
        onBookPackage={() => {
          setShowDetails(false);
          setShowBooking(true);
        }}
      />

      <BookingForm
        destination={selectedDestination}
        isOpen={showBooking}
        onClose={() => {
          setShowBooking(false);
          setSelectedDestination(null);
        }}
      />
    </div>
  );
};

export default Destinations;