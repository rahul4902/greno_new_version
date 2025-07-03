import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UserPreferences {
  theme: "light" | "dark"
  language: "en" | "hi"
  notifications: boolean
  homeCollection: boolean
  currency: "INR" | "USD"
}

interface UserState {
  isAuthenticated: boolean
  profile: {
    name: string
    email: string
    phone: string
    address: string
  } | null
  preferences: UserPreferences
  reports: any[]
  favorites: number[]
}

const initialState: UserState = {
  isAuthenticated: false,
  profile: null,
  preferences: {
    theme: "light",
    language: "en",
    notifications: true,
    homeCollection: true,
    currency: "INR",
  },
  reports: [],
  favorites: [],
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    setProfile: (state, action: PayloadAction<UserState["profile"]>) => {
      state.profile = action.payload
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload }
    },
    addToFavorites: (state, action: PayloadAction<number>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload)
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload)
    },
    setReports: (state, action: PayloadAction<any[]>) => {
      state.reports = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.profile = null
      state.reports = []
      state.favorites = []
    },
  },
})

export const {
  setAuthenticated,
  setProfile,
  updatePreferences,
  addToFavorites,
  removeFromFavorites,
  setReports,
  logout,
} = userSlice.actions

export default userSlice.reducer
