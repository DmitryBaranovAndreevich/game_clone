import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TUser, UserApi } from "../../services/api/user-api"

const fetchUserInfo = createAsyncThunk("user/fetchUserInfo", async () => {
  const userApi = new UserApi()

  try {
    const response = await userApi.getUser()
    return response
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
})

type TLoadStatus = "pending" | "success" | "error"

export type TUserState = {
  info: TUser | null
  status: TLoadStatus | "init"
}

const initialState = {
  info: null,
  status: "init",
} satisfies TUserState as TUserState

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserStatusPending: state => {
      state.status = "pending"
    },
    setUserStatusSuccess: state => {
      state.status = "success"
    },
    setUserStatusError: state => {
      state.status = "error"
    },
    setUserInfo: (state, action: PayloadAction<TUser>) => {
      state.info = action.payload
    },
    setInitState: state => {
      state.info = null
      state.status = "init"
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserInfo.pending, state => {
        state.status = "pending"
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        if (action.payload) {
          state.info = action.payload
        }
        state.status = "success"
      })
      .addCase(fetchUserInfo.rejected, state => {
        state.status = "error"
      })
  },
})

const {
  setUserStatusPending,
  setUserStatusSuccess,
  setUserStatusError,
  setUserInfo,
  setInitState,
} = userSlice.actions

export {
  setUserStatusPending,
  setUserStatusSuccess,
  setUserStatusError,
  setUserInfo,
  setInitState,
  fetchUserInfo,
}
export default userSlice.reducer
