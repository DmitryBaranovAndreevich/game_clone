import { NextFunction, Request, Response } from "express"
import { Answer, Comment, User } from "../sequelize/sequelize"
import { InCorrectDataError, NotFoundError } from "../errors"
import { IUser, TAnswer } from "../types"

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
    likes: [],
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
} & TAnswer

export const getAllComments = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { topicId } = req.params
  Promise.all([
    Comment.findAll({
      where: { parentTopic: topicId },
      include: [
        {
          model: User,
          required: true,
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
      ],
      order: [["createdAt", "DESC"]],
    }),
  ])
    .then(([comment, answers]) => {
      if (!comment) {
        throw new Error("NotValidData")
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
            type: "post",
          })),
        ]

        const rootArr = stack.filter(el => el.parentAnswer === null)
        while (stack.length > 0) {
          const current = stack.pop()
          if (current) {
            const newEl = [...(topicTree[String(current.id)] || [])]
            current["comments"] = newEl
            current["type"] = "comment"
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
          type: "post",
          comments: rootArr,
        }
      })
      res.send(allComments)
    })
    .catch(e => next(e))
}

export const addLike = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user
  const { cardId } = req.params
  Comment.findOne({ where: { id: cardId } })
    .then(comment => {
      if (!comment) {
        throw new NotFoundError("Нет коммента с таким id")
      }
      const likes = comment.dataValues.likes
      comment.set({ likes: [...likes, Number(user)] })

      return comment.save()
    })
    .then(comment => {
      res.send(comment.dataValues)
    })
    .catch(next)
}

export const deleteLike = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user
  const { cardId } = req.params
  Comment.findOne({ where: { id: cardId } })
    .then(comment => {
      if (!comment) {
        throw new NotFoundError("Нет коммента с таким id")
      }
      const likes = comment.dataValues.likes
      comment.set({ likes: likes.filter(like => like !== Number(user)) })

      return comment.save()
    })
    .then(comment => {
      res.send(comment.dataValues)
    })
    .catch(next)
}
