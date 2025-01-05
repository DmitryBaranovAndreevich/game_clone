import { BASE_URL } from "../../constants"
import { BaseRestService } from "../../services"
import { TRegisterRequestParams } from "./register-types"

const registerApiInstance = new BaseRestService(BASE_URL)

export class RegisterAPI {
  create(user: TRegisterRequestParams) {
    return registerApiInstance.post({ url: "/auth/signup", data: user })
  }
}
