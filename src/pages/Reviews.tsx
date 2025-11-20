import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, User, Calendar, MapPin, Camera, ThumbsUp, MessageCircle } from "lucide-react";

const Reviews = () => {
  const [filter, setFilter] = useState("all");

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      date: "March 2024",
      package: "Kashmir Valley Explorer",
      review: "Absolutely magical experience! The houseboats in Dal Lake were stunning, and our guide Rashid was incredibly knowledgeable about Kashmir's history. The Mughal gardens were breathtaking, and the shikara ride at sunset was unforgettable. Every detail was perfectly planned.",
      images: 3,
      helpful: 24,
      verified: true
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      date: "February 2024",
      package: "Adventure Kashmir",
      review: "What an adventure! Skiing in Gulmarg was world-class, and the trek to Thajiwas Glacier was challenging but rewarding. The team was professional and safety-conscious. The accommodation was comfortable even in the mountains. Highly recommend for adventure seekers!",
      images: 8,
      helpful: 31,
      verified: true
    },
    {
      id: 3,
      name: "Anjali Patel",
      location: "Ahmedabad",
      rating: 4,
      date: "January 2024",
      package: "Honeymoon Special",
      review: "Perfect honeymoon destination! The romantic houseboat stay was exactly what we dreamed of. The candlelight dinner by Dal Lake was so special. Only minor issue was some weather delays, but the team handled it well. Kashmir's beauty is unmatched!",
      images: 12,
      helpful: 18,
      verified: true
    },
    {
      id: 4,
      name: "Vikram Singh",
      location: "Bangalore",
      rating: 5,
      date: "December 2023",
      package: "Leh Ladakh Expedition",
      review: "Mind-blowing experience! Pangong Lake's colors were surreal, and the monasteries were spiritually enriching. The high-altitude challenges were well-managed by the team. Oxygen support was readily available. This trip changed my perspective on life!",
      images: 15,
      helpful: 42,
      verified: true
    },
    {
      id: 5,
      name: "Sunita Reddy",
      location: "Hyderabad",
      rating: 4,
      date: "November 2023",
      package: "Family Fun Kashmir",
      review: "Great family trip! Kids loved the pony rides in Pahalgam and the garden visits in Srinagar. The cultural shows were educational and entertaining. Food was excellent throughout. Only wish we had more time to explore each place.",
      images: 6,
      helpful: 15,
      verified: true
    },
    {
      id: 6,
      name: "Amit Joshi",
      location: "Pune",
      rating: 5,
      date: "October 2023",
      package: "Spiritual Kashmir",
      review: "Deeply moving spiritual journey. Vaishno Devi darshan was well-organized, and the visit to Hazratbal Shrine was peaceful. The spiritual guide provided great insights into Kashmir's religious heritage. Felt truly blessed after this trip.",
      images: 4,
      helpful: 22,
      verified: true
    }
  ];

  const stats = {
    totalReviews: 847,
    averageRating: 4.8,
    fiveStars: 78,
    fourStars: 18,
    threeStars: 3,
    twoStars: 1,
    oneStars: 0
  };

  const WriteReviewForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="reviewerName">Your Name *</Label>
          <Input id="reviewerName" placeholder="Enter your name" required />
        </div>
        <div>
          <Label htmlFor="reviewerLocation">Your City *</Label>
          <Input id="reviewerLocation" placeholder="Enter your city" required />
        </div>
        <div>
          <Label htmlFor="packageName">Package Booked</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select package" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kashmir-valley">Kashmir Valley Explorer</SelectItem>
              <SelectItem value="adventure">Adventure Kashmir</SelectItem>
              <SelectItem value="spiritual">Spiritual Kashmir</SelectItem>
              <SelectItem value="honeymoon">Honeymoon Special</SelectItem>
              <SelectItem value="family">Family Fun Kashmir</SelectItem>
              <SelectItem value="ladakh">Leh Ladakh Expedition</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="rating">Overall Rating *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Rate your experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
              <SelectItem value="4">⭐⭐⭐⭐ Very Good</SelectItem>
              <SelectItem value="3">⭐⭐⭐ Good</SelectItem>
              <SelectItem value="2">⭐⭐ Fair</SelectItem>
              <SelectItem value="1">⭐ Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="reviewText">Your Review *</Label>
        <Textarea 
          id="reviewText" 
          placeholder="Share your experience... What did you love most? Any tips for future travelers?"
          rows={5}
          required
        />
      </div>
      
      <Button className="w-full bg-gradient-hero shadow-glow" size="lg">
        Submit Review
      </Button>
    </div>
  );

  const filteredReviews = filter === "all" ? reviews : reviews.filter(review => review.rating.toString() === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-mountain">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Traveler 
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Reviews
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Real experiences from real travelers. Discover what makes Kashmir so special 
            through the eyes of those who've been there.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.averageRating}</div>
              <div className="flex justify-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">{stats.totalReviews} reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.fiveStars}%</div>
              <div className="text-sm text-muted-foreground">5-star reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">96%</div>
              <div className="text-sm text-muted-foreground">Would recommend</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Write Review */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={filter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("all")}
                className={filter === "all" ? "bg-gradient-hero" : ""}
              >
                All Reviews
              </Button>
              {[5, 4, 3, 2, 1].map(rating => (
                <Button 
                  key={rating}
                  variant={filter === rating.toString() ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilter(rating.toString())}
                  className={filter === rating.toString() ? "bg-gradient-hero" : ""}
                >
                  {rating} ⭐
                </Button>
              ))}
            </div>

            {/* Write Review Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-hero shadow-glow">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Write Review
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Share Your Kashmir Experience</DialogTitle>
                  <DialogDescription>
                    Help other travelers by sharing your honest review and tips.
                  </DialogDescription>
                </DialogHeader>
                <WriteReviewForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredReviews.map((review) => (
              <Card key={review.id} className="hover:shadow-card transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {review.name}
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{review.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted-foreground'}`} 
                          />
                        ))}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {review.package}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-foreground leading-relaxed">
                    {review.review}
                  </p>
                  
                  {review.images > 0 && (
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Camera className="h-4 w-4" />
                        <span>{review.images} photos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{review.helpful} found helpful</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Helpful
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Reply
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
            Ready for Your Kashmir Adventure?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who've discovered the magic of Kashmir with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              Browse Packages
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;