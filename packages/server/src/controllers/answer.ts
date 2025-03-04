import { NextFunction, Request, Response } from "express"
import { InCorrectDataError } from "../errors"
import { Answer } from "../sequelize/sequelize"

export const createAnswer = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user
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
