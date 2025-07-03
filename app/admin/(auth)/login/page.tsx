"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, Shield, ArrowRight } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock admin authentication logic
      if (formData.email === "admin@orangehealthlabs.com" && formData.password === "admin123") {
        router.push("/admin")
      } else {
        setError("Invalid admin credentials")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">Admin Access</CardTitle>
        <CardDescription className="text-gray-600">Sign in to access the administrative dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Admin Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter admin email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 pr-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Keep me signed in
              </Label>
            </div>
            <Link href="/admin/auth/forgot-password" className="text-sm text-orange-600 hover:text-orange-500">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              "Signing in..."
            ) : (
              <>
                Access Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Demo Credentials</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Email:</strong> admin@orangehealthlabs.com
            </p>
            <p>
              <strong>Password:</strong> admin123
            </p>
          </div>
        </div>

        <div className="text-center text-sm">
          <Link href="/" className="text-gray-600 hover:text-gray-500">
            ← Back to Main Site
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
