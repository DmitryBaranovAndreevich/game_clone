import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TUser } from "../../services/api/user-api"

type TUserState = TUser | null

const initialState = null satisfies TUserState as TUserState

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => (state = action.payload),
    deleteUser: () => null,
  },
})

export default userSlice
