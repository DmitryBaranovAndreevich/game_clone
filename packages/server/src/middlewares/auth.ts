import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { InCorrectPassword } from "../errors"

const { JWT_SECRET = "dev-key" } = process.env

export const auth = (req: Request, _res: Response, next: NextFunction) => {
  const { cookie } = req.headers
  if (!cookie) {
    throw new InCorrectPassword()
  }

  const token = cookie.replace("jwt=", "")
  let payload
  try {
    payload = jwt.verify(token, JWT_SECRET)
  } catch (err) {
    throw new InCorrectPassword()
  }

  if (typeof payload === "object" && "_id" in payload) {
    req.user = payload._id
  }

  next()
}
