import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Patient {
  id: number
  name: string
  age: number
  relation: string
}

export interface BookingItem {
  id: number
  name: string
  type: "test" | "package"
  price: number
  originalPrice: number
  discount: number
}

interface BookingState {
  currentStep: number
  selectedItem: BookingItem | null
  selectedPatients: number[]
  patients: Patient[]
  bookingHistory: any[]
  isLoading: boolean
  error: string | null
}

const initialState: BookingState = {
  currentStep: 1,
  selectedItem: null,
  selectedPatients: [1],
  patients: [
    { id: 1, name: "Rajesh Kumar", age: 35, relation: "Self" },
    { id: 2, name: "Priya Sharma", age: 32, relation: "Spouse" },
    { id: 3, name: "Arjun Kumar", age: 8, relation: "Son" },
  ],
  bookingHistory: [],
  isLoading: false,
  error: null,
}

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    setSelectedItem: (state, action: PayloadAction<BookingItem | null>) => {
      state.selectedItem = action.payload
    },
    setSelectedPatients: (state, action: PayloadAction<number[]>) => {
      state.selectedPatients = action.payload
    },
    addPatient: (state, action: PayloadAction<Omit<Patient, "id">>) => {
      const newId = Math.max(...state.patients.map((p) => p.id)) + 1
      state.patients.push({ ...action.payload, id: newId })
    },
    removePatient: (state, action: PayloadAction<number>) => {
      state.patients = state.patients.filter((p) => p.id !== action.payload)
      state.selectedPatients = state.selectedPatients.filter((id) => id !== action.payload)
    },
    addBooking: (state, action: PayloadAction<any>) => {
      state.bookingHistory.unshift(action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    resetBooking: (state) => {
      state.currentStep = 1
      state.selectedItem = null
      state.selectedPatients = [1]
      state.error = null
    },
  },
})

export const {
  setCurrentStep,
  setSelectedItem,
  setSelectedPatients,
  addPatient,
  removePatient,
  addBooking,
  setLoading,
  setError,
  resetBooking,
} = bookingSlice.actions

export default bookingSlice.reducer
