import { NextFunction, Request, Response } from "express"
import { Answer, Comment, User, Reaction } from "../sequelize/sequelize"
import { InCorrectDataError } from "../errors"
import { IUser, TAnswer, ReactionRecord, ProcessedReaction } from "../types"

export const createComment = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user
  if (!(req.body && "topic" in req.body && "content" in req.body)) {
    throw new InCorrectDataError()
  }

  Comment.create({
    owner: Number(user),
    parentTopic: Number(req.body.topic),
    content: req.body.content,
  })
    .then(topic => {
      if (!topic) {
        throw new Error("NotValidData")
      }
      res.send({ res: "Comment was add" })
    })
    .catch(() => {
      next(new Error("Topic was not add"))
    })
}

type TFullAnswer = {
  id: string
  updatedAt?: string
  createdAt?: string
  comments?: TFullAnswer[]
  type?: string
  user?: { login?: string; avatar?: string | null }
  reactions: ProcessedReaction[]
} & TAnswer

export const getAllComments = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user
  const { topicId } = req.params
  Promise.all([
    Comment.findAll({
      where: { parentTopic: topicId },
      include: [
        {
          model: User,
          required: true,
        },
        {
          model: Reaction,
          required: false,
          as: "commentReactions",
        },
      ],
      order: [["createdAt", "DESC"]],
    }),
    Answer.findAll({
      include: [
        {
          model: User,
          required: true,
        },
        {
          model: Reaction,
          required: false,
          as: "answerReactions",
        },
      ],
      order: [["createdAt", "DESC"]],
    }),
  ])
    .then(([comment, answers]) => {
      if (!comment) {
        throw new Error("NotValidData")
      }

      // reaction proccesing
      const processReactions = (reactions: ReactionRecord[]) => {
        const groupedReactions: Record<string, ProcessedReaction> = {}
        reactions.forEach(reaction => {
          const emoji = reaction.reaction
          if (!groupedReactions[emoji]) {
            groupedReactions[emoji] = {
              emoji,
              amount: 0,
              isUserReacted: false,
            }
          }
          groupedReactions[emoji].amount++
          if (reaction.owner === Number(user)) {
            groupedReactions[emoji].isUserReacted = true
          }
        })

        return Object.values(groupedReactions)
      }

      const allComments = comment.map(t => {
        const allCommentTopic = answers
          .filter(
            an =>
              String(an.dataValues.parentComment) === String(t.dataValues.id),
          )
          .map(el => ({
            ...el.dataValues,
            user:
              "user" in el.dataValues
                ? {
                    login: (el.dataValues.user as IUser).login,
                    avatar: (el.dataValues.user as IUser).avatar,
                  }
                : {},
            // call process reactions
            reactions: processReactions(el.dataValues.answerReactions || []),
            commentReactions: undefined,
          }))

        const topicTree = allCommentTopic.reduce(
          (acc, data) => {
            if (data.parentAnswer !== null) {
              const parentComment = data.parentAnswer
              acc[parentComment] = !acc[parentComment]
                ? [data]
                : [...acc[parentComment], data]
            }

            return acc
          },
          {} as Record<string, TFullAnswer[]>,
        )
        const stack: TFullAnswer[] = [
          ...allCommentTopic.map(el => ({
            ...el,
            comments: [] as TFullAnswer[],
            type: "answer",
          })),
        ]

        const rootArr = stack.filter(el => el.parentAnswer === null)
        while (stack.length > 0) {
          const current = stack.pop()
          if (current) {
            const newEl = [...(topicTree[String(current.id)] || [])]
            current["comments"] = newEl
            current["type"] = "answer"
            stack.push(...newEl)
          }
        }
        const { updatedAt, parentTopic, ...rest } = t.dataValues
        return {
          ...rest,
          user:
            "user" in rest
              ? {
                  login: (rest.user as IUser).login,
                  avatar: (rest.user as IUser).avatar,
                }
              : {},
          type: "comment",
          comments: rootArr,
          reactions: processReactions(t.dataValues.commentReactions || []),
          answerReations: undefined,
        }
      })
      res.send(allComments)
    })
    .catch(e => next(e))
}
