import { createSlice } from "@reduxjs/toolkit"

export type TThemeState = {
  info: "default" | "purple"
  status: "init" | "changed"
}

const initialState = {
  info: "default",
  status: "init",
} satisfies TThemeState as TThemeState

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.info = action.payload
    },
    setThemeStatus: state => {
      state.status = "changed"
    },
    setInitState: state => {
      state.info = "default"
      state.status = "init"
    },
  },
})

const { setTheme, setThemeStatus, setInitState } = themeSlice.actions

export { setTheme, setThemeStatus, setInitState }
export default themeSlice.reducer
