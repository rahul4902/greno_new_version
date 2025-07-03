"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Minus, ShoppingCart, IndianRupee } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { removeFromCart, updateQuantity, clearCart } from "@/lib/features/cart/cartSlice"
import Link from "next/link"

export default function CartPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { items, total, itemCount } = useAppSelector((state) => state.cart)

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleCheckout = () => {
    if (items.length > 0) {
      // For now, redirect to booking with first item
      const firstItem = items[0]
      const itemType = firstItem.type === "package" ? "package" : "test"
      router.push(`/book?${itemType}=${firstItem.id}`)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some tests or packages to get started</p>
            <Link href="/search">
              <Button className="bg-blue-600 hover:bg-blue-700">Browse Tests & Packages</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart ({itemCount} items)</h1>
          <Button
            variant="outline"
            onClick={handleClearCart}
            className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1 mb-4 md:mb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                        <Badge
                          className={
                            item.type === "package" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                          }
                        >
                          {item.type === "package" ? "Package" : "Test"}
                        </Badge>
                        {item.discount > 0 && <Badge className="bg-red-500 text-white">{item.discount}% OFF</Badge>}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <IndianRupee className="w-4 h-4 mr-1" />
                          <span className="font-semibold text-green-600">{item.price}</span>
                          {item.originalPrice > item.price && (
                            <span className="line-through text-gray-500 ml-2">₹{item.originalPrice}</span>
                          )}
                        </div>
                      </div>

                      {item.patients && item.patients.length > 0 && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Selected for:</span> {item.patients.length} patient(s)
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border border-gray-200 sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({itemCount} items)</span>
                  <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    <span>{total}</span>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-green-600">
                  <span>Home Collection</span>
                  <span>FREE</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <div className="flex items-center">
                      <IndianRupee className="w-5 h-5 mr-1" />
                      <span>{total}</span>
                    </div>
                  </div>
                </div>

                <Button onClick={handleCheckout} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                  Proceed to Checkout
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  <p>• Free home sample collection</p>
                  <p>• Reports within 24-48 hours</p>
                  <p>• NABL certified labs</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
