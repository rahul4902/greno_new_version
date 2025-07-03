import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
  id: number
  name: string
  type: "test" | "package"
  price: number
  originalPrice: number
  discount: number
  quantity: number
  patients: number[]
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }

      cartSlice.caseReducers.calculateTotals(state)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      cartSlice.caseReducers.calculateTotals(state)
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity)
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id)
        }
      }
      cartSlice.caseReducers.calculateTotals(state)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    calculateTotals: (state) => {
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0)
      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCartOpen, calculateTotals } = cartSlice.actions

export default cartSlice.reducer
