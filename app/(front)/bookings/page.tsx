"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Download, Eye, Clock } from "lucide-react"

const mockBookings = [
  {
    id: "HLP001",
    testName: "Complete Blood Count (CBC)",
    bookingDate: "2024-01-20",
    sampleDate: "2024-01-22",
    status: "Report Available",
    price: 45,
    patients: ["John Doe"],
  },
  {
    id: "HLP002",
    testName: "Complete Health Checkup",
    bookingDate: "2024-01-18",
    sampleDate: "2024-01-20",
    status: "Sample Pending",
    price: 299,
    patients: ["John Doe", "Jane Doe"],
  },
  {
    id: "HLP003",
    testName: "Thyroid Function Test",
    bookingDate: "2024-01-15",
    sampleDate: "2024-01-17",
    status: "Completed",
    price: 89,
    patients: ["Jane Doe"],
  },
  {
    id: "HLP004",
    testName: "Diabetes Panel",
    bookingDate: "2024-01-10",
    sampleDate: "2024-01-12",
    status: "Report Available",
    price: 89,
    patients: ["John Doe"],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Report Available":
      return "bg-green-500"
    case "Sample Pending":
      return "bg-yellow-500"
    case "Completed":
      return "bg-blue-500"
    default:
      return "bg-gray-500"
  }
}

export default function BookingHistoryPage() {
  const [filter, setFilter] = useState("all")

  const filteredBookings = mockBookings.filter((booking) => {
    if (filter === "all") return true
    return booking.status.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Bookings</h1>
          <p className="text-gray-600">Track your test bookings and download reports</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} size="sm">
            All Bookings
          </Button>
          <Button variant={filter === "pending" ? "default" : "outline"} onClick={() => setFilter("pending")} size="sm">
            Sample Pending
          </Button>
          <Button
            variant={filter === "available" ? "default" : "outline"}
            onClick={() => setFilter("available")}
            size="sm"
          >
            Report Available
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
            size="sm"
          >
            Completed
          </Button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold">{booking.testName}</h3>
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Booking ID: {booking.id}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Sample Date: {booking.sampleDate}
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Price: ${booking.price}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="text-sm text-gray-600">Patients: </span>
                      <span className="text-sm font-medium">{booking.patients.join(", ")}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0">
                    {booking.status === "Report Available" && (
                      <>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Report
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </>
                    )}
                    {booking.status === "Sample Pending" && (
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Reschedule
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-4">
              {filter === "all" ? "You haven't made any bookings yet" : `No bookings with status "${filter}"`}
            </p>
            <Button onClick={() => (window.location.href = "/search")}>Book a Test</Button>
          </div>
        )}
      </div>
    </div>
  )
}
