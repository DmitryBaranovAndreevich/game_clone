import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/user"

const rootReducer = combineReducers({
  user: userSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
