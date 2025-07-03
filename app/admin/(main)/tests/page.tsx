"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Search, Edit, Trash2, Eye, Download, Upload, TestTube, IndianRupee, X } from "lucide-react"

const mockTests = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    category: "Blood Tests",
    originalPrice: 399,
    price: 299,
    discount: 25,
    fastingTime: 0,
    sampleType: "Blood",
    reportTime: "6 hours",
    parameterCount: 26,
    status: "Active",
    popularity: "High",
    createdDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Thyroid Function Test",
    category: "Hormone Tests",
    originalPrice: 799,
    price: 549,
    discount: 31,
    fastingTime: 0,
    sampleType: "Blood",
    reportTime: "12 hours",
    parameterCount: 5,
    status: "Active",
    popularity: "High",
    createdDate: "2024-01-10",
  },
  {
    id: 3,
    name: "Lipid Profile",
    category: "Heart Health",
    originalPrice: 499,
    price: 399,
    discount: 20,
    fastingTime: 12,
    sampleType: "Blood",
    reportTime: "24 hours",
    parameterCount: 8,
    status: "Active",
    popularity: "Medium",
    createdDate: "2024-01-08",
  },
]

const initialTestParameters = [
  {
    id: 1,
    name: "Hemoglobin (Hb)",
    normalRange: "12.0-15.5 g/dL (Women), 13.5-17.5 g/dL (Men)",
    unit: "g/dL",
    description: "Protein in red blood cells that carries oxygen",
  },
  {
    id: 2,
    name: "White Blood Cell Count (WBC)",
    normalRange: "4,000-11,000 cells/μL",
    unit: "cells/μL",
    description: "Number of white blood cells that fight infection",
  },
  {
    id: 3,
    name: "Red Blood Cell Count (RBC)",
    normalRange: "4.2-5.4 million cells/μL (Women), 4.7-6.1 million cells/μL (Men)",
    unit: "million cells/μL",
    description: "Number of red blood cells in blood",
  },
]

const initialFAQs = [
  {
    id: 1,
    question: "How long does it take to get results?",
    answer: "Results are typically available within 6-24 hours depending on the test complexity.",
  },
  {
    id: 2,
    question: "Is fasting required for this test?",
    answer: "Fasting requirements vary by test. Please check the specific test requirements.",
  },
]

export default function TestsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isParametersDialogOpen, setIsParametersDialogOpen] = useState(false)
  const [selectedTest, setSelectedTest] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("basic")

  const [testParameters, setTestParameters] = useState(initialTestParameters)
  const [faqs, setFAQs] = useState(initialFAQs)

  const [newTest, setNewTest] = useState({
    name: "",
    category: "",
    originalPrice: "",
    price: "",
    fastingTime: "",
    sampleType: "",
    reportTime: "",
    description: "",
    methodology: "",
    clinicalSignificance: "",
    testPreparation: "",
    whenToTakeTest: "",
    avoidTestIf: "",
    parameters: [] as any[],
    faqs: [] as any[],
  })

  const [newParameter, setNewParameter] = useState({
    name: "",
    normalRange: "",
    unit: "",
    description: "",
  })

  const [newFAQ, setNewFAQ] = useState({
    question: "",
    answer: "",
  })

  const filteredTests = mockTests.filter((test) => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || test.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || test.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleAddParameter = () => {
    if (newParameter.name && newParameter.normalRange) {
      const parameter = {
        id: Date.now(),
        ...newParameter,
      }
      setNewTest((prev) => ({
        ...prev,
        parameters: [...prev.parameters, parameter],
      }))
      setNewParameter({ name: "", normalRange: "", unit: "", description: "" })
    }
  }

  const handleRemoveParameter = (id: number) => {
    setNewTest((prev) => ({
      ...prev,
      parameters: prev.parameters.filter((p) => p.id !== id),
    }))
  }

  const handleAddFAQ = () => {
    if (newFAQ.question && newFAQ.answer) {
      const faq = {
        id: Date.now(),
        ...newFAQ,
      }
      setNewTest((prev) => ({
        ...prev,
        faqs: [...prev.faqs, faq],
      }))
      setNewFAQ({ question: "", answer: "" })
    }
  }

  const handleRemoveFAQ = (id: number) => {
    setNewTest((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== id),
    }))
  }

  const handleAddTest = () => {
    console.log("Adding test:", newTest)
    setIsAddDialogOpen(false)
    setNewTest({
      name: "",
      category: "",
      originalPrice: "",
      price: "",
      fastingTime: "",
      sampleType: "",
      reportTime: "",
      description: "",
      methodology: "",
      clinicalSignificance: "",
      testPreparation: "",
      whenToTakeTest: "",
      avoidTestIf: "",
      parameters: [],
      faqs: [],
    })
    setActiveTab("basic")
  }

  const handleEditTest = (test: any) => {
    setSelectedTest(test)
    setIsEditDialogOpen(true)
  }

  const handleViewParameters = (test: any) => {
    setSelectedTest(test)
    setIsParametersDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Inactive":
        return "bg-red-500"
      case "Draft":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case "High":
        return "bg-green-100 text-green-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      case "Low":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tests Management</h1>
          <p className="text-gray-600">Manage all medical tests and their parameters</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Test
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Test</DialogTitle>
              </DialogHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                  <TabsTrigger value="parameters">Parameters</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="testName">Test Name *</Label>
                      <Input
                        id="testName"
                        value={newTest.name}
                        onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                        placeholder="Enter test name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={newTest.category}
                        onValueChange={(value) => setNewTest({ ...newTest, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Blood Tests">Blood Tests</SelectItem>
                          <SelectItem value="Hormone Tests">Hormone Tests</SelectItem>
                          <SelectItem value="Heart Health">Heart Health</SelectItem>
                          <SelectItem value="Kidney Health">Kidney Health</SelectItem>
                          <SelectItem value="Liver Health">Liver Health</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="originalPrice">Original Price (₹) *</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        value={newTest.originalPrice}
                        onChange={(e) => setNewTest({ ...newTest, originalPrice: e.target.value })}
                        placeholder="Enter original price"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Selling Price (₹) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newTest.price}
                        onChange={(e) => setNewTest({ ...newTest, price: e.target.value })}
                        placeholder="Enter selling price"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fastingTime">Fasting Time (hours)</Label>
                      <Input
                        id="fastingTime"
                        type="number"
                        value={newTest.fastingTime}
                        onChange={(e) => setNewTest({ ...newTest, fastingTime: e.target.value })}
                        placeholder="Enter fasting time"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sampleType">Sample Type *</Label>
                      <Select
                        value={newTest.sampleType}
                        onValueChange={(value) => setNewTest({ ...newTest, sampleType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select sample type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Blood">Blood</SelectItem>
                          <SelectItem value="Urine">Urine</SelectItem>
                          <SelectItem value="Stool">Stool</SelectItem>
                          <SelectItem value="Saliva">Saliva</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="reportTime">Report Time</Label>
                      <Input
                        id="reportTime"
                        value={newTest.reportTime}
                        onChange={(e) => setNewTest({ ...newTest, reportTime: e.target.value })}
                        placeholder="e.g., 24 hours"
                      />
                    </div>
                    <div>
                      <Label htmlFor="methodology">Methodology</Label>
                      <Input
                        id="methodology"
                        value={newTest.methodology}
                        onChange={(e) => setNewTest({ ...newTest, methodology: e.target.value })}
                        placeholder="e.g., Flow Cytometry"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newTest.description}
                      onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
                      placeholder="Enter test description"
                      rows={3}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div>
                    <Label htmlFor="clinicalSignificance">Clinical Significance</Label>
                    <Textarea
                      id="clinicalSignificance"
                      value={newTest.clinicalSignificance}
                      onChange={(e) => setNewTest({ ...newTest, clinicalSignificance: e.target.value })}
                      placeholder="Enter clinical significance and medical importance"
                      rows={4}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="guidelines" className="space-y-4">
                  <div>
                    <Label htmlFor="testPreparation">Test Preparation</Label>
                    <Textarea
                      id="testPreparation"
                      value={newTest.testPreparation}
                      onChange={(e) => setNewTest({ ...newTest, testPreparation: e.target.value })}
                      placeholder="Enter detailed test preparation instructions..."
                      rows={4}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Include fasting requirements, medication restrictions, timing, etc.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="whenToTakeTest">When to Take This Test</Label>
                    <Textarea
                      id="whenToTakeTest"
                      value={newTest.whenToTakeTest}
                      onChange={(e) => setNewTest({ ...newTest, whenToTakeTest: e.target.value })}
                      placeholder="Enter conditions or scenarios when this test should be taken..."
                      rows={4}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Include symptoms, health conditions, preventive care scenarios, etc.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="avoidTestIf">Avoid This Test If</Label>
                    <Textarea
                      id="avoidTestIf"
                      value={newTest.avoidTestIf}
                      onChange={(e) => setNewTest({ ...newTest, avoidTestIf: e.target.value })}
                      placeholder="Enter contraindications and conditions when test should be avoided..."
                      rows={4}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Include medical conditions, medications, pregnancy, etc.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="parameters" className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Add Test Parameter</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="paramName">Parameter Name *</Label>
                        <Input
                          id="paramName"
                          value={newParameter.name}
                          onChange={(e) => setNewParameter({ ...newParameter, name: e.target.value })}
                          placeholder="e.g., Hemoglobin"
                        />
                      </div>
                      <div>
                        <Label htmlFor="paramUnit">Unit</Label>
                        <Input
                          id="paramUnit"
                          value={newParameter.unit}
                          onChange={(e) => setNewParameter({ ...newParameter, unit: e.target.value })}
                          placeholder="e.g., g/dL"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="paramRange">Normal Range *</Label>
                        <Input
                          id="paramRange"
                          value={newParameter.normalRange}
                          onChange={(e) => setNewParameter({ ...newParameter, normalRange: e.target.value })}
                          placeholder="e.g., 12.0-15.5 g/dL (Women), 13.5-17.5 g/dL (Men)"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="paramDesc">Description</Label>
                        <Textarea
                          id="paramDesc"
                          value={newParameter.description}
                          onChange={(e) => setNewParameter({ ...newParameter, description: e.target.value })}
                          placeholder="Brief description of what this parameter measures"
                          rows={2}
                        />
                      </div>
                    </div>
                    <Button onClick={handleAddParameter} className="mt-4" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Parameter
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Test Parameters ({newTest.parameters.length})</h3>
                    <div className="space-y-2">
                      {newTest.parameters.map((param) => (
                        <Card key={param.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium">{param.name}</h4>
                                <p className="text-sm text-gray-600 mt-1">{param.description}</p>
                                <div className="mt-2 text-sm">
                                  <span className="font-medium">Normal Range: </span>
                                  <span className="text-gray-600">{param.normalRange}</span>
                                </div>
                                {param.unit && (
                                  <div className="text-sm">
                                    <span className="font-medium">Unit: </span>
                                    <span className="text-gray-600">{param.unit}</span>
                                  </div>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveParameter(param.id)}
                                className="text-red-600"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {newTest.parameters.length === 0 && (
                        <p className="text-gray-500 text-center py-4">No parameters added yet</p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="faq" className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Add FAQ</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="faqQuestion">Question *</Label>
                        <Input
                          id="faqQuestion"
                          value={newFAQ.question}
                          onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                          placeholder="Enter frequently asked question"
                        />
                      </div>
                      <div>
                        <Label htmlFor="faqAnswer">Answer *</Label>
                        <Textarea
                          id="faqAnswer"
                          value={newFAQ.answer}
                          onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                          placeholder="Enter detailed answer"
                          rows={3}
                        />
                      </div>
                    </div>
                    <Button onClick={handleAddFAQ} className="mt-4" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add FAQ
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Test Information FAQ ({newTest.faqs.length})</h3>
                    <div className="space-y-2">
                      {newTest.faqs.map((faq) => (
                        <Card key={faq.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium">{faq.question}</h4>
                                <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveFAQ(faq.id)}
                                className="text-red-600"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {newTest.faqs.length === 0 && <p className="text-gray-500 text-center py-4">No FAQs added yet</p>}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between pt-4 border-t">
                <div className="flex gap-2">
                  {activeTab !== "basic" && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        const tabs = ["basic", "details", "guidelines", "parameters", "faq"]
                        const currentIndex = tabs.indexOf(activeTab)
                        if (currentIndex > 0) {
                          setActiveTab(tabs[currentIndex - 1])
                        }
                      }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeTab !== "faq" && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        const tabs = ["basic", "details", "guidelines", "parameters", "faq"]
                        const currentIndex = tabs.indexOf(activeTab)
                        if (currentIndex < tabs.length - 1) {
                          setActiveTab(tabs[currentIndex + 1])
                        }
                      }}
                    >
                      Next
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddTest}>Add Test</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tests</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <TestTube className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Tests</p>
                <p className="text-2xl font-bold text-green-600">142</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Price</p>
                <p className="text-2xl font-bold text-orange-600">₹425</p>
              </div>
              <IndianRupee className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Blood Tests">Blood Tests</SelectItem>
                <SelectItem value="Hormone Tests">Hormone Tests</SelectItem>
                <SelectItem value="Heart Health">Heart Health</SelectItem>
                <SelectItem value="Kidney Health">Kidney Health</SelectItem>
                <SelectItem value="Liver Health">Liver Health</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tests Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tests ({filteredTests.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Parameters</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Popularity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{test.name}</div>
                        <div className="text-sm text-gray-500">
                          {test.fastingTime > 0 ? `${test.fastingTime}h fasting` : "No fasting"} • {test.reportTime}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{test.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-green-600">₹{test.price}</div>
                        <div className="text-sm text-gray-500 line-through">₹{test.originalPrice}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewParameters(test)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {test.parameterCount} parameters
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(test.status)}>{test.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPopularityColor(test.popularity)}>
                        {test.popularity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewParameters(test)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditTest(test)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Test Parameters Dialog */}
      <Dialog open={isParametersDialogOpen} onOpenChange={setIsParametersDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Test Details - {selectedTest?.name}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="parameters" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="parameters">Parameters</TabsTrigger>
              <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
              <TabsTrigger value="info">Information</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="parameters" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Parameters ({testParameters.length})</h3>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Parameter
                </Button>
              </div>
              <div className="space-y-4">
                {testParameters.map((param) => (
                  <Card key={param.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{param.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{param.description}</p>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Normal Range: </span>
                            <span className="text-gray-600">{param.normalRange}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Unit: </span>
                            <span className="text-gray-600">{param.unit}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="guidelines" className="space-y-4">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Test Preparation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      No special preparation required. You can eat and drink normally before this test. Continue taking
                      your regular medications unless advised otherwise by your doctor.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">When to Take This Test</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>As part of routine health checkup</li>
                      <li>When experiencing symptoms of anemia (fatigue, weakness)</li>
                      <li>Before surgical procedures</li>
                      <li>To monitor treatment response</li>
                      <li>During pregnancy for prenatal care</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Avoid This Test If</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>You have received a blood transfusion in the last 3 days</li>
                      <li>You are on blood thinning medications (consult doctor first)</li>
                      <li>You have active bleeding or clotting disorders</li>
                      <li>Recent chemotherapy or radiation therapy</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="info" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Clinical Significance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    The Complete Blood Count (CBC) is one of the most commonly ordered blood tests. It provides
                    important information about the types and numbers of cells in the blood, especially red blood cells,
                    white blood cells, and platelets. This test helps diagnose various conditions including anemia,
                    infections, and blood disorders.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Test Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Sample Type</p>
                      <p className="text-gray-600">Blood</p>
                    </div>
                    <div>
                      <p className="font-medium">Report Time</p>
                      <p className="text-gray-600">6 hours</p>
                    </div>
                    <div>
                      <p className="font-medium">Fasting Required</p>
                      <p className="text-gray-600">No</p>
                    </div>
                    <div>
                      <p className="font-medium">Parameters</p>
                      <p className="text-gray-600">26 parameters</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add FAQ
                </Button>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {initialFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600">{faq.answer}</p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
