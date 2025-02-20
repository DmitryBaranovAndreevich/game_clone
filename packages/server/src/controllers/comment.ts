import { NextFunction, Request, Response } from "express"
import { Comment, User } from "../sequelize/sequelize"
import { InCorrectDataError } from "../errors"

export const createComment = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //@ts-ignore
  const user = req.user
  console.log("sd")
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

export const getAllComments = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { topicId } = req.params
  Comment.findAll({ where: { parentTopic: topicId } })
    .then(topic => {
      if (!topic) {
        throw new Error("NotValidData")
      }

      Promise.all(
        topic.map(t => User.findOne({ where: { id: t.dataValues.owner } })),
      ).then(users => {
        const allComments = topic.map((t, i) => {
          const { updatedAt, parentTopic, ...rest } = t.dataValues
          return { ...rest, type: "post", owner: users[i]?.dataValues.login }
        })
        res.send(allComments)
      })
    })
    .catch(e => next(e))
}
