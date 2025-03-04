import { ProcessedReaction, ReactionRecord } from "."
import { Model } from "sequelize"

export type TAnswer = {
  owner: number
  parentTopic: number
  parentComment: number
  parentAnswer: number
  content: string
  answerReactions?: ReactionRecord[]
  processedReaction?: ProcessedReaction[]
}

export interface AnswerInstance
  extends Model<
    { id: string; updatedAt?: string; createdAt?: string } & TAnswer,
    TAnswer
  > {
  processedReaction?: ProcessedReaction[]
  dataValues: { id: string; updatedAt?: string; createdAt?: string } & TAnswer
}
