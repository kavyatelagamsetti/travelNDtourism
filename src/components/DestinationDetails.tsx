import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Users, Camera, Mountain, TreePine, Waves, Building2 } from "lucide-react";

interface DestinationDetailsProps {
  destination: {
    id: number;
    name: string;
    description: string;
    cultural: string;
    rating: number;
    reviews: number;
    duration: string;
    bestFor: string;
    highlights: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onBookPackage: () => void;
}

const DestinationDetails = ({ destination, isOpen, onClose, onBookPackage }: DestinationDetailsProps) => {
  if (!destination) return null;

  const getIcon = (cultural: string) => {
    if (cultural.includes('Alpine') || cultural.includes('Snow')) return Mountain;
    if (cultural.includes('Natural') || cultural.includes('Valley')) return TreePine;
    if (cultural.includes('Lake') || cultural.includes('Water')) return Waves;
    if (cultural.includes('Temple') || cultural.includes('Heritage')) return Building2;
    return Mountain;
  };

  const IconComponent = getIcon(destination.cultural);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <IconComponent className="h-8 w-8 text-primary" />
            {destination.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Section */}
          <div className="relative h-64 bg-gradient-lake rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/20 flex items-end p-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">{destination.name}</h2>
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

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold mb-3">About This Destination</h3>
            <p className="text-muted-foreground leading-relaxed">{destination.description}</p>
          </div>

          {/* Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">{destination.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Best For</p>
                <p className="text-sm text-muted-foreground">{destination.bestFor}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Camera className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Reviews</p>
                <p className="text-sm text-muted-foreground">{destination.reviews} reviews</p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Top Highlights</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {destination.highlights.map((highlight, index) => (
                <Badge key={index} variant="secondary" className="justify-center py-2">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gradient-lake/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">What to Expect</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• Authentic Kashmiri hospitality and local culture</p>
              <p>• Professional guides with deep knowledge of the region</p>
              <p>• Comfortable accommodations with traditional architecture</p>
              <p>• Flexible itineraries that can be customized to your preferences</p>
              <p>• All transportation and meals included in packages</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <Button
              onClick={onBookPackage}
              className="flex-1 bg-gradient-hero shadow-glow"
              size="lg"
            >
              Book Package
            </Button>
            <Button variant="outline" onClick={onClose} size="lg">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DestinationDetails;