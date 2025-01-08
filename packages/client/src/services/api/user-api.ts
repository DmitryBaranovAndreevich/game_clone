import { BASE_URL } from "../../constants"
import { BaseRestService } from "../base-rest-service"

export type TUser = {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  phone: string
  login: string
  avatar: string | null
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
  getUser() {
    return apiInstance.get({ url: "/auth/user" })
  }
  getAvatar(src: string) {
    return apiInstance.get({ url: `swagger/resources${src}` })
  }
  updateAvatar() {
    return apiInstance.put({ url: "/user/profile/avatar" })
  }
  updateProfile(data: TUpdateProfileRequest) {
    return apiInstance.put({ url: "/user/profile", data: data })
  }
  updatePassword(data: TUpdatePasswordRequest) {
    return apiInstance.put({ url: "/user/password", data: data })
  }
}
