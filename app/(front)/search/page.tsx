"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, Clock, TestTube, IndianRupee, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { SearchModal } from "@/components/search-modal"
import { addToCart } from "@/lib/features/cart/cartSlice"
import { useDispatch } from "react-redux"

const mockTests = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    type: "test",
    originalPrice: 399,
    price: 299,
    discount: 25,
    fastingTime: 0,
    sampleType: "Blood",
    category: "Blood Tests",
    popular: true,
  },
  {
    id: 2,
    name: "Thyroid Function Test",
    type: "test",
    originalPrice: 799,
    price: 549,
    discount: 31,
    fastingTime: 0,
    sampleType: "Blood",
    category: "Hormone Tests",
    popular: true,
  },
  {
    id: 3,
    name: "Lipid Profile",
    type: "test",
    originalPrice: 499,
    price: 399,
    discount: 20,
    fastingTime: 12,
    sampleType: "Blood",
    category: "Heart Health",
    popular: false,
  },
  {
    id: 4,
    name: "Complete Health Checkup",
    type: "package",
    originalPrice: 1299,
    price: 999,
    discount: 23,
    fastingTime: 12,
    tests: ["CBC", "Lipid Profile", "Liver Function", "Kidney Function", "Thyroid", "Diabetes Panel"],
    category: "Health Packages",
    popular: true,
  },
  {
    id: 5,
    name: "Diabetes Panel",
    type: "package",
    originalPrice: 599,
    price: 399,
    discount: 33,
    fastingTime: 8,
    tests: ["Fasting Glucose", "HbA1c", "Post Meal Glucose", "Insulin"],
    category: "Diabetes",
    popular: false,
  },
]

const categories = ["All", "Popular", "Blood Tests", "Hormone Tests", "Heart Health", "Health Packages", "Diabetes"]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"])
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [fastingRequired, setFastingRequired] = useState(false)
  const [filteredTests, setFilteredTests] = useState(mockTests)
  const [showMoreTests, setShowMoreTests] = useState(false)
  const [showMorePackages, setShowMorePackages] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  useEffect(() => {
    let filtered = mockTests

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (test) =>
          test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (test.type === "package" && test.tests?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))),
      )
    }

    // Filter by categories
    if (!selectedCategories.includes("All")) {
      if (selectedCategories.includes("Popular")) {
        filtered = filtered.filter((test) => test.popular)
      } else {
        filtered = filtered.filter((test) => selectedCategories.includes(test.category))
      }
    }

    // Filter by price range
    filtered = filtered.filter((test) => test.price >= priceRange[0] && test.price <= priceRange[1])

    // Filter by fasting requirement
    if (fastingRequired) {
      filtered = filtered.filter((test) => test.fastingTime > 0)
    }

    setFilteredTests(filtered)
  }, [searchQuery, selectedCategories, priceRange, fastingRequired])

  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      setSelectedCategories(["All"])
    } else {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories.filter((c) => c !== "All"), category]

      setSelectedCategories(newCategories.length === 0 ? ["All"] : newCategories)
    }
  }

  const handleSearchClick = () => {
    setIsSearchModalOpen(true)
  }

  const handleAddToCart = (item) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      type: item.type,
      price: item.price,
      originalPrice: item.originalPrice,
      discount: item.discount,
      patients: [1], // Default to self
    }
    dispatch(addToCart(cartItem))
    console.log("Added to cart:", item.name)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Search Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search for tests, packages, or health conditions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={handleSearchClick}
                    className="pl-10 border-blue-200 focus:border-blue-400 cursor-pointer"
                    readOnly
                  />
                </div>
              </div>
              <Button variant="outline" className="md:w-auto border-blue-200 hover:bg-blue-50 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-blue-100">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Filters</h3>

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Categories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <label htmlFor={category} className="text-sm cursor-pointer">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="px-2">
                      <Slider value={priceRange} onValueChange={setPriceRange} max={2000} step={50} className="mb-2" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fasting Required */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="fasting" checked={fastingRequired} onCheckedChange={setFastingRequired} />
                      <label htmlFor="fasting" className="text-sm cursor-pointer">
                        Fasting Required
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search Results */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Search Results ({filteredTests.length})</h2>
                {searchQuery && <p className="text-gray-600 mt-1">Showing results for "{searchQuery}"</p>}
              </div>

              {/* Individual Tests Section */}
              {filteredTests.filter((item) => item.type === "test").length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Individual Tests</h3>
                  <div className="space-y-4">
                    {filteredTests
                      .filter((item) => item.type === "test")
                      .slice(0, showMoreTests ? undefined : 4)
                      .map((item) => (
                        <Card key={item.id} className="hover:shadow-md transition-shadow border-blue-100">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-xl font-semibold">{item.name}</h3>
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                    Test
                                  </Badge>
                                  {item.popular && <Badge className="bg-orange-500">Popular</Badge>}
                                  <Badge className="bg-red-500 text-white">{item.discount}% OFF</Badge>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                  {item.fastingTime > 0 && (
                                    <div className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      {item.fastingTime}h fasting
                                    </div>
                                  )}
                                  {item.sampleType && (
                                    <div className="flex items-center">
                                      <TestTube className="w-4 h-4 mr-1" />
                                      {item.sampleType}
                                    </div>
                                  )}
                                  <div className="flex items-center">
                                    <IndianRupee className="w-4 h-4 mr-1 text-green-600" />
                                    <span className="font-semibold text-green-600">{item.price}</span>
                                    <span className="line-through text-gray-500 ml-2">₹{item.originalPrice}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
                                <Link href={`/test/${item.id}`}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                                  >
                                    View Details
                                  </Button>
                                </Link>
                                <Link href={`/book?test=${item.id}`}>
                                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    Book Now
                                  </Button>
                                </Link>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleAddToCart(item)}
                                  className="border-gray-200 text-gray-600 hover:bg-gray-50"
                                >
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>

                  {filteredTests.filter((item) => item.type === "test").length > 4 && (
                    <div className="text-center mt-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowMoreTests(!showMoreTests)}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        {showMoreTests
                          ? "Show Less Tests"
                          : `Show More Tests (${filteredTests.filter((item) => item.type === "test").length - 4} more)`}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Health Packages Section */}
              {filteredTests.filter((item) => item.type === "package").length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Packages</h3>
                  <div className="space-y-4">
                    {filteredTests
                      .filter((item) => item.type === "package")
                      .slice(0, showMorePackages ? undefined : 4)
                      .map((item) => (
                        <Card key={item.id} className="hover:shadow-md transition-shadow border-green-100">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-xl font-semibold">{item.name}</h3>
                                  <Badge className="bg-green-100 text-green-700">Package</Badge>
                                  {item.popular && <Badge className="bg-orange-500">Popular</Badge>}
                                  <Badge className="bg-red-500 text-white">{item.discount}% OFF</Badge>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                  {item.fastingTime > 0 && (
                                    <div className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      {item.fastingTime}h fasting
                                    </div>
                                  )}
                                  <div className="flex items-center">
                                    <IndianRupee className="w-4 h-4 mr-1 text-green-600" />
                                    <span className="font-semibold text-green-600">{item.price}</span>
                                    <span className="line-through text-gray-500 ml-2">₹{item.originalPrice}</span>
                                  </div>
                                </div>

                                {item.tests && (
                                  <div className="mb-3">
                                    <p className="text-sm text-gray-600 mb-1">Includes ({item.tests.length} tests):</p>
                                    <div className="flex flex-wrap gap-1">
                                      {item.tests.slice(0, 3).map((test, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs border-green-200">
                                          {test}
                                        </Badge>
                                      ))}
                                      {item.tests.length > 3 && (
                                        <Badge variant="outline" className="text-xs border-green-200">
                                          +{item.tests.length - 3} more
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
                                <Link href={`/package/${item.id}`}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                                  >
                                    View Details
                                  </Button>
                                </Link>
                                <Link href={`/book?package=${item.id}`}>
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                    Book Now
                                  </Button>
                                </Link>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleAddToCart(item)}
                                  className="border-gray-200 text-gray-600 hover:bg-gray-50"
                                >
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>

                  {filteredTests.filter((item) => item.type === "package").length > 4 && (
                    <div className="text-center mt-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowMorePackages(!showMorePackages)}
                        className="border-green-200 text-green-600 hover:bg-green-50"
                      >
                        {showMorePackages
                          ? "Show Less Packages"
                          : `Show More Packages (${filteredTests.filter((item) => item.type === "package").length - 4} more)`}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {filteredTests.length === 0 && (
                <div className="text-center py-12">
                  <TestTube className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <SearchModal open={isSearchModalOpen} onOpenChange={setIsSearchModalOpen} />
    </>
  )
}
