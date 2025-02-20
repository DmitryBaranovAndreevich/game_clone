import { NextFunction, Request, Response } from "express"
import { Topic, Comment } from "../sequelize/sequelize"
import { InCorrectDataError } from "../errors"

export const createTopic = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //@ts-ignore
  const user = req.user
  if (!(req.body && "title" in req.body && "content" in req.body)) {
    throw new InCorrectDataError()
  }

  return Topic.create({
    title: req.body.title,
    content: req.body.content,
    owner: Number(user),
  })
    .then(topic => {
      if (!topic) {
        throw new Error("NotValidData")
      }
      res.send({ res: "Topic was create" })
    })
    .catch(() => {
      next(new Error("Topic was not created"))
    })
}

export const getAllTopics = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  Topic.findAll()
    .then(topic => {
      if (!topic) {
        throw new Error("NotValidData")
      }

      Promise.all(
        topic.map(t =>
          Comment.findAll({ where: { parentTopic: t.dataValues.id } }),
        ),
      ).then(allComments => {
        const allTopics = topic.map((t, i) => {
          const { createdAt, ...rest } = t.dataValues
          return { ...rest, comments: allComments[i].length }
        })
        res.send(allTopics)
      })
    })
    .catch(e => next(e))
}
