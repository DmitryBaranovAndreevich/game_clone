import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { NextFunction, Request, Response } from "express"
import {
  InCorrectDataError,
  EmailDuplicate,
  NotFoundError,
  InCorrectPassword,
} from "../errors"
import { IUser } from "../types"
import { User } from "../sequelize"

const { JWT_SECRET = "dev-key" } = process.env

const JWT = "jwt"

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { login, password } = req.body
  return User.findOne({ where: { login } })
    .then(user => {
      if (!user) {
        throw new NotFoundError("Логин или пароль не верные")
      }
      return bcrypt
        .compare(password, user.dataValues.password)
        .then(matched => {
          if (!matched) {
            throw new InCorrectPassword()
          }
          const token = jwt.sign({ _id: user.dataValues.id }, JWT_SECRET, {
            expiresIn: "7d",
          })
          res
            .cookie(JWT, token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
            .end()
        })
    })
    .catch(next)
}

export const logOut = (_req: Request, res: Response) => {
  return res.clearCookie(JWT).end()
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  if (!(req.body && "email" in req.body && "password" in req.body)) {
    throw new InCorrectDataError()
  }

  const { password, ...any } = req.body as IUser
  bcrypt
    .hash(password, 10)
    .then((hash: string) => {
      return User.create({ ...any, password: hash, avatar: null })
    })
    .then(user => {
      const { password, updatedAt, createdAt, ...rest } = user.dataValues
      if (!user) {
        throw new Error("NotValidData")
      }
      const token = jwt.sign({ _id: user.dataValues.id }, JWT_SECRET, {
        expiresIn: "7d",
      })
      res
        .cookie("jwt", token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
        .send(rest)
    })
    .catch((err: { message: string; code: number }) => {
      if (err.code === 11000) {
        next(new EmailDuplicate())
      }
      if (err.message === "NotValidData") {
        next(new InCorrectDataError())
      } else {
        next(new Error())
      }
    })
}

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user
  return User.findOne({ where: { id: user } })
    .then(user => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден")
      }
      const { createdAt, updatedAt, password, ...rest } = user.dataValues
      res.send(rest)
    })
    .catch(next)
}

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user
  return User.findOne({ where: { id: user } })
    .then(user => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден")
      }

      user.set({ ...req.body })

      return user.save()
    })
    .then(user => {
      const { createdAt, updatedAt, password, ...rest } = user.dataValues
      res.send(rest)
    })
    .catch(next)
}

export const updateAvatarUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user
  return User.findOne({ where: { id: user } })
    .then(user => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден")
      }

      if (req.file) {
        user.set({ avatar: `/${req.file.filename}` })
      }

      return user.save()
    })
    .then(user => {
      const { createdAt, updatedAt, password, ...rest } = user.dataValues
      res.send(rest)
    })
    .catch(next)
}

export const updateUserPassword = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user
  return User.findOne({ where: { id: user } })
    .then(user => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден")
      }

      return bcrypt
        .compare(req.body.oldPassword, user.dataValues.password)
        .then(matched => {
          if (!matched) {
            throw new InCorrectPassword()
          }

          bcrypt
            .hash(req.body.newPassword, 10)
            .then((hash: string) => {
              user.set({ password: hash })

              return user.save()
            })
            .then(user => {
              const { createdAt, updatedAt, password, ...rest } =
                user.dataValues
              res.send(rest)
            })
        })
    })
    .catch(next)
}
