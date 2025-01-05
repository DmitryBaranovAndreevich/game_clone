import { BASE_URL } from "../../constants"
import { BaseRestService } from "../../services"

export type TLoginUserRequest = {
  login: string
  password: string
}

class LoginAPI extends BaseRestService {
  login(user: TLoginUserRequest) {
    return this.post({ url: "/auth/signin", data: user })
  }
}

export const loginApiInstance = new LoginAPI(BASE_URL)
