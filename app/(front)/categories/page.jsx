"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Users, Clock, Star, ArrowRight, Filter } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const healthCategories = [
  {
    id: 1,
    name: "Heart Health",
    description: "Comprehensive cardiac screening and monitoring tests",
    icon: "❤️",
    testCount: 25,
    packageCount: 8,
    popular: true,
    gradient: "from-red-400 to-pink-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    tests: ["Lipid Profile", "ECG", "Troponin", "CRP", "Homocysteine"],
    startingPrice: 299,
  },
  {
    id: 2,
    name: "Diabetes Care",
    description: "Blood sugar monitoring and diabetes management tests",
    icon: "🩸",
    testCount: 18,
    packageCount: 6,
    popular: true,
    gradient: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    tests: ["Fasting Glucose", "HbA1c", "Post Meal Glucose", "Insulin"],
    startingPrice: 199,
  },
  {
    id: 3,
    name: "Thyroid Function",
    description: "Complete thyroid hormone analysis and monitoring",
    icon: "🦋",
    testCount: 12,
    packageCount: 4,
    popular: true,
    gradient: "from-purple-400 to-indigo-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    tests: ["TSH", "T3", "T4", "Anti-TPO", "Anti-TG"],
    startingPrice: 349,
  },
  {
    id: 4,
    name: "Women's Health",
    description: "Specialized health screening for women of all ages",
    icon: "👩‍⚕️",
    testCount: 32,
    packageCount: 12,
    popular: true,
    gradient: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    textColor: "text-pink-700",
    tests: ["Hormones", "PCOS Panel", "Pregnancy Tests", "Bone Health"],
    startingPrice: 399,
  },
  {
    id: 5,
    name: "Kidney Health",
    description: "Comprehensive kidney function assessment",
    icon: "🫘",
    testCount: 15,
    packageCount: 5,
    popular: false,
    gradient: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    tests: ["Creatinine", "BUN", "Uric Acid", "eGFR"],
    startingPrice: 249,
  },
  {
    id: 6,
    name: "Liver Function",
    description: "Complete liver health evaluation and monitoring",
    icon: "🫀",
    testCount: 20,
    packageCount: 7,
    popular: false,
    gradient: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700",
    tests: ["ALT", "AST", "Bilirubin", "Alkaline Phosphatase"],
    startingPrice: 299,
  },
  {
    id: 7,
    name: "Blood Tests",
    description: "Complete blood analysis and cell count tests",
    icon: "🩸",
    testCount: 28,
    packageCount: 10,
    popular: true,
    gradient: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    tests: ["CBC", "ESR", "Blood Group", "Hemoglobin"],
    startingPrice: 199,
  },
  {
    id: 8,
    name: "Cancer Screening",
    description: "Early detection and cancer marker tests",
    icon: "🎗️",
    testCount: 22,
    packageCount: 8,
    popular: false,
    gradient: "from-purple-400 to-indigo-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    tests: ["PSA", "CEA", "CA 125", "AFP"],
    startingPrice: 599,
  },
  {
    id: 9,
    name: "Bone Health",
    description: "Bone density and calcium metabolism tests",
    icon: "🦴",
    testCount: 10,
    packageCount: 3,
    popular: false,
    gradient: "from-gray-400 to-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    textColor: "text-gray-700",
    tests: ["Vitamin D", "Calcium", "Phosphorus", "ALP"],
    startingPrice: 399,
  },
  {
    id: 10,
    name: "Infectious Diseases",
    description: "Screening for various infections and immunity",
    icon: "🦠",
    testCount: 35,
    packageCount: 15,
    popular: false,
    gradient: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    tests: ["HIV", "Hepatitis", "COVID-19", "Typhoid"],
    startingPrice: 299,
  },
  {
    id: 11,
    name: "Allergy Testing",
    description: "Comprehensive allergy and sensitivity testing",
    icon: "🤧",
    testCount: 18,
    packageCount: 6,
    popular: false,
    gradient: "from-teal-400 to-cyan-500",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    textColor: "text-teal-700",
    tests: ["IgE Total", "Food Allergy", "Environmental", "Drug Allergy"],
    startingPrice: 799,
  },
  {
    id: 12,
    name: "Fitness & Sports",
    description: "Health screening for athletes and fitness enthusiasts",
    icon: "💪",
    testCount: 16,
    packageCount: 5,
    popular: false,
    gradient: "from-indigo-400 to-purple-500",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-700",
    tests: ["Fitness Panel", "Protein", "Vitamins", "Minerals"],
    startingPrice: 499,
  },
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const router = useRouter()

  const filteredCategories = healthCategories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "popular" && category.popular) ||
      (selectedFilter === "affordable" && category.startingPrice <= 300)

    return matchesSearch && matchesFilter
  })

  const handleCategoryClick = (categoryName) => {
    router.push(`/search?category=${encodeURIComponent(categoryName)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Health Categories</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of medical tests organized by health categories
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-blue-200 focus:border-blue-400"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
                size="sm"
                className="bg-transparent"
              >
                All Categories
              </Button>
              <Button
                variant={selectedFilter === "popular" ? "default" : "outline"}
                onClick={() => setSelectedFilter("popular")}
                size="sm"
                className="bg-transparent"
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Popular
              </Button>
              <Button
                variant={selectedFilter === "affordable" ? "default" : "outline"}
                onClick={() => setSelectedFilter("affordable")}
                size="sm"
                className="bg-transparent"
              >
                <Filter className="w-4 h-4 mr-1" />
                Affordable
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center border-blue-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
              <div className="text-sm text-gray-600">Categories</div>
            </CardContent>
          </Card>
          <Card className="text-center border-green-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">250+</div>
              <div className="text-sm text-gray-600">Tests</div>
            </CardContent>
          </Card>
          <Card className="text-center border-purple-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">89</div>
              <div className="text-sm text-gray-600">Packages</div>
            </CardContent>
          </Card>
          <Card className="text-center border-orange-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600 mb-1">₹199</div>
              <div className="text-sm text-gray-600">Starting From</div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer hover:shadow-xl transition-all duration-300 border-2 ${category.borderColor} ${category.bgColor} hover:scale-105 transform group`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{category.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      {category.popular && (
                        <Badge className="bg-orange-500 text-white text-xs mt-1">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{category.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {category.testCount} tests
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {category.packageCount} packages
                    </div>
                  </div>
                  <div className={`font-bold ${category.textColor}`}>From ₹{category.startingPrice}</div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Popular tests:</p>
                  <div className="flex flex-wrap gap-1">
                    {category.tests.slice(0, 3).map((test, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className={`text-xs ${category.borderColor} ${category.textColor}`}
                      >
                        {test}
                      </Badge>
                    ))}
                    {category.tests.length > 3 && (
                      <Badge variant="outline" className={`text-xs ${category.borderColor} ${category.textColor}`}>
                        +{category.tests.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${category.gradient} hover:opacity-90 text-white border-0`}
                  size="sm"
                >
                  Explore Tests
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-lg mb-6 opacity-90">
            Our healthcare experts can help you choose the right tests for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Browse All Tests
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Contact Expert
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
