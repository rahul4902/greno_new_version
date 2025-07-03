import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HealthLab Pro - Medical Testing Made Easy",
  description: "Professional medical testing services with convenient booking and comprehensive reports.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}


import './globals.css'
import MainLayout from "./MainLayout"
