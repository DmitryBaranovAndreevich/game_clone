import { BASE_URL } from "../../constants"
import { BaseRestService } from "../../services"

export type TTopic = {
  title: string
  content: string
}

class TopicAPI extends BaseRestService {
  createTopic(topic: TTopic) {
    return this.post<{ res: string }>({ url: "/topic", data: topic })
  }

  getAllTopics() {
    return this.get<
      {
        comments: number
        id: string
        updatedAt?: string
        owner: number
        title: string
        content: string
      }[]
    >({ url: "/topic" })
  }

  getAllComments(topicId: string) {
    return this.get<
      {
        comments: number
        id: string
        updatedAt?: string
        owner: string
        title: string
        content: string
      }[]
    >({ url: `/comments/${topicId}` })
  }

  createComments(comment: { topic: string; content: string }) {
    return this.post<{ res: string }>({ url: `/comments`, data: comment })
  }
}

export const topicApiInstance = new TopicAPI(BASE_URL)
