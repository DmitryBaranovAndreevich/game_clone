import { BASE_URL } from "../../constants"
import { BaseRestService } from "../../services"

export type TTopic = {
  title: string
  content: string
}

export type TMessage = {
  comments?: TMessage[]
  id: string
  updatedAt?: string
  owner: string
  user: { login: string }
  title: string
  content: string
  type: string
  likes: number[]
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
    return this.get<TMessage[]>({ url: `/comments/${topicId}` })
  }

  createComments(comment: { topic: string; content: string }) {
    return this.post<{ res: string }>({ url: `/comments`, data: comment })
  }

  createAnswer(answer: {
    topic: string
    content: string
    comment: string
    answer: string | null
  }) {
    return this.post<{ res: string }>({ url: `/answers`, data: answer })
  }

  addCommentLike(id: string) {
    return this.put<{ res: string }>({ url: `/comments/${id}/likes` })
  }

  addAnswerLike(id: string) {
    return this.put<{ res: string }>({ url: `/answers/${id}/likes` })
  }

  deleteCommentLike(id: string) {
    return this.delete<{ res: string }>({ url: `/comments/${id}/likes` })
  }

  deleteAnswerLike(id: string) {
    return this.delete<{ res: string }>({ url: `/answers/${id}/likes` })
  }
}

export const topicApiInstance = new TopicAPI(BASE_URL)
