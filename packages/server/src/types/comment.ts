import { ProcessedReaction, ReactionRecord } from "."
import { Model } from "sequelize"

export type TComment = {
  owner: number
  parentTopic: number
  content: string
  commentReactions?: ReactionRecord[]
  processedReaction?: ProcessedReaction[]
}

export interface CommentInstance
  extends Model<
    { id: string; updatedAt?: string; createdAt?: string } & TComment,
    TComment
  > {
  commentReactions?: ReactionRecord[]
  processedReaction?: ProcessedReaction[]
  dataValues: { id: string; updatedAt?: string; createdAt?: string } & TComment
}
