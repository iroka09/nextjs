
import counterSlice from "./counterSlice"
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    myCounter: counterSlice.reducer
  }
})

export default store;