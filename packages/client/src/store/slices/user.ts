import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TUser } from "../../services/api/user-api"

type TLoadStatus = "loading" | "success" | "failed"

export type TUserState = {
  item: TUser | null
  status: TLoadStatus | "init"
}

const initialState: TUserState = {
  item: null,
  status: "init",
}

const userSlice = createSlice({
  name: "USER",
  initialState,
  reducers: {
    INIT_STATE: state => {
      state.item = null
      state.status = "init"
    },
    LOADING: state => {
      state.status = "loading"
    },
    SUCCESS: state => {
      state.status = "success"
    },
    FAILED: state => {
      state.status = "failed"
    },
    SET_USER_ITEM: (state, action: PayloadAction<TUser>) => {
      state.item = action.payload
    },
  },
})

export default userSlice
