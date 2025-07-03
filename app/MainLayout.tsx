"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReduxProvider>
      <LayoutContent>{children}</LayoutContent>
    </ReduxProvider>
  )
}
