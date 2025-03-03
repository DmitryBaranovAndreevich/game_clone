//table type
export type ReactionRecord = {
  owner: number
  topicId: number | null
  commentId: number | null
  answerId: number | null
  reaction: string
}

// data that we getting from frontend
export interface IncomingReaction {
  id: number
  type: string
  userId: string
  commentId?: number
  answerId?: number
}

//data that we will return
export interface ProcessedReaction {
  emoji: string
  amount: number
  isUserReacted: boolean
}
