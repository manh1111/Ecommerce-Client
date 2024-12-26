import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  countCart: 0
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    increaseCart: (state) => {
      state.countCart += 1
    },
    reduceCart: (state) => {
      if (state.countCart >= 1) {
        state.countCart -= 1
      }
    },
    setCountCart: (state, action) => {
      state.countCart = action.payload
    }
  }
})

export const { increaseCart, reduceCart, setCountCart } = appSlice.actions