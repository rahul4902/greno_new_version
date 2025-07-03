import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Users, Clock, Shield, Heart, Star, CheckCircle } from "lucide-react"
import Image from "next/image"

const achievements = [
  { icon: Users, title: "50,000+", subtitle: "Happy Customers", color: "text-blue-600" },
  { icon: Award, title: "98%", subtitle: "Accuracy Rate", color: "text-green-600" },
  { icon: Clock, title: "24/7", subtitle: "Support Available", color: "text-purple-600" },
  { icon: Shield, title: "15+", subtitle: "Years Experience", color: "text-orange-600" },
]

const services = [
  "Home Sample Collection",
  "NABL Accredited Labs",
  "Expert Consultation",
  "Digital Reports",
  "24/7 Customer Support",
  "Affordable Pricing",
  "Quick Turnaround",
  "Quality Assurance",
]

const team = [
  {
    name: "Dr. Rajesh Sharma",
    role: "Chief Medical Officer",
    experience: "15+ years",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Dr. Priya Patel",
    role: "Laboratory Director",
    experience: "12+ years",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Dr. Amit Kumar",
    role: "Quality Assurance Head",
    experience: "10+ years",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-16 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About HealthLab Pro</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in healthcare diagnostics, committed to providing accurate, reliable, and accessible
            medical testing services across India.
          </p>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center border-blue-100">
              <CardContent className="p-6">
                <achievement.icon className={`w-12 h-12 ${achievement.color} mx-auto mb-4`} />
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{achievement.title}</div>
                <div className="text-sm text-gray-600">{achievement.subtitle}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2009, HealthLab Pro began with a simple mission: to make quality healthcare diagnostics
              accessible to everyone. What started as a single laboratory in Delhi has now grown into a network of
              state-of-the-art facilities across India.
            </p>
            <p className="text-gray-700 mb-4">
              We believe that early detection and accurate diagnosis are the cornerstones of effective healthcare. Our
              team of experienced professionals, cutting-edge technology, and commitment to excellence have made us a
              trusted name in medical diagnostics.
            </p>
            <p className="text-gray-700 mb-6">
              Today, we serve over 50,000 customers annually, maintaining the highest standards of quality and accuracy
              in every test we perform.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">Learn More About Our Services</Button>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="HealthLab Pro Laboratory"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Our Services */}
        <Card className="mb-12 border-blue-100">
          <CardContent className="p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Our Team */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Expert Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-blue-100">
                <CardContent className="p-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <Badge variant="outline" className="border-blue-200 text-blue-600">
                    {member.experience}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-blue-100">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 text-red-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700">
                To provide accurate, reliable, and accessible diagnostic services that empower individuals to take
                control of their health and enable healthcare providers to make informed decisions.
              </p>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Star className="w-8 h-8 text-yellow-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700">
                To be India's most trusted healthcare diagnostics partner, setting new standards in quality, innovation,
                and customer care while making healthcare accessible to all.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Take Charge of Your Health?</h2>
            <p className="text-lg mb-6 opacity-90">Book your test today and experience the HealthLab Pro difference.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Book a Test
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
