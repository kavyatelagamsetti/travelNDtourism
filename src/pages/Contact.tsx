import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  Headphones,
  Star,
  Users,
  Calendar,
  HelpCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: ["Dal Lake Road, Srinagar", "Jammu & Kashmir 190001", "India"],
      accent: "text-primary"
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+91 9876 543 210", "+91 9876 543 211", "Available 24/7"],
      accent: "text-green-600"
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: ["info@echoesofkashmir.com", "bookings@echoesofkashmir.com", "support@echoesofkashmir.com"],
      accent: "text-blue-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Sat: 9:00 AM - 8:00 PM", "Sunday: 10:00 AM - 6:00 PM", "Emergency: 24/7"],
      accent: "text-orange-600"
    }
  ];

  const quickLinks = [
    { icon: MessageCircle, title: "WhatsApp", desc: "Chat with us instantly", action: "Quick response" },
    { icon: Phone, title: "Call Now", desc: "Speak with our experts", action: "Immediate help" },
    { icon: Mail, title: "Email", desc: "Detailed inquiries", action: "24hr response" },
    { icon: Calendar, title: "Schedule Call", desc: "Book a consultation", action: "Free service" }
  ];

  const faqs = [
    {
      question: "What's the best time to visit Kashmir?",
      answer: "March to October is ideal, with each season offering unique experiences. Spring (Mar-May) for flowers, summer (Jun-Aug) for pleasant weather, and autumn (Sep-Oct) for golden landscapes."
    },
    {
      question: "Are your packages customizable?",
      answer: "Absolutely! All our packages can be customized based on your preferences, budget, and duration. Contact us to discuss your specific requirements."
    },
    {
      question: "What safety measures do you have?",
      answer: "We provide comprehensive travel insurance, experienced local guides, 24/7 support, and follow all government safety guidelines for tourist activities."
    },
    {
      question: "Do you provide transportation?",
      answer: "Yes, we offer various transportation options from budget taxis to luxury vehicles, all with experienced drivers familiar with Kashmir's terrain."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-mountain">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Get In 
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Ready to explore Kashmir? Have questions about our packages? 
            We're here to help you plan the perfect journey.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-primary" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <span>Expert Guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Personalized Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Card key={index} className="hover:shadow-card transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-hero p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <link.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{link.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{link.desc}</p>
                  <Badge variant="secondary" className="text-xs">{link.action}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name" 
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name" 
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="Enter your phone number" 
                          required 
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email address" 
                        required 
                      />
                    </div>

                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="package-booking">Package Booking</SelectItem>
                          <SelectItem value="custom-trip">Custom Trip Planning</SelectItem>
                          <SelectItem value="ride-booking">Transportation/Rides</SelectItem>
                          <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                          <SelectItem value="support">Customer Support</SelectItem>
                          <SelectItem value="partnership">Business Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input 
                        id="subject" 
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief subject of your inquiry" 
                        required 
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message" 
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about your Kashmir travel plans, questions, or requirements..."
                        rows={5}
                        required 
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-hero shadow-glow" size="lg">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-card transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg bg-muted ${info.accent}`}>
                          <info.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-foreground">{info.title}</h3>
                      </div>
                      <div className="space-y-1">
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* FAQs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-border pb-4 last:border-b-0">
                      <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="bg-gradient-hero text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Emergency Support</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Need immediate assistance during your trip? Our emergency helpline is available 24/7.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">+91 9876 543 999</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Visit Our Office</h2>
            <p className="text-xl text-muted-foreground">Located in the heart of Srinagar</p>
          </div>
          <div className="bg-gradient-lake rounded-lg h-64 flex items-center justify-center">
            <div className="text-center text-white">
              <MapPin className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dal Lake Road, Srinagar</h3>
              <p className="opacity-90">Interactive map coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;