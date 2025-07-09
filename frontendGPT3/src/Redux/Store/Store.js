import { configureStore } from '@reduxjs/toolkit'
import  HomeReducer from '../features/HomeSlice.js'

export const store = configureStore({
  reducer: {

    Home: HomeReducer
  },
})
