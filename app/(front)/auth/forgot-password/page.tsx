"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, ArrowLeft, Send, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock password reset logic
      console.log("Password reset requested for:", email)
      setIsSuccess(true)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="w-full shadow-xl border-0">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
          <CardDescription>We've sent a password reset link to your email address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-600">Didn't receive the email? Check your spam folder or try again.</p>

            <div className="space-y-2">
              <Button onClick={() => setIsSuccess(false)} variant="outline" className="w-full">
                Try Different Email
              </Button>
              <Link href="/auth/login">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full shadow-xl border-0">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
        <CardDescription>Enter your email address and we'll send you a link to reset your password</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600"
            disabled={isLoading}
          >
            {isLoading ? (
              "Sending Reset Link..."
            ) : (
              <>
                Send Reset Link
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center">
          <Link href="/auth/login" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Link>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            Remember your password?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
