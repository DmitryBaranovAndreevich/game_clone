import { NextFunction, Request, Response } from "express"
import { Topic, Comment, Answer } from "../sequelize/sequelize"
import { InCorrectDataError } from "../errors"
import escape from "escape-html"

export const createTopic = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user
  if (!(req.body && "title" in req.body && "content" in req.body)) {
    throw new InCorrectDataError()
  }

  return Topic.create({
    title: escape(req.body.title),
    content: escape(req.body.content),
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

      Promise.all([
        Promise.all(
          topic.map(t =>
            Comment.findAll({ where: { parentTopic: t.dataValues.id } }),
          ),
        ),
        Promise.all(
          topic.map(t =>
            Answer.findAll({ where: { parentTopic: t.dataValues.id } }),
          ),
        ),
      ]).then(([allComments, allAnswers]) => {
        const allTopics = topic.map((t, i) => {
          const { createdAt, ...rest } = t.dataValues
          return {
            ...rest,
            comments: allComments[i].length + allAnswers[i].length,
          }
        })
        res.send(allTopics)
      })
    })
    .catch(next)
}
