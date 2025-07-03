import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Clock, MessageCircle, HeadphonesIcon } from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone Support",
    details: ["+91 98765 43210", "+91 11 4567 8900"],
    description: "Available 24/7 for emergencies",
    color: "text-green-600 bg-green-50",
  },
  {
    icon: Mail,
    title: "Email Support",
    details: ["info@healthlabpro.com", "support@healthlabpro.com"],
    description: "We'll respond within 2 hours",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: MapPin,
    title: "Visit Our Labs",
    details: ["123 Health Street, Medical City", "456 Wellness Avenue, Care District"],
    description: "Walk-ins welcome",
    color: "text-purple-600 bg-purple-50",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon-Sat: 7:00 AM - 9:00 PM", "Sunday: 8:00 AM - 6:00 PM"],
    description: "Home collection available 24/7",
    color: "text-orange-600 bg-orange-50",
  },
]

const faqs = [
  {
    question: "How do I book a test?",
    answer: "You can book tests online through our website, mobile app, or by calling our customer support.",
  },
  {
    question: "Is home sample collection free?",
    answer: "Yes, we provide free home sample collection for all our tests across all major cities.",
  },
  {
    question: "How long does it take to get reports?",
    answer: "Most reports are available within 24-48 hours. Some specialized tests may take longer.",
  },
  {
    question: "Are your labs certified?",
    answer: "Yes, all our laboratories are NABL accredited and follow international quality standards.",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-16 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help! Reach out to us for any questions, support, or to book your medical tests.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="border-blue-100 hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${info.color} flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-gray-700 font-medium">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-xs text-gray-500">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" className="border-blue-200" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" className="border-blue-200" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" className="border-blue-200" />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" className="border-blue-200" />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is this regarding?" className="border-blue-200" />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="space-y-6">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HeadphonesIcon className="w-5 h-5 mr-2 text-green-600" />
                  Quick Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Emergency Support</h4>
                  <p className="text-green-700 text-sm mb-3">
                    For urgent medical queries or emergency test bookings, call us immediately.
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now: +91 98765 43210
                  </Button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">WhatsApp Support</h4>
                  <p className="text-blue-700 text-sm mb-3">Get instant support and book tests through WhatsApp.</p>
                  <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="mt-12 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-600" />
              Find Our Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p>Interactive map will be displayed here</p>
                <p className="text-sm">Showing all HealthLab Pro locations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
