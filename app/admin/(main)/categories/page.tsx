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
import { Plus, Search, Edit, Trash2, Eye, Folder, FolderOpen, Move, ArrowUp, ArrowDown } from "lucide-react"

const mockCategories = [
  {
    id: 1,
    name: "Blood Tests",
    slug: "blood-tests",
    description: "Complete blood analysis and cell count tests",
    icon: "🩸",
    testCount: 28,
    packageCount: 5,
    status: "Active",
    order: 1,
    parentId: null,
    createdDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Heart Health",
    slug: "heart-health",
    description: "Comprehensive cardiac screening and monitoring tests",
    icon: "❤️",
    testCount: 25,
    packageCount: 8,
    status: "Active",
    order: 2,
    parentId: null,
    createdDate: "2024-01-14",
  },
  {
    id: 3,
    name: "Diabetes Care",
    slug: "diabetes-care",
    description: "Blood sugar monitoring and diabetes management tests",
    icon: "🩸",
    testCount: 18,
    packageCount: 6,
    status: "Active",
    order: 3,
    parentId: null,
    createdDate: "2024-01-13",
  },
  {
    id: 4,
    name: "Thyroid Function",
    slug: "thyroid-function",
    description: "Complete thyroid hormone analysis and monitoring",
    icon: "🦋",
    testCount: 12,
    packageCount: 4,
    status: "Active",
    order: 4,
    parentId: null,
    createdDate: "2024-01-12",
  },
  {
    id: 5,
    name: "Women's Health",
    slug: "womens-health",
    description: "Specialized health screening for women of all ages",
    icon: "👩‍⚕️",
    testCount: 32,
    packageCount: 12,
    status: "Active",
    order: 5,
    parentId: null,
    createdDate: "2024-01-11",
  },
  {
    id: 6,
    name: "Hormone Tests",
    slug: "hormone-tests",
    description: "Comprehensive hormone level analysis",
    icon: "⚗️",
    testCount: 15,
    packageCount: 3,
    status: "Active",
    order: 1,
    parentId: 5, // Subcategory of Women's Health
    createdDate: "2024-01-10",
  },
]

export default function CategoriesManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)

  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "",
    parentId: null,
    status: "Active",
  })

  const filteredCategories = mockCategories.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || category.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const mainCategories = filteredCategories.filter((cat) => !cat.parentId)
  const subCategories = filteredCategories.filter((cat) => cat.parentId)

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (name: string) => {
    setNewCategory({
      ...newCategory,
      name,
      slug: generateSlug(name),
    })
  }

  const handleAddCategory = () => {
    console.log("Adding category:", newCategory)
    setIsAddDialogOpen(false)
    setNewCategory({
      name: "",
      slug: "",
      description: "",
      icon: "",
      parentId: null,
      status: "Active",
    })
  }

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category)
    setIsEditDialogOpen(true)
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

  const getCategoryIcon = (category: any) => {
    if (category.parentId) {
      return <FolderOpen className="w-4 h-4 text-blue-600" />
    }
    return <Folder className="w-4 h-4 text-purple-600" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-gray-600">Organize tests and packages into categories and subcategories</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="categoryName">Category Name *</Label>
                  <Input
                    id="categoryName"
                    value={newCategory.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <Label htmlFor="categorySlug">URL Slug *</Label>
                  <Input
                    id="categorySlug"
                    value={newCategory.slug}
                    onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                    placeholder="category-url-slug"
                  />
                </div>
                <div>
                  <Label htmlFor="categoryIcon">Icon (Emoji)</Label>
                  <Input
                    id="categoryIcon"
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                    placeholder="🩸"
                  />
                </div>
                <div>
                  <Label htmlFor="parentCategory">Parent Category</Label>
                  <Select
                    value={newCategory.parentId}
                    onValueChange={(value) => setNewCategory({ ...newCategory, parentId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={null}>None (Main Category)</SelectItem>
                      {mainCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="categoryStatus">Status</Label>
                  <Select
                    value={newCategory.status}
                    onValueChange={(value) => setNewCategory({ ...newCategory, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="categoryDescription">Description</Label>
                <Textarea
                  id="categoryDescription"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Enter category description"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCategory}>Add Category</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Categories</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Folder className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Main Categories</p>
                <p className="text-2xl font-bold text-purple-600">8</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Folder className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Subcategories</p>
                <p className="text-2xl font-bold text-blue-600">4</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FolderOpen className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Categories</p>
                <p className="text-2xl font-bold text-green-600">11</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
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
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
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

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories ({filteredCategories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Tests</TableHead>
                  <TableHead>Packages</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Main Categories */}
                {mainCategories.map((category) => (
                  <>
                    <TableRow key={category.id} className="bg-purple-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{category.icon}</div>
                          <div>
                            <div className="font-medium flex items-center">
                              {getCategoryIcon(category)}
                              {category.name}
                            </div>
                            <div className="text-sm text-gray-500">{category.description}</div>
                            <div className="text-xs text-gray-400">/{category.slug}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-100 text-purple-700">
                          Main Category
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{category.testCount}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{category.packageCount}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(category.status)}>{category.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <ArrowUp className="w-3 h-3" />
                          </Button>
                          <span className="text-sm">{category.order}</span>
                          <Button variant="ghost" size="sm">
                            <ArrowDown className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* Subcategories */}
                    {subCategories
                      .filter((sub) => sub.parentId === category.id)
                      .map((subCategory) => (
                        <TableRow key={subCategory.id} className="bg-blue-50">
                          <TableCell>
                            <div className="flex items-center space-x-3 pl-8">
                              <div className="text-lg">{subCategory.icon}</div>
                              <div>
                                <div className="font-medium flex items-center">
                                  {getCategoryIcon(subCategory)}
                                  {subCategory.name}
                                </div>
                                <div className="text-sm text-gray-500">{subCategory.description}</div>
                                <div className="text-xs text-gray-400">/{subCategory.slug}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-100 text-blue-700">
                              Subcategory
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{subCategory.testCount}</span>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{subCategory.packageCount}</span>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(subCategory.status)}>{subCategory.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm">
                                <ArrowUp className="w-3 h-3" />
                              </Button>
                              <span className="text-sm">{subCategory.order}</span>
                              <Button variant="ghost" size="sm">
                                <ArrowDown className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleEditCategory(subCategory)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Move className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
