"use client"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Clock, TestTube, IndianRupee, X, HelpCircle, ShoppingCart, Sparkles, Info, AlertCircle } from "lucide-react"
import { useState } from "react"
import { addToCart } from "@/lib/features/cart/cartSlice"
import { useDispatch } from "react-redux"

interface TestParameter {
  name: string
  normalRange: string
  description: string
  unit?: string
  significance?: string
}

interface TestCriteria {
  question: string
  answer: string
}

interface TestData {
  id: number
  name: string
  originalPrice: number
  price: number
  vipPrice: number
  discount: number
  fastingTime: number
  sampleType: string
  reportTime: string
  parameterCount: number
  description: string
  alsoKnownAs: string[]
  savings: number
  additionalInstructions: string
  testCriteria: TestCriteria[]
  parameters: TestParameter[]
  preparation: string[]
  whenToTake: string[]
  avoidIf: string[]
  category: string
  methodology: string
  clinicalSignificance: string
}

const mockTestData: Record<number, TestData> = {
  1: {
    id: 1,
    name: "Complete Blood Count (CBC)",
    originalPrice: 399,
    price: 299,
    vipPrice: 269,
    discount: 25,
    fastingTime: 0,
    sampleType: "Blood",
    reportTime: "6 hours",
    parameterCount: 26,
    category: "Blood Tests",
    methodology: "Flow Cytometry",
    description:
      "A comprehensive blood test that evaluates overall health and detects various disorders including anemia, infection, and leukemia.",
    alsoKnownAs: ["Full Blood Count", "FBC", "Blood Count", "Hemogram", "Complete Blood Panel"],
    savings: 100,
    clinicalSignificance:
      "CBC is one of the most commonly ordered blood tests and provides valuable information about blood cells and overall health status.",
    additionalInstructions:
      "No special preparation required. Stay hydrated and wear loose-fitting clothing for easy blood collection. Inform your healthcare provider about any medications you're taking.",
    preparation: [
      "No fasting required",
      "Stay well hydrated before the test",
      "Wear loose-fitting clothing with sleeves that can be easily rolled up",
      "Inform about any medications or supplements you're taking",
      "Avoid strenuous exercise 24 hours before the test",
    ],
    whenToTake: [
      "Annual health checkups",
      "Before surgery or medical procedures",
      "When experiencing fatigue or weakness",
      "To monitor ongoing medical conditions",
      "When symptoms suggest blood disorders",
    ],
    avoidIf: [
      "Recent blood transfusion (wait 3 months)",
      "Active bleeding or clotting disorders without medical supervision",
      "Severe dehydration (rehydrate first)",
      "Recent chemotherapy (consult oncologist)",
    ],
    testCriteria: [
      {
        question: "Who should take this test?",
        answer:
          "Anyone above 12 years can take this test. It's recommended for routine health checkups, pre-surgical evaluations, and when experiencing symptoms like fatigue, weakness, or frequent infections.",
      },
      {
        question: "How often should I get a CBC test?",
        answer:
          "For healthy adults, once a year during routine checkups. For those with chronic conditions, frequency may vary from monthly to quarterly as advised by healthcare providers.",
      },
      {
        question: "What conditions can this test detect?",
        answer:
          "CBC can help detect anemia, infections, blood cancers, immune system disorders, and monitor the effects of medications or treatments on blood cells.",
      },
      {
        question: "Are there any risks involved?",
        answer:
          "CBC is a very safe test with minimal risks. Some people may experience slight bruising or soreness at the needle site, which typically resolves within a day.",
      },
    ],
    parameters: [
      {
        name: "Hemoglobin (Hb)",
        normalRange: "12.0-15.5 g/dL (Women), 13.5-17.5 g/dL (Men)",
        description: "Protein in red blood cells that carries oxygen",
        unit: "g/dL",
        significance: "Low levels indicate anemia, high levels may suggest dehydration or lung disease",
      },
      {
        name: "Red Blood Cell Count (RBC)",
        normalRange: "4.0-5.2 million/μL (Women), 4.5-5.9 million/μL (Men)",
        description: "Number of red blood cells per microliter",
        unit: "million/μL",
        significance: "Indicates oxygen-carrying capacity of blood",
      },
      {
        name: "White Blood Cell Count (WBC)",
        normalRange: "4,000-11,000 cells/μL",
        description: "Number of white blood cells that fight infection",
        unit: "cells/μL",
        significance: "High levels suggest infection or inflammation, low levels may indicate immune system problems",
      },
      {
        name: "Platelet Count",
        normalRange: "150,000-450,000 platelets/μL",
        description: "Blood cells responsible for clotting",
        unit: "platelets/μL",
        significance: "Low levels increase bleeding risk, high levels may increase clotting risk",
      },
      {
        name: "Hematocrit (Hct)",
        normalRange: "36-46% (Women), 41-50% (Men)",
        description: "Percentage of blood volume occupied by red blood cells",
        unit: "%",
        significance: "Reflects red blood cell concentration in blood",
      },
      {
        name: "Mean Corpuscular Volume (MCV)",
        normalRange: "80-100 fL",
        description: "Average size of red blood cells",
        unit: "fL",
        significance: "Helps classify types of anemia",
      },
    ],
  },
  2: {
    id: 2,
    name: "Kidney Function Test (KFT)",
    originalPrice: 1560,
    price: 349,
    vipPrice: 314,
    discount: 77,
    fastingTime: 0,
    sampleType: "Blood",
    reportTime: "10 hours",
    parameterCount: 12,
    category: "Kidney Health",
    methodology: "Spectrophotometry",
    description:
      "Comprehensive evaluation of kidney function through multiple blood parameters to assess filtration capacity and detect kidney disease.",
    alsoKnownAs: ["Renal Profile", "Kidney Profile", "RFT", "KFT", "Renal Function Test", "Kidney Panel"],
    savings: 1211,
    clinicalSignificance:
      "Essential for early detection of kidney disease, monitoring chronic kidney disease progression, and assessing kidney function before certain medications.",
    additionalInstructions:
      "Inform your healthcare provider about any medications or supplements. Stay hydrated for easier blood collection and wear loose clothing for easy arm access.",
    preparation: [
      "No fasting required",
      "Stay well hydrated (drink normal amounts of water)",
      "Continue regular medications unless advised otherwise",
      "Avoid excessive protein intake 24 hours before test",
      "Inform about any kidney medications or supplements",
    ],
    whenToTake: [
      "Annual health screenings after age 40",
      "Family history of kidney disease",
      "Diabetes or high blood pressure monitoring",
      "Before starting certain medications",
      "Symptoms like swelling, fatigue, or changes in urination",
    ],
    avoidIf: [
      "Severe dehydration (rehydrate first)",
      "Recent contrast dye procedures (wait 48-72 hours)",
      "Active kidney stones without medical supervision",
      "Recent kidney biopsy (wait as advised by doctor)",
    ],
    testCriteria: [
      {
        question: "Who all are eligible for this test?",
        answer:
          "This test is suitable for adults and children above 12 years. Pregnant women should consult their doctor before taking this test. People with diabetes, hypertension, or family history of kidney disease should get regular testing.",
      },
      {
        question: "Why is KFT important?",
        answer:
          "KFT helps detect kidney problems early when treatment is most effective. It's crucial for monitoring chronic conditions like diabetes and hypertension that can affect kidney function.",
      },
      {
        question: "What are the benefits of this test?",
        answer:
          "Early detection of kidney problems, monitoring existing kidney conditions, assessing overall kidney health, preventing complications, and guiding treatment decisions.",
      },
      {
        question: "How often should I get KFT done?",
        answer:
          "For healthy adults: annually after age 40. For diabetics/hypertensives: every 6 months. For chronic kidney disease: as advised by nephrologist, usually every 3-6 months.",
      },
    ],
    parameters: [
      {
        name: "Serum Creatinine",
        normalRange: "0.6-1.2 mg/dL (Women), 0.7-1.3 mg/dL (Men)",
        description: "Waste product filtered by kidneys",
        unit: "mg/dL",
        significance: "Elevated levels indicate reduced kidney function",
      },
      {
        name: "Blood Urea Nitrogen (BUN)",
        normalRange: "7-20 mg/dL",
        description: "Waste product from protein breakdown",
        unit: "mg/dL",
        significance: "High levels may indicate kidney dysfunction or dehydration",
      },
      {
        name: "Uric Acid",
        normalRange: "3.4-7.0 mg/dL (Men), 2.4-6.0 mg/dL (Women)",
        description: "Waste product that can form crystals",
        unit: "mg/dL",
        significance: "High levels associated with gout and kidney stones",
      },
      {
        name: "eGFR (Estimated Glomerular Filtration Rate)",
        normalRange: ">60 mL/min/1.73m²",
        description: "Measure of kidney filtration efficiency",
        unit: "mL/min/1.73m²",
        significance: "Best overall measure of kidney function",
      },
    ],
  },
}

export default function TestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showNeedHelp, setShowNeedHelp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const testId = Number.parseInt(params.id as string)
  const test = mockTestData[testId]

  // Validate discount calculation
  const calculateDiscount = (original: number, current: number): number => {
    return Math.round(((original - current) / original) * 100)
  }

  // Validate savings calculation
  const calculateSavings = (original: number, current: number): number => {
    return original - current
  }

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Not Found</h1>
            <p className="text-gray-600 mb-6">
              The requested test could not be found. Please check the test ID and try again.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => router.back()} variant="outline" className="flex-1">
                Go Back
              </Button>
              <Button onClick={() => router.push("/search")} className="flex-1">
                Browse Tests
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Validate calculations
  const actualDiscount = calculateDiscount(test.originalPrice, test.price)
  const actualSavings = calculateSavings(test.originalPrice, test.price)

  const handleBookNow = () => {
    setIsLoading(true)
    router.push(`/book?test=${testId}`)
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: test.id,
      name: test.name,
      type: "test",
      price: test.price,
      originalPrice: test.originalPrice,
      discount: actualDiscount,
      patients: [1], // Default to self
    }
    dispatch(addToCart(cartItem))

    // Show success message or notification
    console.log("Added to cart:", test.name)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">Test Details</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                onClick={() => setShowNeedHelp(!showNeedHelp)}
              >
                <HelpCircle className="w-4 h-4 mr-1" />
                Need Help ?
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <Badge variant="outline" className="mb-2">
              {test.category}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-pink-600 mb-2">{test.name}</h2>
            <p className="text-sm text-gray-600">Methodology: {test.methodology}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center">
              <IndianRupee className="w-6 h-6 text-gray-900 mr-1" />
              <span className="text-3xl font-bold text-gray-900">{test.price}</span>
              <span className="line-through text-gray-500 ml-2 text-lg">₹{test.originalPrice}</span>
            </div>
            <Badge className="bg-green-500 text-white px-3 py-1 text-sm font-semibold">{actualDiscount}% Off</Badge>
            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
              <IndianRupee className="w-4 h-4 text-yellow-700 mr-1" />
              <span className="text-yellow-700 font-semibold">{test.vipPrice}</span>
              <span className="text-yellow-700 ml-1 text-sm">With</span>
              <Sparkles className="w-4 h-4 text-yellow-700 ml-1 mr-1" />
              <span className="text-yellow-700 font-semibold text-sm">VIP</span>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{test.description}</p>

          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Clinical Significance:</strong> {test.clinicalSignificance}
            </p>
          </div>

          <div className="mb-6">
            <span className="font-semibold text-gray-900">Also known as: </span>
            <span className="text-gray-700">{test.alsoKnownAs.join(", ")}</span>
          </div>

          {/* Test Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <TestTube className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Includes</div>
                <div className="font-semibold text-sm">{test.parameterCount} Parameters</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Reports in</div>
                <div className="font-semibold text-sm">{test.reportTime}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <TestTube className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Sample Required</div>
                <div className="font-semibold text-sm">{test.sampleType}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Fasting</div>
                <div className="font-semibold text-sm">
                  {test.fastingTime > 0 ? `${test.fastingTime}h Required` : "Not Required"}
                </div>
              </div>
            </div>
          </div>

          {/* Savings Banner */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
            <div className="flex items-center justify-center text-green-700">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="font-semibold">You will Save ₹{actualSavings} on this Test</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add To Cart
            </Button>
            <Button
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
              onClick={handleBookNow}
              disabled={isLoading}
            >
              <IndianRupee className="w-4 h-4 mr-1" />
              {isLoading ? "Booking..." : `${test.price} Book Now`}
            </Button>
          </div>
        </div>

        {/* Test Preparation */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Info className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Test Preparation</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  {test.preparation.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* When to Take */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-4 md:p-6">
            <h3 className="font-semibold text-gray-900 mb-3">When to Take This Test</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              {test.whenToTake.map((reason, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Avoid If */}
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4 md:p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Avoid This Test If</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              {test.avoidIf.map((condition, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-red-600">⚠</span>
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Test Criteria */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              Test Information
              <span className="ml-2 text-sm text-gray-500 font-normal">Frequently Asked Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {test.testCriteria.map((criteria, index) => (
                <AccordionItem key={index} value={`criteria-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline">{criteria.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">{criteria.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Parameters */}
        <Card>
          <CardHeader>
            <CardTitle>Test Parameters ({test.parameterCount} parameters included)</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {test.parameters.map((param, index) => (
                <AccordionItem key={index} value={`param-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div>
                      <div className="font-medium">{param.name}</div>
                      <div className="text-sm text-gray-500">
                        Normal Range: {param.normalRange}
                        {param.unit && ` (${param.unit})`}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <strong>Description:</strong> {param.description}
                      </p>
                      {param.significance && (
                        <p className="text-gray-600">
                          <strong>Clinical Significance:</strong> {param.significance}
                        </p>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
