import { BaseRestService } from "../../services"

export const BASE_URL = "https://ya-praktikum.tech/api/v2"

const registerApiInstance = new BaseRestService(BASE_URL)

export type TLoginUserRequest = {
  login: "string"
  password: "string"
}

export const login = (user: TLoginUserRequest) => {
  return registerApiInstance.post({ url: "/auth/signin", data: user })
}
