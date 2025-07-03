import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UIState {
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  searchModalOpen: boolean
  reportsModalOpen: boolean
  contactModalOpen: boolean
  loading: {
    global: boolean
    search: boolean
    booking: boolean
    reports: boolean
  }
  notifications: Array<{
    id: string
    type: "success" | "error" | "warning" | "info"
    message: string
    timestamp: number
  }>
  currentPage: string
}

const initialState: UIState = {
  sidebarOpen: false,
  mobileMenuOpen: false,
  searchModalOpen: false,
  reportsModalOpen: false,
  contactModalOpen: false,
  loading: {
    global: false,
    search: false,
    booking: false,
    reports: false,
  },
  notifications: [],
  currentPage: "/",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload
    },
    setSearchModalOpen: (state, action: PayloadAction<boolean>) => {
      state.searchModalOpen = action.payload
    },
    setReportsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.reportsModalOpen = action.payload
    },
    setContactModalOpen: (state, action: PayloadAction<boolean>) => {
      state.contactModalOpen = action.payload
      // Auto-close sidebar when contact action is initiated
      if (action.payload) {
        state.sidebarOpen = false
        state.mobileMenuOpen = false
      }
    },
    setLoading: (state, action: PayloadAction<{ key: keyof UIState["loading"]; value: boolean }>) => {
      state.loading[action.payload.key] = action.payload.value
    },
    addNotification: (state, action: PayloadAction<Omit<UIState["notifications"][0], "id" | "timestamp">>) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      }
      state.notifications.unshift(notification)
      // Keep only last 5 notifications
      state.notifications = state.notifications.slice(0, 5)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload
    },
    closeAllModals: (state) => {
      state.searchModalOpen = false
      state.reportsModalOpen = false
      state.contactModalOpen = false
      state.sidebarOpen = false
      state.mobileMenuOpen = false
    },
  },
})

export const {
  setSidebarOpen,
  toggleSidebar,
  setMobileMenuOpen,
  setSearchModalOpen,
  setReportsModalOpen,
  setContactModalOpen,
  setLoading,
  addNotification,
  removeNotification,
  clearNotifications,
  setCurrentPage,
  closeAllModals,
} = uiSlice.actions

export default uiSlice.reducer
