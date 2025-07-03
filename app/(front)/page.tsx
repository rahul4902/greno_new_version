"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Star,
  ChevronLeft,
  ChevronRight,
  IndianRupee,
  Users,
  Clock,
  Shield,
  Phone,
  MapPin,
  FileText,
  Heart,
  Award,
  CheckCircle,
  Search,
  MessageCircle,
  Mic,
  QrCode,
  ArrowRight,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ContactWidget } from "@/components/contact-widget"
import { useAppDispatch } from "@/lib/hooks"
import { setSearchModalOpen } from "@/lib/features/ui/uiSlice"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    review:
      "Excellent service! Quick results and very professional staff. The online booking made everything so convenient.",
    location: "Mumbai",
    testTaken: "Complete Health Checkup",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    review:
      "I've been using HealthLab Pro for my family's medical tests. Always accurate results and great customer service.",
    location: "Delhi",
    testTaken: "Diabetes Panel",
  },
  {
    id: 3,
    name: "Anita Patel",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    review:
      "The home collection service is amazing. No more waiting in long queues. Reports are detailed and easy to understand.",
    location: "Bangalore",
    testTaken: "Thyroid Function Test",
  },
]

const packages = [
  {
    id: 1,
    title: "Complete Health Checkup",
    originalPrice: 1299,
    price: 999,
    discount: 23,
    tests: ["CBC", "Lipid Profile", "Liver Function", "Kidney Function", "Thyroid", "Diabetes Panel"],
    popular: true,
    fastingHours: 12,
    reportTime: "24 hours",
  },
  {
    id: 2,
    title: "Diabetes Care Package",
    originalPrice: 599,
    price: 399,
    discount: 33,
    tests: ["Fasting Glucose", "HbA1c", "Post Meal Glucose", "Insulin"],
    popular: false,
    fastingHours: 8,
    reportTime: "6 hours",
  },
  {
    id: 3,
    title: "Heart Health Package",
    originalPrice: 899,
    price: 699,
    discount: 22,
    tests: ["Lipid Profile", "ECG", "Troponin", "CRP", "Homocysteine"],
    popular: false,
    fastingHours: 12,
    reportTime: "24 hours",
  },
  {
    id: 4,
    title: "Thyroid Complete",
    originalPrice: 799,
    price: 549,
    discount: 31,
    tests: ["TSH", "T3", "T4", "Anti-TPO", "Anti-TG"],
    popular: false,
    fastingHours: 0,
    reportTime: "12 hours",
  },
  {
    id: 5,
    title: "Women's Health Panel",
    originalPrice: 1199,
    price: 849,
    discount: 29,
    tests: ["CBC", "Hormones", "Vitamin D", "Iron Studies", "PCOS Panel"],
    popular: false,
    fastingHours: 12,
    reportTime: "48 hours",
  },
  {
    id: 6,
    title: "Senior Citizen Package",
    originalPrice: 1599,
    price: 1199,
    discount: 25,
    tests: ["Complete Health Checkup", "Bone Health", "Cardiac Risk", "Cancer Markers"],
    popular: true,
    fastingHours: 12,
    reportTime: "48 hours",
  },
]

const healthCategories = [
  {
    name: "Heart Health",
    icon: "❤️",
    testCount: 25,
    gradient: "from-red-400 to-pink-500",
    textColor: "text-white",
  },
  {
    name: "Diabetes Care",
    icon: "🩸",
    testCount: 18,
    gradient: "from-blue-400 to-cyan-500",
    textColor: "text-white",
  },
  {
    name: "Thyroid Function",
    icon: "🦋",
    testCount: 12,
    gradient: "from-purple-400 to-indigo-500",
    textColor: "text-white",
  },
  {
    name: "Women's Health",
    icon: "👩‍⚕️",
    testCount: 32,
    gradient: "from-pink-400 to-rose-500",
    textColor: "text-white",
  },
  {
    name: "Kidney Health",
    icon: "🫘",
    testCount: 15,
    gradient: "from-orange-400 to-red-500",
    textColor: "text-white",
  },
  {
    name: "Cancer Screening",
    icon: "🎗️",
    testCount: 22,
    gradient: "from-purple-400 to-indigo-500",
    textColor: "text-white",
  },
  {
    name: "Blood Tests",
    icon: "🩸",
    testCount: 28,
    gradient: "from-blue-400 to-cyan-500",
    textColor: "text-white",
  },
  {
    name: "Liver Health",
    icon: "🫀",
    testCount: 20,
    gradient: "from-yellow-400 to-orange-500",
    textColor: "text-white",
  },
]

const whyChooseUs = [
  {
    title: "NABL Certified Labs",
    description: "All our laboratories are NABL accredited with highest quality standards",
    icon: <Award className="w-6 h-6" />,
  },
  {
    title: "Free Home Collection",
    description: "Convenient sample collection at your doorstep at no extra cost",
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    title: "Quick Reports",
    description: "Get your digital reports within 24-48 hours via email and SMS",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    title: "24/7 Support",
    description: "Round the clock customer support for all your queries and concerns",
    icon: <Phone className="w-6 h-6" />,
  },
  {
    title: "Expert Consultation",
    description: "Free consultation with healthcare experts to understand your reports",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    title: "Secure & Private",
    description: "Your health data is completely secure and confidential with us",
    icon: <Shield className="w-6 h-6" />,
  },
]

export default function HomePage() {
  const dispatch = useAppDispatch()
  const [currentPackageIndex, setCurrentPackageIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchClick = () => {
    dispatch(setSearchModalOpen(true))
  }

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919876543210", "_blank")
  }

  const handleCallClick = () => {
    window.location.href = "tel:+919876543210"
  }

  const handleCategoryClick = (category: string) => {
    // Navigate to search with category filter
    window.location.href = `/search?category=${encodeURIComponent(category)}`
  }

  const nextPackage = () => {
    setCurrentPackageIndex((prev) => (prev + 1) % packages.length)
  }

  const prevPackage = () => {
    setCurrentPackageIndex((prev) => (prev - 1 + packages.length) % packages.length)
  }

  const visiblePackages = packages.slice(currentPackageIndex, currentPackageIndex + 3)
  if (visiblePackages.length < 3) {
    visiblePackages.push(...packages.slice(0, 3 - visiblePackages.length))
  }

  return (
    <>
      {/* Hero Section with Light Pink Gradient and Enhanced Glassmorphism */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-pink-200 via-rose-300 to-pink-400 overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-32 right-16 w-80 h-80 bg-pink-100/30 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-rose-200/25 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-white/15 rounded-full blur-2xl animate-pulse"></div>

          {/* Additional Glass Elements */}
          <div className="absolute top-20 left-1/2 w-48 h-48 bg-gradient-to-r from-white/10 to-pink-100/20 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-32 right-20 w-56 h-56 bg-gradient-to-l from-rose-100/20 to-white/10 rounded-full blur-2xl animate-pulse"></div>
        </div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0 opacity-8">
          <Image
            src="/placeholder.svg?height=800&width=1200"
            alt="Medical Laboratory"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent drop-shadow-sm">
              Your Health, Our Priority
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-700 max-w-3xl mx-auto font-medium">
              Professional medical testing with accurate results
            </p>

            {/* Enhanced Glassmorphism Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative backdrop-blur-xl bg-white/25 rounded-3xl p-4 shadow-2xl border border-white/40 hover:bg-white/30 transition-all duration-300">
                <div className="flex items-center">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
                  <Input
                    placeholder="Search Tests"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={handleSearchClick}
                    className="pl-14 pr-24 h-12 md:h-14 text-base md:text-lg bg-transparent border-0 rounded-2xl cursor-pointer text-gray-800 placeholder-gray-600 focus:ring-2 focus:ring-white/60 font-medium"
                    readOnly
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-2">
                    {/* Prominent Microphone Icon */}
                    <Button
                      size="sm"
                      className="p-3 h-10 w-10 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      title="Voice Search"
                    >
                      <Mic className="w-5 h-5" />
                    </Button>
                    <Button
                      size="sm"
                      className="p-2 h-8 w-8 bg-white/20 hover:bg-white/30 text-gray-700 rounded-lg backdrop-blur-sm border border-white/30 transition-all duration-300"
                      title="QR Scanner"
                    >
                      <QrCode className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Search Enhancement Text */}
              <p className="text-sm text-gray-600 mt-3 flex items-center justify-center">
                <Mic className="w-4 h-4 mr-1 text-orange-500" />
                Try voice search for faster results
              </p>
            </div>

            {/* Contact Actions with Enhanced Glassmorphism */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleCallClick}
                className="backdrop-blur-xl bg-white/30 border border-white/50 text-gray-800 hover:bg-white/40 px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                <Phone className="w-4 h-4 mr-2" />
                +91 98765 43210
              </Button>
              <Button
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Chat
              </Button>
            </div>

            {/* Stats with Glass Effect */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 max-w-4xl mx-auto">
              {[
                { number: "50,000+", label: "Happy Customers" },
                { number: "98%", label: "Accuracy Rate" },
                { number: "24/7", label: "Support Available" },
                { number: "100+", label: "Test Types" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="backdrop-blur-lg bg-white/20 rounded-2xl p-4 md:p-6 border border-white/30 hover:bg-white/25 transition-all duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base text-gray-700 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Health Categories */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Browse by Health Category</h2>
              <p className="text-gray-600 text-base md:text-lg">
                Find the right tests for your specific health concerns
              </p>
            </div>
            <Link href="/categories">
              <Button
                variant="outline"
                className="hidden md:flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {healthCategories.map((category, index) => (
              <Card
                key={index}
                className={`cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br ${category.gradient} hover:scale-105 transform group`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardContent className="p-4 md:p-6 text-center relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-2 right-2 text-4xl opacity-20">{category.icon}</div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-2xl">{category.icon}</div>
                    </div>
                    <h3 className={`font-semibold text-sm md:text-base ${category.textColor} mb-2`}>{category.name}</h3>
                    <div className="flex items-center justify-center gap-1 text-xs text-white/80">
                      <TrendingUp className="w-3 h-3" />
                      <span>{category.testCount} tests</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="text-center mt-6 md:hidden">
            <Link href="/categories">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                View All Categories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Choose HealthLab Pro</h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Experience world-class healthcare diagnostics with cutting-edge technology and compassionate care
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {whyChooseUs.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 border border-gray-200 group"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold mb-3 text-gray-900 text-lg">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Slider */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Popular Health Packages</h2>
              <p className="text-gray-600 text-base md:text-lg">
                Choose from our expertly curated health packages at affordable prices
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPackage}
                className="border-gray-300 hover:bg-white h-10 w-10 p-0 rounded-full shadow-md bg-transparent"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextPackage}
                className="border-gray-300 hover:bg-white h-10 w-10 p-0 rounded-full shadow-md bg-transparent"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {visiblePackages.map((pkg, index) => (
              <Card
                key={`${pkg.id}-${index}`}
                className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm relative group"
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Popular
                  </div>
                )}

                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">{pkg.title}</h3>

                  <div className="flex items-center mb-6">
                    <div className="flex items-center mr-4">
                      <IndianRupee className="w-5 h-5 text-green-600 mr-1" />
                      <span className="text-2xl md:text-3xl font-bold text-green-600">{pkg.price}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      <span className="line-through text-base">{pkg.originalPrice}</span>
                      <Badge className="ml-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs border-0">
                        {pkg.discount}% OFF
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {pkg.fastingHours > 0 ? `${pkg.fastingHours}h fasting` : "No fasting required"}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="w-4 h-4 mr-2" />
                      Report in {pkg.reportTime}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {pkg.tests.length} tests included
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-3 font-medium">Package includes:</p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.tests.slice(0, 3).map((test, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-gray-200">
                          {test}
                        </Badge>
                      ))}
                      {pkg.tests.length > 3 && (
                        <Badge variant="outline" className="text-xs border-gray-200">
                          +{pkg.tests.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <Link href={`/package/${pkg.id}`} className="w-full">
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/book?package=${pkg.id}`} className="w-full">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Book Now - ₹{pkg.price}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust HealthLab Pro for their healthcare needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-base">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                      <div className="flex mb-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">"{testimonial.review}"</p>
                  <Badge variant="outline" className="border-gray-200 text-gray-600 text-xs">
                    {testimonial.testTaken}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Take Charge of Your Health?</h2>
            <p className="text-lg mb-8 opacity-90">
              Book your medical test today and get accurate results with expert consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-full">
                <CheckCircle className="w-5 h-5 mr-2" />
                Book Test Now
              </Button>
              <Button
                size="lg"
                className="backdrop-blur-lg bg-white/20 border border-white/30 text-white hover:bg-white/30 font-medium px-8 py-3 rounded-full"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: +91 98765 43210
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Widget */}
      <ContactWidget />
    </>
  )
}
