import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Award, Shield, Star, CheckCircle, Clock, Globe } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              About Echoes Of Kashmir
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Trusted Partner in Kashmir Tourism
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We are dedicated to showcasing the unparalleled beauty of Jammu & Kashmir through authentic,
              sustainable, and memorable travel experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Why Choose Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Verified Partners</h4>
                    <p className="text-muted-foreground">All our service providers are government-certified and regularly audited for quality and safety.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Local Expertise</h4>
                    <p className="text-muted-foreground">Our team consists of local Kashmiris who know every valley, lake, and mountain personally.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Sustainable Tourism</h4>
                    <p className="text-muted-foreground">We promote responsible tourism that benefits local communities and preserves Kashmir's natural beauty.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">24/7 Support</h4>
                    <p className="text-muted-foreground">Round-the-clock customer support in multiple languages to ensure your journey is seamless.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center">
                <CardHeader className="pb-3">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">100% Safe</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Your safety and security are our top priorities</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader className="pb-3">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Award Winning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Recognized for excellence in tourism services</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader className="pb-3">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Expert Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Certified local guides with years of experience</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader className="pb-3">
                  <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Global Reach</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Serving travelers from around the world</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-lake rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Our Impact</h3>
              <p className="text-white/80">Numbers that speak for themselves</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-sm text-white/80">Destinations Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-sm text-white/80">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100+</div>
                <div className="text-sm text-white/80">Tour Packages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">4.9</div>
                <div className="text-sm text-white/80">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Travel Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From planning to execution, we handle every aspect of your Kashmir journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Destination Packages</CardTitle>
                <CardDescription>
                  Curated travel packages for all major destinations across Jammu & Kashmir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Srinagar & Dal Lake</li>
                  <li>• Gulmarg Ski Resort</li>
                  <li>• Pahalgam Valley</li>
                  <li>• Leh-Ladakh Circuit</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Transportation</CardTitle>
                <CardDescription>
                  Reliable and comfortable transportation options for your entire journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Private Cars & SUVs</li>
                  <li>• Tempo Travelers</li>
                  <li>• Buses for Groups</li>
                  <li>• Airport Transfers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Local Experiences</CardTitle>
                <CardDescription>
                  Authentic cultural experiences and activities led by local experts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Houseboat Stays</li>
                  <li>• Shikara Rides</li>
                  <li>• Local Cuisine Tours</li>
                  <li>• Cultural Workshops</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-mountain text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Kashmir?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered the magic of Kashmir through our platform.
            Your unforgettable journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              Start Planning
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

export default Index;
