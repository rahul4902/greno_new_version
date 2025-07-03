"use client"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Clock, TestTube, DollarSign, Calendar, AlertCircle, CheckCircle, List } from "lucide-react"

const mockPackageData = {
  1: {
    id: 1,
    name: "Complete Health Checkup",
    price: 299,
    fastingTime: 12,
    availableSlots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
    idealFor: ["Annual health screening", "Preventive care", "Overall health assessment"],
    whenToTake: ["Once a year", "Before starting new fitness routine", "After age 40"],
    avoidIf: ["Recent illness", "Taking multiple medications without consultation"],
    tests: [
      {
        name: "Complete Blood Count (CBC)",
        parameters: ["Hemoglobin", "White Blood Cells", "Red Blood Cells", "Platelets"],
      },
      {
        name: "Lipid Profile",
        parameters: ["Total Cholesterol", "HDL", "LDL", "Triglycerides"],
      },
      {
        name: "Liver Function Test",
        parameters: ["ALT", "AST", "Bilirubin", "Alkaline Phosphatase"],
      },
      {
        name: "Kidney Function Test",
        parameters: ["Creatinine", "BUN", "Uric Acid"],
      },
      {
        name: "Thyroid Function Test",
        parameters: ["TSH", "T3", "T4"],
      },
    ],
    faqs: [
      { question: "How long do I need to fast?", answer: "12 hours fasting is required for accurate results." },
      { question: "How long does the entire process take?", answer: "Sample collection takes about 30-45 minutes." },
      { question: "When will I get all results?", answer: "Complete results are available within 48 hours." },
    ],
    howToUse: [
      "Book your complete health checkup online",
      "Fast for 12 hours before sample collection",
      "Visit our lab or opt for home collection",
      "All samples will be collected in one visit",
      "Comprehensive report available within 48 hours",
    ],
  },
}

export default function PackageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const packageId = Number.parseInt(params.id as string)
  const packageData = mockPackageData[packageId as keyof typeof mockPackageData]

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  const handleBookNow = () => {
    router.push(`/book?package=${packageId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{packageData.name}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              {packageData.fastingTime}h fasting required
            </div>
            <div className="flex items-center text-gray-600">
              <TestTube className="w-5 h-5 mr-2" />
              {packageData.tests.length} tests included
            </div>
            <div className="flex items-center text-green-600 font-semibold">
              <DollarSign className="w-5 h-5 mr-1" />${packageData.price}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Available Time Slots</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {packageData.availableSlots.map((slot) => (
                  <Badge key={slot} variant="outline">
                    {slot}
                  </Badge>
                ))}
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mb-4">
                    <List className="w-4 h-4 mr-2" />
                    See All Parameters
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Complete Test Parameters</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {packageData.tests.map((test, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">{test.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {test.parameters.map((param, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {param}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="lg:w-auto">
              <Button onClick={handleBookNow} size="lg" className="w-full lg:w-auto">
                Book Now
              </Button>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Ideal For
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {packageData.idealFor.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                When to Take
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {packageData.whenToTake.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                Avoid If
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {packageData.avoidIf.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Tests Included */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Tests Included</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packageData.tests.map((test, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">{test.name}</h4>
                  <div className="flex flex-wrap gap-1">
                    {test.parameters.slice(0, 3).map((param, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {param}
                      </Badge>
                    ))}
                    {test.parameters.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{test.parameters.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {packageData.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* How to Use */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use This Package</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {packageData.howToUse.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
