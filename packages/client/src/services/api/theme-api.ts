import { BASE_URL } from "../../constants"
import { BaseRestService } from "../base-rest-service"

export type TTheme = {
  theme: string
  owner: number
}

const apiInstance = new BaseRestService(BASE_URL)

export class ThemeApi {
  getTheme(data: { id: string }): Promise<TTheme> {
    return apiInstance.get({ url: "/theme", data })
  }
  setTheme(currentTheme: TTheme, actualTheme: string): Promise<TTheme> {
    return apiInstance.put({
      url: "/theme",
      data: {
        currentTheme,
        actualTheme,
      },
    })
  }
}
