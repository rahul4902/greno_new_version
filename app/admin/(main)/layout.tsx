"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  TestTube,
  Package,
  FolderTree,
  Users,
  ShoppingCart,
  MessageSquare,
  BarChart3,
  ImageIcon,
  Menu,
  Bell,
  Search,
  User,
  LogOut,
  Gift,
  Settings,
} from "lucide-react"
import { Suspense } from "react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Tests Management",
    href: "/admin/tests",
    icon: TestTube,
  },
  {
    title: "Packages Management",
    href: "/admin/packages",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Customer Management",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Orders & Collections",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Sales & Promotions",
    href: "/admin/sales",
    icon: Gift,
  },
  {
    title: "Contact Queries",
    href: "/admin/queries",
    icon: MessageSquare,
  },
  {
    title: "Reports & Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Banners & Media",
    href: "/admin/banners",
    icon: ImageIcon,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div className={className}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {/* <span className="text-xl font-bold text-orange-500">Orange</span> */}
              <div className="ml-1">
                <span className="text-sm font-medium text-gray-700">Health</span>
                <span className="text-sm font-medium text-orange-500">Hub</span>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 transition-colors ${
                  pathname === item.href ? "bg-orange-100 text-orange-700" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Suspense fallback={null}>
      <div className="flex h-screen bg-gray-100">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
            <Sidebar />
          </div>
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(true)}>
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                </Sheet>
                <h1 className="ml-2 text-lg font-semibold text-gray-900 md:ml-0">Admin Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </Suspense>
  )
}
