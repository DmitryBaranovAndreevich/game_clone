import { NextFunction, Request, Response } from "express"
import { Reaction } from "../sequelize/sequelize"
import { InCorrectDataError, NotFoundError } from "../errors"

export const createReaction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user
  if (
    !(
      req.body &&
      "emoji" in req.body &&
      "type" in req.body &&
      "typeId" in req.body
    )
  ) {
    throw new InCorrectDataError()
  }
  // prepare object
  const baseData = {
    owner: Number(user),
    reaction: req.body.emoji,
    topicId: undefined,
    commentId: undefined,
    answerId: undefined,
  }

  let reactionData

  // save id in correct field
  switch (req.body.type) {
    case "topic":
      reactionData = { ...baseData, topicId: Number(req.body.typeId) }
      break
    case "comment":
      reactionData = { ...baseData, commentId: Number(req.body.typeId) }
      break
    case "answer":
      reactionData = { ...baseData, answerId: Number(req.body.typeId) }
      break
    default:
      throw new InCorrectDataError()
  }

  Reaction.create(reactionData)
    .then(reaction => {
      if (!reaction) {
        throw new Error("NotValidData")
      }
      res.send({ res: "Reaction was added" })
    })
    .catch(error => {
      console.error("Error creating reaction:", error)
      next(new Error("Reaction was not added"))
    })
}

export const deleteReaction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (
      !(
        req.params &&
        "reaction" in req.params &&
        "type" in req.params &&
        "typeId" in req.params
      )
    ) {
      throw new InCorrectDataError()
    }
    const user = req.user
    const whereCondition: {
      owner: number
      topicId?: number
      commentId?: number
      answerId?: number
      reaction: string
    } = {
      owner: Number(user),
      reaction: decodeURIComponent(req.params.reaction as string),
    }
    switch (req.params.type) {
      case "topic":
        whereCondition["topicId"] = Number(req.params.typeId)
        break
      case "comment":
        whereCondition["commentId"] = Number(req.params.typeId)
        break
      case "answer":
        whereCondition["answerId"] = Number(req.params.typeId)
        break
      default:
        throw new InCorrectDataError()
    }
    Reaction.findOne({ where: whereCondition })
      .then(reaction => {
        if (!reaction) {
          throw new NotFoundError("There is no such reaction")
        }
        return reaction.destroy()
      })
      .then(() => {
        res.send({ res: "Reaction was deleted" })
      })
      .catch(next)
  } catch (error) {
    console.error("Controller error:", error) // Log controller errors
    next(error)
  }
}
