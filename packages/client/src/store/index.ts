import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import userReducer from "./slices/user"
import leaderboardReducer from "./slices/leaderboard"
import themeReducer from "./slices/theme"

const rootReducer = combineReducers({
  user: userReducer,
  leaderboard: leaderboardReducer,
  theme: themeReducer,
})

export const makeStore = (preloadedState = {}) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]

// 🔵 Хуки для безопасного использования Redux в компонентах
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
