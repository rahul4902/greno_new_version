import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface TestItem {
  id: number
  name: string
  type: "test" | "package"
  originalPrice: number
  price: number
  discount: number
  fastingTime: number
  sampleType?: string
  tests?: string[]
  category: string
  popular: boolean
}

interface SearchState {
  query: string
  results: TestItem[]
  isLoading: boolean
  filters: {
    categories: string[]
    priceRange: [number, number]
    fastingRequired: boolean
  }
  suggestions: TestItem[]
  recentSearches: string[]
  isModalOpen: boolean
}

const initialState: SearchState = {
  query: "",
  results: [],
  isLoading: false,
  filters: {
    categories: ["All"],
    priceRange: [0, 2000],
    fastingRequired: false,
  },
  suggestions: [],
  recentSearches: [],
  isModalOpen: false,
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setResults: (state, action: PayloadAction<TestItem[]>) => {
      state.results = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<SearchState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setSuggestions: (state, action: PayloadAction<TestItem[]>) => {
      state.suggestions = action.payload
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim()
      if (query && !state.recentSearches.includes(query)) {
        state.recentSearches.unshift(query)
        state.recentSearches = state.recentSearches.slice(0, 5)
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = []
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },
    resetSearch: (state) => {
      state.query = ""
      state.results = []
      state.suggestions = []
    },
  },
})

export const {
  setQuery,
  setResults,
  setLoading,
  setFilters,
  setSuggestions,
  addRecentSearch,
  clearRecentSearches,
  setModalOpen,
  resetSearch,
} = searchSlice.actions

export default searchSlice.reducer
