import { BASE_URL, URI_OAUTH } from "../../constants"
import { BaseRestService } from "../base-rest-service"

const apiInstance = new BaseRestService(BASE_URL)

export class AuthApi {
  logout() {
    return apiInstance.post({ url: "/auth/logout" })
  }

  getServiceIdOAuth() {
    apiInstance
      .get({
        url: `/oauth/yandex/service-id`,
        data: {
          redirect_uri: URI_OAUTH,
        },
      })
      .then(response => {
        const typedResponse = response as { service_id?: string }
        if (typedResponse.service_id) {
          const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${typedResponse.service_id}&redirect_uri=${encodeURIComponent(URI_OAUTH)}`
          window.location.href = authUrl
        }
      })
  }

  oauthSignIn(code: string) {
    return apiInstance.post({
      url: `/oauth/yandex`,
      data: {
        code: code,
        redirect_uri: URI_OAUTH,
      },
    })
  }
}
