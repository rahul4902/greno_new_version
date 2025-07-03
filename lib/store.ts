import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "./features/search/searchSlice"
import bookingReducer from "./features/booking/bookingSlice"
import userReducer from "./features/user/userSlice"
import uiReducer from "./features/ui/uiSlice"
import cartReducer from "./features/cart/cartSlice"

export const store = configureStore({
  reducer: {
    search: searchReducer,
    booking: bookingReducer,
    user: userReducer,
    ui: uiReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
