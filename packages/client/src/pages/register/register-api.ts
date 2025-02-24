import { BASE_URL } from "../../constants"
import { BaseRestService } from "../../services"
import { TUser } from "../../services/api/user-api"
import { TRegisterRequestParams } from "./register-types"

const registerApiInstance = new BaseRestService(BASE_URL)

export class RegisterAPI {
  create(user: TRegisterRequestParams) {
    return registerApiInstance.post<TUser>({ url: "/signup", data: user })
  }
}
