"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, Search, Calendar, User } from "lucide-react"

const mockReports = [
  {
    id: "RPT001",
    patientName: "Rajesh Kumar",
    testName: "Complete Blood Count (CBC)",
    date: "2024-01-15",
    type: "PDF",
    status: "Ready",
    bookingId: "HLP001",
  },
  {
    id: "RPT002",
    patientName: "Priya Sharma",
    testName: "Thyroid Function Test",
    date: "2024-01-10",
    type: "PDF",
    status: "Ready",
    bookingId: "HLP002",
  },
  {
    id: "RPT003",
    patientName: "Anita Patel",
    testName: "Lipid Profile",
    date: "2024-01-05",
    type: "PDF",
    status: "Ready",
    bookingId: "HLP003",
  },
  {
    id: "RPT004",
    patientName: "Rajesh Kumar",
    testName: "Diabetes Panel",
    date: "2023-12-28",
    type: "PDF",
    status: "Ready",
    bookingId: "HLP004",
  },
  {
    id: "RPT005",
    patientName: "Sunita Devi",
    testName: "Complete Health Checkup",
    date: "2023-12-20",
    type: "PDF",
    status: "Ready",
    bookingId: "HLP005",
  },
]

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredReports, setFilteredReports] = useState(mockReports)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredReports(mockReports)
    } else {
      const filtered = mockReports.filter(
        (report) =>
          report.patientName.toLowerCase().includes(query.toLowerCase()) ||
          report.testName.toLowerCase().includes(query.toLowerCase()) ||
          report.id.toLowerCase().includes(query.toLowerCase()) ||
          report.bookingId.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredReports(filtered)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Reports & Results</h1>
          <p className="text-gray-600">View and download your medical test reports</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 border-blue-100">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by patient name, test name, report ID, or booking ID..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 border-blue-200 focus:border-blue-400"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow border-blue-100">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{report.testName}</h3>
                        <Badge className="bg-green-500 text-white">{report.status}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Patient: {report.patientName}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Date: {report.date}
                      </div>
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Report ID: {report.id}
                      </div>
                    </div>

                    <div className="mt-2 text-sm text-gray-500">
                      Booking ID: {report.bookingId} • Type: {report.type}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0">
                    <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                      <Eye className="w-4 h-4 mr-1" />
                      View Report
                    </Button>
                    <Button variant="outline" size="sm" className="border-green-200 text-green-600 hover:bg-green-50">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">
              {searchQuery ? `No reports match "${searchQuery}"` : "You don't have any reports yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
