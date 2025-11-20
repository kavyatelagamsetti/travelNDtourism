import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Award, Users, Globe, MapPin, Camera, Shield, Headphones, Star, Mountain } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "5000+", label: "Happy Travelers" },
    { icon: MapPin, value: "50+", label: "Destinations Covered" },
    { icon: Award, value: "100+", label: "Tour Packages" },
    { icon: Globe, value: "15+", label: "Countries Served" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passionate About Kashmir",
      description: "Born and raised in Kashmir, we share our homeland's beauty with authentic local insights and genuine love for our valleys."
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Your safety is our priority. All our packages include comprehensive insurance, experienced guides, and 24/7 support."
    },
    {
      icon: Camera,
      title: "Creating Memories",
      description: "We don't just organize trips; we craft unforgettable experiences that you'll treasure for a lifetime."
    },
    {
      icon: Headphones,
      title: "Always Here for You",
      description: "From planning to return, our dedicated support team is available 24/7 to ensure your journey is smooth."
    }
  ];

  const team = [
    {
      name: "Rashid Ahmad",
      role: "Founder & Head Guide",
      experience: "15+ years",
      specialty: "Kashmir History & Culture",
      description: "Native Kashmiri with deep knowledge of local traditions, hidden gems, and the best experiences Kashmir offers."
    },
    {
      name: "Priya Sharma",
      role: "Operations Manager", 
      experience: "10+ years",
      specialty: "Tour Planning & Logistics",
      description: "Expert in crafting seamless travel experiences with attention to every detail from accommodation to transportation."
    },
    {
      name: "Vikram Singh",
      role: "Adventure Specialist",
      experience: "12+ years", 
      specialty: "Trekking & Adventure Sports",
      description: "Certified mountaineer specializing in high-altitude adventures, skiing, and outdoor activities in Kashmir and Ladakh."
    },
    {
      name: "Anjali Patel",
      role: "Customer Experience Lead",
      experience: "8+ years",
      specialty: "Hospitality & Support",
      description: "Dedicated to ensuring every traveler feels welcomed and supported throughout their Kashmir journey."
    }
  ];

  const milestones = [
    { year: "2010", event: "EchoesOfKashmir Founded", description: "Started with a simple dream to share Kashmir's beauty" },
    { year: "2013", event: "1000+ Travelers", description: "Reached our first thousand happy customers" },
    { year: "2016", event: "Expanded to Ladakh", description: "Added high-altitude adventures to our offerings" },
    { year: "2019", event: "Digital Platform Launch", description: "Launched our online booking platform" },
    { year: "2022", event: "5000+ Travelers", description: "Celebrated five thousand successful trips" },
    { year: "2024", event: "International Recognition", description: "Featured in top travel publications worldwide" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-mountain">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            About 
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              EchoesOfKashmir
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            We are a passionate team of Kashmir natives and travel experts dedicated to sharing 
            the unparalleled beauty of our homeland. Every valley tells a story, and we're here 
            to help you discover yours.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span>15+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <span>4.8/5 Customer Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>100% Safety Record</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-hero p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
              <p className="mb-6">
                EchoesOfKashmir was born from a simple yet powerful vision: to share the breathtaking beauty 
                and rich culture of Jammu & Kashmir with travelers from around the world. Founded in 2010 by 
                Rashid Ahmad, a native Kashmiri with an unbreakable bond to his homeland, our journey began 
                with intimate group tours to hidden valleys and sacred sites.
              </p>
              <p className="mb-6">
                What started as weekend trips for friends and family has grown into a comprehensive tourism 
                platform serving thousands of travelers annually. Yet our core mission remains unchanged: 
                to provide authentic, safe, and transformative experiences that create lasting connections 
                between visitors and the magical land of Kashmir.
              </p>
              <p>
                Today, we're proud to be Kashmir's most trusted tourism partner, combining local expertise 
                with modern convenience to make your dream Kashmir journey a reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">What drives us every day</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-card transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-hero p-3 rounded-lg shadow-glow">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">The experts behind your Kashmir experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-32 bg-gradient-lake flex items-center justify-center">
                  <Users className="h-16 w-16 text-white" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">{member.role}</CardDescription>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">{member.experience}</Badge>
                    <Badge variant="outline" className="text-xs">{member.specialty}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 bg-gradient-mountain">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">Key milestones in our growth</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                      <Mountain className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-card p-6 rounded-lg shadow-card hover:shadow-elegant transition-shadow">
                      <div className="flex items-center gap-4 mb-2">
                        <Badge className="bg-primary text-primary-foreground">{milestone.year}</Badge>
                        <h3 className="text-lg font-semibold text-foreground">{milestone.event}</h3>
                      </div>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Your Kashmir Story?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Let us be your guide to the most beautiful destination on earth. 
            Your Kashmir adventure starts with a single click.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              Explore Packages
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;