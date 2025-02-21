import { RootState } from "./index"

export const getUserInfo = (state: RootState) => state.user.info

export const getUserId = (state: RootState) => state.user.info?.id
