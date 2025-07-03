"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  CheckCircle,
  Calendar,
  IndianRupee,
  Clock,
  TestTube,
  MapPin,
  Navigation,
  Home,
  Briefcase,
  MoreHorizontal,
  Users,
  Plus,
  Trash2,
  User,
} from "lucide-react"

export default function BookingWizard() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState("")

  const testId = searchParams.get("test")
  const packageId = searchParams.get("package")

  // Mock test/package data with Indian pricing
  const selectedTest = testId
    ? {
        id: testId,
        name: "Complete Blood Count (CBC)",
        originalPrice: 399,
        price: 299,
        discount: 25,
        type: "test",
        fastingTime: 0,
        sampleType: "Blood",
      }
    : null

  const selectedPackage = packageId
    ? {
        id: packageId,
        name: "Complete Health Checkup",
        originalPrice: 1299,
        price: 999,
        discount: 23,
        tests: ["CBC", "Lipid Profile", "Liver Function", "Kidney Function", "Thyroid", "Diabetes Panel"],
        type: "package",
        fastingTime: 12,
      }
    : null

  const selectedItem = selectedTest || selectedPackage

  // Patient Management
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      age: 35,
      gender: "Male",
      relation: "Self",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@email.com",
    },
    {
      id: 2,
      name: "Priya Sharma",
      age: 32,
      gender: "Female",
      relation: "Spouse",
      phone: "+91 98765 43211",
      email: "priya.sharma@email.com",
    },
    {
      id: 3,
      name: "Arjun Kumar",
      age: 8,
      gender: "Male",
      relation: "Son",
      phone: "",
      email: "",
    },
  ])

  const [selectedPatients, setSelectedPatients] = useState([1]) // Default to self
  const [showAddPatient, setShowAddPatient] = useState(false)
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    relation: "",
    phone: "",
    email: "",
  })

  const [addressData, setAddressData] = useState({
    type: "Home",
    buildingNo: "",
    floor: "",
    buildingName: "",
    area: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    companyName: "",
    coordinates: null,
    fullAddress: "",
  })

  const [timeSlot, setTimeSlot] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  const addressTypes = [
    { value: "Home", label: "Home", icon: <Home className="w-4 h-4" /> },
    { value: "Work", label: "Work", icon: <Briefcase className="w-4 h-4" /> },
    { value: "Other", label: "Other", icon: <MoreHorizontal className="w-4 h-4" /> },
  ]

  const timeSlots = [
    "6:00 AM - 8:00 AM",
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM",
  ]

  const getCurrentLocation = () => {
    setIsLoadingLocation(true)
    setLocationError("")

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser")
      setIsLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          // Using a reverse geocoding service (you can replace with your preferred service)
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          )
          const data = await response.json()

          setAddressData((prev) => ({
            ...prev,
            coordinates: { latitude, longitude },
            area: data.locality || data.city || "",
            city: data.city || "",
            state: data.principalSubdivision || "",
            pincode: data.postcode || "",
            fullAddress: data.display_name || `${latitude}, ${longitude}`,
          }))
        } catch (error) {
          console.error("Error fetching address:", error)
          setAddressData((prev) => ({
            ...prev,
            coordinates: { latitude, longitude },
            fullAddress: `${latitude}, ${longitude}`,
          }))
        }

        setIsLoadingLocation(false)
      },
      (error) => {
        setLocationError("Unable to retrieve your location. Please enter address manually.")
        setIsLoadingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }

  const handlePatientSelection = (patientId) => {
    setSelectedPatients((prev) =>
      prev.includes(patientId) ? prev.filter((id) => id !== patientId) : [...prev, patientId],
    )
  }

  const handleAddPatient = () => {
    if (newPatient.name && newPatient.age && newPatient.gender && newPatient.relation) {
      const patient = {
        id: Date.now(),
        ...newPatient,
        age: Number.parseInt(newPatient.age) || 0,
      }
      setPatients([...patients, patient])
      setNewPatient({
        name: "",
        age: "",
        gender: "",
        relation: "",
        phone: "",
        email: "",
      })
      setShowAddPatient(false)
    }
  }

  const handleRemovePatient = (patientId) => {
    if (patientId === 1) return // Can't remove self
    setPatients(patients.filter((p) => p.id !== patientId))
    setSelectedPatients(selectedPatients.filter((id) => id !== patientId))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleConfirmBooking = () => {
    const bookingId = "HLP" + Math.random().toString(36).substr(2, 9).toUpperCase()
    router.push(`/booking-success?id=${bookingId}`)
  }

  const calculateTotalPrice = () => {
    return selectedItem.price * selectedPatients.length
  }

  if (!selectedItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Test Selected</h1>
          <Button onClick={() => router.push("/search")} className="bg-blue-600 hover:bg-blue-700">
            Browse Tests
          </Button>
        </div>
      </div>
    )
  }

  const steps = [
    { number: 1, title: "Test Summary", icon: Calendar },
    { number: 2, title: "Select Patients", icon: Users },
    { number: 3, title: "Address & Time", icon: MapPin },
    { number: 4, title: "Confirmation", icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step.number <= currentStep
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-400 border-2 border-gray-200"
                  }`}
                >
                  {step.number < currentStep ? <CheckCircle className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 transition-all ${
                      step.number < currentStep ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-sm">
            {steps.map((step) => (
              <span
                key={step.number}
                className={`font-medium ${step.number <= currentStep ? "text-blue-600" : "text-gray-500"}`}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step 1: Test Summary */}
        {currentStep === 1 && (
          <Card className="border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center text-blue-700">
                <Calendar className="w-5 h-5 mr-2" />
                Test Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="border border-blue-100 rounded-lg p-6 bg-gradient-to-r from-white to-blue-50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">{selectedItem.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-blue-100 text-blue-700">
                        {selectedItem.type === "package" ? "Package" : "Test"}
                      </Badge>
                      <Badge className="bg-red-500 text-white">{selectedItem.discount}% OFF</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-3xl font-bold text-green-600 mb-1">
                      <IndianRupee className="w-6 h-6 mr-1" />
                      {selectedItem.price}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      <span className="line-through">{selectedItem.originalPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    {selectedItem.fastingTime > 0
                      ? `${selectedItem.fastingTime}h fasting required`
                      : "No fasting required"}
                  </div>
                  {selectedItem.sampleType && (
                    <div className="flex items-center text-gray-600">
                      <TestTube className="w-5 h-5 mr-2" />
                      {selectedItem.sampleType} sample
                    </div>
                  )}
                </div>

                {selectedItem.type === "package" && "tests" in selectedItem && (
                  <div>
                    <p className="font-medium mb-3">Package includes ({selectedItem.tests.length} tests):</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {selectedItem.tests.map((test, index) => (
                        <Badge key={index} variant="outline" className="border-blue-200 text-blue-700">
                          {test}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 px-8">
                  Continue to Patient Selection
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Patient Selection */}
        {currentStep === 2 && (
          <Card className="border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center text-blue-700">
                <Users className="w-5 h-5 mr-2" />
                Select Patients
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Who is this test for?</h3>
                <p className="text-blue-700 text-sm">
                  Select one or more patients for this test. Price will be calculated per patient.
                </p>
              </div>

              {/* Patient List */}
              <div className="space-y-4">
                {patients.map((patient) => (
                  <Card
                    key={patient.id}
                    className={`cursor-pointer transition-all border-2 ${
                      selectedPatients.includes(patient.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => handlePatientSelection(patient.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Checkbox
                            checked={selectedPatients.includes(patient.id)}
                            onChange={() => handlePatientSelection(patient.id)}
                          />
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-lg">{patient.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{patient.age} years</span>
                              <span>{patient.gender}</span>
                              <span>{patient.relation}</span>
                            </div>
                            {patient.phone && <p className="text-sm text-gray-500">{patient.phone}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="flex items-center text-green-600 font-semibold">
                              <IndianRupee className="w-4 h-4 mr-1" />
                              {selectedItem.price}
                            </div>
                          </div>
                          {patient.id !== 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRemovePatient(patient.id)
                              }}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Add New Patient */}
              {!showAddPatient ? (
                <Button
                  variant="outline"
                  onClick={() => setShowAddPatient(true)}
                  className="w-full border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Family Member
                </Button>
              ) : (
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800">Add New Patient</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="patientName">Full Name *</Label>
                        <Input
                          id="patientName"
                          value={newPatient.name}
                          onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                          placeholder="Enter full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="patientAge">Age *</Label>
                        <Input
                          id="patientAge"
                          type="number"
                          value={newPatient.age}
                          onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                          placeholder="Enter age"
                        />
                      </div>
                      <div>
                        <Label htmlFor="patientGender">Gender *</Label>
                        <select
                          id="patientGender"
                          value={newPatient.gender}
                          onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="patientRelation">Relation *</Label>
                        <Input
                          id="patientRelation"
                          value={newPatient.relation}
                          onChange={(e) => setNewPatient({ ...newPatient, relation: e.target.value })}
                          placeholder="e.g., Spouse, Child, Parent"
                        />
                      </div>
                      <div>
                        <Label htmlFor="patientPhone">Phone (Optional)</Label>
                        <Input
                          id="patientPhone"
                          value={newPatient.phone}
                          onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                          placeholder="Phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="patientEmail">Email (Optional)</Label>
                        <Input
                          id="patientEmail"
                          type="email"
                          value={newPatient.email}
                          onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                          placeholder="Email address"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddPatient} className="bg-green-600 hover:bg-green-700">
                        Add Patient
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddPatient(false)} className="bg-transparent">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Price Summary */}
              {selectedPatients.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-green-800">Total Price</h4>
                      <p className="text-green-700 text-sm">
                        {selectedPatients.length} patient(s) × ₹{selectedItem.price}
                      </p>
                    </div>
                    <div className="flex items-center text-2xl font-bold text-green-600">
                      <IndianRupee className="w-6 h-6 mr-1" />
                      {calculateTotalPrice()}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious} className="border-blue-200 bg-transparent">
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={selectedPatients.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 px-8"
                >
                  Continue to Address
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Address & Time */}
        {currentStep === 3 && (
          <Card className="border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center text-blue-700">
                <MapPin className="w-5 h-5 mr-2" />
                Address & Time Slot
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Current Location */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-blue-800">Use Current Location</h3>
                  <Button
                    onClick={getCurrentLocation}
                    disabled={isLoadingLocation}
                    className="bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    {isLoadingLocation ? "Getting Location..." : "Get Location"}
                  </Button>
                </div>
                {locationError && <p className="text-red-600 text-sm">{locationError}</p>}
                {addressData.fullAddress && <p className="text-blue-700 text-sm">{addressData.fullAddress}</p>}
              </div>

              {/* Address Type */}
              <div>
                <Label className="text-base font-medium mb-3 block">Address Type</Label>
                <div className="grid grid-cols-3 gap-3">
                  {addressTypes.map((type) => (
                    <Button
                      key={type.value}
                      variant={addressData.type === type.value ? "default" : "outline"}
                      onClick={() => setAddressData((prev) => ({ ...prev, type: type.value }))}
                      className="flex items-center justify-center gap-2 h-12"
                    >
                      {type.icon}
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Address Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="buildingNo">Building/House No. *</Label>
                  <Input
                    id="buildingNo"
                    value={addressData.buildingNo}
                    onChange={(e) => setAddressData((prev) => ({ ...prev, buildingNo: e.target.value }))}
                    placeholder="Enter building/house number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="floor">Floor (Optional)</Label>
                  <Input
                    id="floor"
                    value={addressData.floor}
                    onChange={(e) => setAddressData((prev) => ({ ...prev, floor: e.target.value }))}
                    placeholder="Floor number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="buildingName">Building Name</Label>
                  <Input
                    id="buildingName"
                    value={addressData.buildingName}
                    onChange={(e) => setAddressData((prev) => ({ ...prev, buildingName: e.target.value }))}
                    placeholder="Building/Society name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="area">Area/Locality *</Label>
                  <Input
                    id="area"
                    value={addressData.area}
                    onChange={(e) => setAddressData((prev) => ({ ...prev, area: e.target.value }))}
                    placeholder="Area or locality"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="landmark">Landmark</Label>
                  <Input
                    id="landmark"
                    value={addressData.landmark}
                    onChange={(e) => setAddressData((prev) => ({ ...prev, landmark: e.target.value }))}
                    placeholder="Nearby landmark"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={addressData.pincode}
                    onChange={(e) => setAddressData((prev) => ({ ...prev, pincode: e.target.value }))}
                    placeholder="6-digit pincode"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={addressData.city}
                    onChange={(e) => setAddressData((prev) => ({ ...prev, city: e.target.value }))}
                    placeholder="City name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={addressData.state}
                    onChange={(e) => setAddressData((prev) => ({ ...prev, state: e.target.value }))}
                    placeholder="State name"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Company Name for Work Address */}
              {addressData.type === "Work" && (
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={addressData.companyName}
                    onChange={(e) => setAddressData((prev) => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Company/Organization name"
                    className="mt-1"
                  />
                </div>
              )}

              {/* Date Selection */}
              <div>
                <Label htmlFor="date" className="text-base font-medium">
                  Preferred Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="mt-1"
                />
              </div>

              {/* Time Slot Selection */}
              <div>
                <Label className="text-base font-medium mb-3 block">Preferred Time Slot *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={timeSlot === slot ? "default" : "outline"}
                      onClick={() => setTimeSlot(slot)}
                      className="h-12 text-sm"
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious} className="border-blue-200 bg-transparent">
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={
                    !addressData.buildingNo ||
                    !addressData.area ||
                    !addressData.pincode ||
                    !addressData.city ||
                    !addressData.state ||
                    !selectedDate ||
                    !timeSlot
                  }
                  className="bg-blue-600 hover:bg-blue-700 px-8"
                >
                  Continue to Confirmation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <Card className="border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center text-blue-700">
                <CheckCircle className="w-5 h-5 mr-2" />
                Booking Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Test Summary */}
              <div className="border border-blue-100 rounded-lg p-4 bg-blue-50">
                <h3 className="font-semibold mb-2">Test Details</h3>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{selectedItem.name}</span>
                  <div className="flex items-center text-green-600 font-semibold">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {selectedItem.price} × {selectedPatients.length}
                  </div>
                </div>
              </div>

              {/* Patient Summary */}
              <div className="border border-green-100 rounded-lg p-4 bg-green-50">
                <h3 className="font-semibold mb-2">Selected Patients ({selectedPatients.length})</h3>
                <div className="space-y-2">
                  {selectedPatients.map((patientId) => {
                    const patient = patients.find((p) => p.id === patientId)
                    return (
                      <div key={patientId} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-green-600" />
                          <span>
                            {patient?.name} ({patient?.age}y, {patient?.relation})
                          </span>
                        </div>
                        <div className="flex items-center text-green-600 font-medium">
                          <IndianRupee className="w-3 h-3 mr-1" />
                          {selectedItem.price}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Address Summary */}
              <div className="border border-purple-100 rounded-lg p-4 bg-purple-50">
                <h3 className="font-semibold mb-2">Collection Address</h3>
                <div className="text-sm text-gray-700">
                  <p className="font-medium">{addressData.type} Address</p>
                  {addressData.companyName && <p>{addressData.companyName}</p>}
                  <p>
                    {addressData.buildingNo} {addressData.buildingName}
                  </p>
                  {addressData.floor && <p>Floor: {addressData.floor}</p>}
                  <p>
                    {addressData.area}, {addressData.city}
                  </p>
                  <p>
                    {addressData.state} - {addressData.pincode}
                  </p>
                  {addressData.landmark && <p>Near: {addressData.landmark}</p>}
                </div>
              </div>

              {/* Time Summary */}
              <div className="border border-orange-100 rounded-lg p-4 bg-orange-50">
                <h3 className="font-semibold mb-2">Collection Schedule</h3>
                <div className="text-sm text-gray-700">
                  <p>
                    <strong>Date:</strong> {selectedDate}
                  </p>
                  <p>
                    <strong>Time:</strong> {timeSlot}
                  </p>
                </div>
              </div>

              {/* Total Price */}
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-green-800">Total Amount</h3>
                    <p className="text-green-700 text-sm">
                      {selectedPatients.length} patient(s) × ₹{selectedItem.price}
                    </p>
                  </div>
                  <div className="flex items-center text-3xl font-bold text-green-600">
                    <IndianRupee className="w-8 h-8 mr-1" />
                    {calculateTotalPrice()}
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Our phlebotomist will arrive at your specified address</li>
                  <li>• Please ensure someone is available at the given time</li>
                  {selectedItem.fastingTime > 0 && <li>• Fasting of {selectedItem.fastingTime} hours is required</li>}
                  <li>• You will receive SMS and email confirmations</li>
                  <li>• Reports will be available within 24-48 hours</li>
                  <li>• All selected patients will be tested during the same visit</li>
                </ul>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious} className="border-blue-200 bg-transparent">
                  Previous
                </Button>
                <Button onClick={handleConfirmBooking} className="bg-green-600 hover:bg-green-700 px-8">
                  Confirm Booking & Pay ₹{calculateTotalPrice()}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
