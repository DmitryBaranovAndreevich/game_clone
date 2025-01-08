import { BASE_URL } from "../../constants"
import { BaseRestService } from "../base-rest-service"

const apiInstance = new BaseRestService(BASE_URL)

export class AuthApi {
  logout() {
    return apiInstance.post({ url: "/auth/logout" })
  }
}
