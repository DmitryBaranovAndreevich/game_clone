import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import userSlice, { TUserState } from "./slices/user"

export type TState = {
  user: TUserState
}

const rootReducer = combineReducers({
  user: userSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
