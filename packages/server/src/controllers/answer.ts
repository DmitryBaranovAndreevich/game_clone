import { NextFunction, Request, Response } from "express"
import { InCorrectDataError, NotFoundError } from "../errors"
import { Answer } from "../sequelize/sequelize"

export const createAnswer = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //@ts-ignore
  const user = req.user
  console.log("sd")
  if (
    !(
      req.body &&
      "topic" in req.body &&
      "comment" in req.body &&
      "content" in req.body &&
      "answer" in req.body
    )
  ) {
    throw new InCorrectDataError()
  }
  Answer.create({
    owner: Number(user),
    parentTopic: Number(req.body.topic),
    content: req.body.content,
    parentComment: req.body.comment,
    parentAnswer: req.body.answer,
    likes: [],
  })
    .then(topic => {
      if (!topic) {
        throw new Error("NotValidData")
      }
      res.send({ res: "Answer was add" })
    })
    .catch(() => {
      next(new Error("Answer was not add"))
    })
}

export const addLike = (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const user = req.user
  const { cardId } = req.params
  Answer.findOne({ where: { id: cardId } })
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
  //@ts-ignore
  const user = req.user
  const { cardId } = req.params
  Answer.findOne({ where: { id: cardId } })
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
