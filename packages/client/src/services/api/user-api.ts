import { BASE_URL } from "../../constants"
import { BaseRestService } from "../base-rest-service"

export type TUser = {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  phone: string
  login: string
  avatar?: string | null
  email: string
}

export type TUpdateProfileRequest = {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export type TUpdatePasswordRequest = {
  oldPassword: string
  newPassword: string
}

const apiInstance = new BaseRestService(BASE_URL)

export class UserApi {
  getUser(): Promise<TUser | null> {
    return apiInstance.get({ url: "/user" })
  }
  updateProfile(data: TUpdateProfileRequest): Promise<TUser | null> {
    return apiInstance.put({ url: "/user/profile", data: data })
  }
  updatePassword(data: TUpdatePasswordRequest) {
    return apiInstance.put({ url: "/user/password", data: data })
  }
}
