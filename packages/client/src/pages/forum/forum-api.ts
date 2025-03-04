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
  user: { login: string; avatar: string | null }
  title: string
  content: string
  type: "topic" | "answer" | "comment"
  reactions: ProcessedReaction[]
}

export type TReaction = {
  emoji: string
  type: "topic" | "answer" | "comment"
  typeId: number
}
export type ProcessedReaction = {
  emoji: string
  amount: number
  isUserReacted: boolean
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

  addReaction(reaction: TReaction) {
    return this.post<{ res: string }>({ url: `/reaction`, data: reaction })
  }
  deleteReaction(r: TReaction) {
    const test = `/reaction?reaction=${encodeURIComponent(r.emoji)}&type=${r.type}&typeId=${r.typeId}`
    console.log(test)
    return this.delete<{ res: string }>({
      url: `/reaction/${encodeURIComponent(r.emoji)}/${r.type}/${r.typeId}`,
    })
  }
}

export const topicApiInstance = new TopicAPI(BASE_URL)
