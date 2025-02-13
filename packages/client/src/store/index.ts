import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import userReducer from "./slices/user"
import leaderboardReducer from "./slices/leaderboard"

const rootReducer = combineReducers({
  user: userReducer,
  leaderboard: leaderboardReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
