import { createSlice } from "@reduxjs/toolkit"

export type TThemeState = "default" | "purple"

const initialState = "default" satisfies TThemeState as TThemeState

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => (state = action.payload),
  },
})

const { setTheme } = themeSlice.actions

export { setTheme }
export default themeSlice.reducer
