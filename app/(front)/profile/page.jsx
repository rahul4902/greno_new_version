"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Users, FileText, Settings, Heart, Bell, Shield, Edit, Plus, Trash2, Save } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1988-05-15",
    gender: "Male",
    address: "123 Health Street, Medical City, Bangalore - 560001",
    emergencyContact: "+91 98765 43211",
  })

  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      relationship: "Spouse",
      age: 32,
      gender: "Female",
      dateOfBirth: "1991-08-20",
    },
    {
      id: 2,
      name: "Arjun Kumar",
      relationship: "Son",
      age: 8,
      gender: "Male",
      dateOfBirth: "2015-12-10",
    },
  ])

  const [newMember, setNewMember] = useState({
    name: "",
    relationship: "",
    age: "",
    gender: "",
    dateOfBirth: "",
  })

  const [showAddMember, setShowAddMember] = useState(false)

  const recentOrders = [
    {
      id: "HLP001",
      testName: "Complete Blood Count (CBC)",
      date: "2024-01-20",
      status: "Report Available",
      amount: 299,
    },
    {
      id: "HLP002",
      testName: "Complete Health Checkup",
      date: "2024-01-18",
      status: "Sample Pending",
      amount: 999,
    },
    {
      id: "HLP003",
      testName: "Thyroid Function Test",
      date: "2024-01-15",
      status: "Completed",
      amount: 549,
    },
  ]

  const savedItems = [
    {
      id: 1,
      name: "Diabetes Panel",
      type: "package",
      price: 399,
      originalPrice: 599,
    },
    {
      id: 2,
      name: "Liver Function Test",
      type: "test",
      price: 449,
      originalPrice: 623,
    },
  ]

  const handleProfileSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    console.log("Profile saved:", profileData)
  }

  const handleAddFamilyMember = () => {
    if (newMember.name && newMember.relationship) {
      const member = {
        id: Date.now(),
        ...newMember,
        age: Number.parseInt(newMember.age) || 0,
      }
      setFamilyMembers([...familyMembers, member])
      setNewMember({
        name: "",
        relationship: "",
        age: "",
        gender: "",
        dateOfBirth: "",
      })
      setShowAddMember(false)
    }
  }

  const handleRemoveFamilyMember = (id) => {
    setFamilyMembers(familyMembers.filter((member) => member.id !== id))
  }

  const getStatusColor = (status) => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="family" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Family</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Saved</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback className="text-lg">
                      {profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{profileData.name}</CardTitle>
                    <p className="text-gray-600">{profileData.email}</p>
                  </div>
                </div>
                <Button
                  onClick={() => (isEditing ? handleProfileSave() : setIsEditing(true))}
                  className={isEditing ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Input
                      id="gender"
                      value={profileData.gender}
                      onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergency">Emergency Contact</Label>
                    <Input
                      id="emergency"
                      value={profileData.emergencyContact}
                      onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <textarea
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    disabled={!isEditing}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Family Tab */}
          <TabsContent value="family">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Family Members</CardTitle>
                <Button onClick={() => setShowAddMember(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </CardHeader>
              <CardContent>
                {showAddMember && (
                  <Card className="mb-6 border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-lg">Add Family Member</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="memberName">Full Name</Label>
                          <Input
                            id="memberName"
                            value={newMember.name}
                            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                            placeholder="Enter full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="relationship">Relationship</Label>
                          <Input
                            id="relationship"
                            value={newMember.relationship}
                            onChange={(e) => setNewMember({ ...newMember, relationship: e.target.value })}
                            placeholder="e.g., Spouse, Child, Parent"
                          />
                        </div>
                        <div>
                          <Label htmlFor="memberAge">Age</Label>
                          <Input
                            id="memberAge"
                            type="number"
                            value={newMember.age}
                            onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                            placeholder="Enter age"
                          />
                        </div>
                        <div>
                          <Label htmlFor="memberGender">Gender</Label>
                          <Input
                            id="memberGender"
                            value={newMember.gender}
                            onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}
                            placeholder="Male/Female/Other"
                          />
                        </div>
                        <div>
                          <Label htmlFor="memberDob">Date of Birth</Label>
                          <Input
                            id="memberDob"
                            type="date"
                            value={newMember.dateOfBirth}
                            onChange={(e) => setNewMember({ ...newMember, dateOfBirth: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddFamilyMember}>Add Member</Button>
                        <Button variant="outline" onClick={() => setShowAddMember(false)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-4">
                  {familyMembers.map((member) => (
                    <Card key={member.id} className="border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-lg">{member.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{member.relationship}</span>
                                <span>{member.age} years</span>
                                <span>{member.gender}</span>
                              </div>
                              {member.dateOfBirth && <p className="text-sm text-gray-500">DOB: {member.dateOfBirth}</p>}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFamilyMember(member.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <Card key={order.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{order.testName}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span>Order ID: {order.id}</span>
                              <span>{order.date}</span>
                              <span>₹{order.amount}</span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Items Tab */}
          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle>Saved Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedItems.map((item) => (
                    <Card key={item.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{item.type === "package" ? "Package" : "Test"}</Badge>
                              <span className="text-green-600 font-semibold">₹{item.price}</span>
                              <span className="text-gray-500 line-through">₹{item.originalPrice}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Remove
                            </Button>
                            <Button size="sm">Book Now</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive updates about your tests and reports</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-gray-600">Get SMS alerts for important updates</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Marketing Communications</h4>
                      <p className="text-sm text-gray-600">Receive offers and health tips</p>
                    </div>
                    <input type="checkbox" className="toggle" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Download My Data
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                  >
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
