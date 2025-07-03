"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Calendar, Phone, Mail, Download, Star } from "lucide-react"
import Link from "next/link"

export default function BookingSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const bookingId = searchParams.get("id")

  if (!bookingId) {
    router.push("/")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center border-blue-100 shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>

            <p className="text-base md:text-lg text-gray-600 mb-6">
              Your test has been successfully booked. Here are your booking details:
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 md:p-6 mb-6 border border-blue-200">
              <div className="text-xl md:text-2xl font-bold text-blue-600 mb-2">Booking ID: {bookingId}</div>
              <p className="text-sm md:text-base text-gray-600">Please save this booking ID for future reference</p>
            </div>

            <div className="space-y-4 mb-8 text-left">
              <h3 className="font-semibold text-lg text-center mb-4">What happens next?</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 flex-shrink-0">
                    1
                  </div>
                  <p className="text-sm md:text-base text-gray-700">
                    You will receive a confirmation email with detailed instructions
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 flex-shrink-0">
                    2
                  </div>
                  <p className="text-sm md:text-base text-gray-700">
                    Our team will contact you within 2 hours to schedule the appointment
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 flex-shrink-0">
                    3
                  </div>
                  <p className="text-sm md:text-base text-gray-700">
                    Sample collection will be done at your preferred time and location
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 flex-shrink-0">
                    4
                  </div>
                  <p className="text-sm md:text-base text-gray-700">
                    Results will be available in your account within 24-48 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-blue-200 pt-6 space-y-4">
              <h3 className="font-semibold text-base md:text-lg">Need Help?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm md:text-base">
                <div className="flex items-center text-gray-600 justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center text-gray-600 justify-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>support@healthlabpro.com</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/bookings" className="flex-1">
                <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                  <Calendar className="w-4 h-4 mr-2" />
                  View My Bookings
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Back to Home</Button>
              </Link>
            </div>

            {/* Download App Suggestion */}
            <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-center mb-2">
                <Download className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-700">Download Our App</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Get faster access to your reports and book tests on the go!</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button size="sm" variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                  <Star className="w-4 h-4 mr-1" />
                  Play Store
                </Button>
                <Button size="sm" variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                  <Star className="w-4 h-4 mr-1" />
                  App Store
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
