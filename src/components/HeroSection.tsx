import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/kashmir-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Beautiful Kashmir Valley with Dal Lake and snow-capped mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center lg:text-left">
        <div className="max-w-4xl mx-auto lg:mx-0">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Kashmir's #1 Tourism Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="block">Echoes Of</span>
            <span className="bg-gradient-hero bg-clip-text text-transparent">Kashmir</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
            Where Every Valley Tells a Story
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Discover the breathtaking beauty of Jammu & Kashmir through our comprehensive tourism platform.
            Book packages, find rides, and explore destinations that will create memories to last a lifetime.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <Button size="lg" className="bg-gradient-hero shadow-glow hover:shadow-elegant group px-8 py-6 text-lg" asChild>
              <Link to="/destinations">
                Explore Destinations
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 hover:bg-primary/5 px-8 py-6 text-lg group"
              asChild
            >
              <Link to="/packages">
                View Packages
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-border/50">
            <div className="text-center lg:text-left">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Destinations</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Tour Packages</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl font-bold text-primary">5000+</div>
              <div className="text-sm text-muted-foreground">Happy Travelers</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl font-bold text-primary">4.9</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;