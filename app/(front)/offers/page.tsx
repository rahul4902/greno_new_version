"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { IndianRupee, Star, Gift, Calendar, ArrowRight, Timer, Zap } from "lucide-react"
import Image from "next/image"

const flashSales = [
  {
    id: 1,
    title: "Flash Sale - Complete Health Checkup",
    originalPrice: 1299,
    salePrice: 799,
    discount: 38,
    timeLeft: "2h 45m",
    soldCount: 156,
    totalStock: 200,
    image: "/placeholder.svg?height=200&width=300",
    category: "Health Packages",
    popular: true,
    features: ["26 Tests Included", "Free Home Collection", "Digital Reports", "Expert Consultation"],
  },
  {
    id: 2,
    title: "Thyroid Function Test - Limited Time",
    originalPrice: 549,
    salePrice: 299,
    discount: 45,
    timeLeft: "5h 12m",
    soldCount: 89,
    totalStock: 150,
    image: "/placeholder.svg?height=200&width=300",
    category: "Hormone Tests",
    popular: false,
    features: ["T3, T4, TSH Tests", "Same Day Results", "Free Consultation", "Home Collection"],
  },
]

const weeklyOffers = [
  {
    id: 1,
    title: "Diabetes Care Package",
    description: "Complete diabetes monitoring with HbA1c, Fasting Glucose & more",
    originalPrice: 599,
    salePrice: 399,
    discount: 33,
    validTill: "2024-01-28",
    features: ["4 Tests Included", "Free Home Collection", "Digital Reports"],
    image: "/placeholder.svg?height=150&width=250",
    category: "Diabetes Care",
    rating: 4.8,
    reviews: 245,
  },
  {
    id: 2,
    title: "Heart Health Screening",
    description: "Comprehensive cardiac risk assessment package",
    originalPrice: 899,
    salePrice: 649,
    discount: 28,
    validTill: "2024-01-30",
    features: ["5 Tests Included", "ECG Included", "Expert Consultation"],
    image: "/placeholder.svg?height=150&width=250",
    category: "Heart Health",
    rating: 4.9,
    reviews: 189,
  },
  {
    id: 3,
    title: "Women's Wellness Package",
    description: "Specialized health screening for women of all ages",
    originalPrice: 1199,
    salePrice: 849,
    discount: 29,
    validTill: "2024-02-05",
    features: ["8 Tests Included", "Hormone Panel", "Vitamin Analysis"],
    image: "/placeholder.svg?height=150&width=250",
    category: "Women's Health",
    rating: 4.7,
    reviews: 312,
  },
]

const seasonalOffers = [
  {
    id: 1,
    title: "New Year Health Resolution",
    description: "Start your year with complete health assessment",
    discount: "Up to 40% OFF",
    code: "NEWYEAR40",
    validTill: "2024-01-31",
    minOrder: 1000,
    image: "/placeholder.svg?height=120&width=200",
    terms: ["Valid on all health packages", "Cannot be combined with other offers", "Free home collection included"],
  },
  {
    id: 2,
    title: "Family Health Package",
    description: "Book for 3+ family members and save more",
    discount: "Buy 2 Get 1 Free",
    code: "FAMILY3",
    validTill: "2024-02-15",
    minOrder: 1500,
    image: "/placeholder.svg?height=120&width=200",
    terms: ["Applicable on selected packages", "Valid for family members only", "ID verification required"],
  },
]

export default function OffersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [email, setEmail] = useState("")

  const handleSubscribe = () => {
    if (email) {
      console.log("Subscribing email:", email)
      setEmail("")
      // Show success message
    }
  }

  const handleBookNow = (offerId: number) => {
    console.log("Booking offer:", offerId)
    // Redirect to booking page
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Gift className="w-8 h-8 mr-3" />
              <h1 className="text-3xl md:text-5xl font-bold">Special Offers</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 opacity-90">Save big on health checkups and diagnostic tests</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-lg font-semibold">🔥 Limited Time Deals</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-lg font-semibold">💰 Up to 50% OFF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sales */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Zap className="w-6 h-6 text-yellow-500 mr-2" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Flash Sales</h2>
              <Badge className="ml-3 bg-red-500 animate-pulse">ENDING SOON</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {flashSales.map((sale) => (
              <Card
                key={sale.id}
                className="overflow-hidden border-2 border-red-200 hover:border-red-400 transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative">
                  <Image
                    src={sale.image || "/placeholder.svg"}
                    alt={sale.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white font-bold">{sale.discount}% OFF</Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full">
                    <div className="flex items-center text-sm">
                      <Timer className="w-4 h-4 mr-1" />
                      {sale.timeLeft}
                    </div>
                  </div>
                  {sale.popular && (
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-yellow-500">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{sale.title}</h3>
                    <Badge variant="outline">{sale.category}</Badge>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      <IndianRupee className="w-5 h-5 text-green-600 mr-1" />
                      <span className="text-2xl font-bold text-green-600">{sale.salePrice}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      <span className="line-through text-lg">{sale.originalPrice}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="space-y-1">
                      {sale.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Sold: {sale.soldCount}</span>
                      <span>Available: {sale.totalStock - sale.soldCount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(sale.soldCount / sale.totalStock) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold"
                    onClick={() => handleBookNow(sale.id)}
                  >
                    Book Now - Save ₹{sale.originalPrice - sale.salePrice}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Offers */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Weekly Special Offers</h2>
            <p className="text-gray-600 text-lg">Handpicked deals updated every week</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {weeklyOffers.map((offer) => (
              <Card key={offer.id} className="hover:shadow-xl transition-all duration-300 border border-gray-200 group">
                <div className="relative overflow-hidden">
                  <Image
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.title}
                    width={250}
                    height={150}
                    className="w-full h-40 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500 text-white">{offer.discount}% OFF</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {offer.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {offer.rating} ({offer.reviews})
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      <IndianRupee className="w-5 h-5 text-green-600 mr-1" />
                      <span className="text-2xl font-bold text-green-600">{offer.salePrice}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      <span className="line-through">{offer.originalPrice}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="space-y-1">
                      {offer.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      Valid till {offer.validTill}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleBookNow(offer.id)}
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Seasonal Promotions</h2>
            <p className="text-gray-600 text-lg">Limited time promotional offers with exclusive codes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {seasonalOffers.map((promo) => (
              <Card
                key={promo.id}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                      <p className="text-purple-100 mb-4">{promo.description}</p>
                    </div>
                    <Image
                      src={promo.image || "/placeholder.svg"}
                      alt={promo.title}
                      width={120}
                      height={80}
                      className="rounded-lg opacity-80 ml-4"
                    />
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{promo.discount}</div>
                      <div className="text-sm opacity-90">
                        Use code: <span className="font-bold bg-white/20 px-2 py-1 rounded">{promo.code}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm mb-2">
                      <div className="flex justify-between">
                        <span>Min. order:</span>
                        <span>₹{promo.minOrder}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Valid till:</span>
                        <span>{promo.validTill}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs opacity-80 mb-2">Terms & Conditions:</p>
                      <ul className="text-xs opacity-80 space-y-1">
                        {promo.terms.map((term, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{term}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                    Apply Offer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Our Offers?</h2>
            <p className="text-xl opacity-90">Trusted by thousands of customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">50,000+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">₹2.5Cr+</div>
              <div className="text-gray-300">Total Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">4.8★</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">24/7</div>
              <div className="text-gray-300">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Never Miss a Deal!</h2>
            <p className="text-xl mb-8 opacity-90">Subscribe to get exclusive offers, flash sales, and health tips</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-white text-gray-900 border-0 flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8" onClick={handleSubscribe}>
                Subscribe
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">Join 10,000+ subscribers. No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
