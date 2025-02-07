import { BASE_URL } from "../../constants"
import { TLeaderboardItem } from "../../pages/leaderboard"
import { BaseRestService } from "../base-rest-service"

export const LEADERBOARD_ENDPOINT = "/leaderboard"
export const RATING_FIELD_NAME = "Dough_Matter_Rating"
export const TEAM_NAME = "Dough_Matter"

export type TAddLeaderData = {
  score: number | null
  name: string | null
  id: number | null
}
export type TLeaderboardRequest = {
  ratingFieldName: string
  cursor: number
  limit: number
}

const apiInstance = new BaseRestService(BASE_URL)

export class LeaderboardApi {
  addLeader(data: TAddLeaderData) {
    return apiInstance.post({
      url: LEADERBOARD_ENDPOINT,
      data: {
        data: data,
        ratingFieldName: "score",
        teamName: TEAM_NAME,
      },
    })
  }
  getAll(): Promise<TLeaderboardItem[] | []> {
    return apiInstance.post({
      url: `${LEADERBOARD_ENDPOINT}/all`,
      data: {
        ratingFieldName: "score",
        cursor: 0,
        limit: 100,
      },
    })
  }
  getTeam(): Promise<TLeaderboardItem[] | []> {
    return apiInstance.post({
      url: `${LEADERBOARD_ENDPOINT}/${TEAM_NAME}`,
      data: {
        ratingFieldName: "score",
        cursor: 0,
        limit: 100,
      },
    })
  }
}
