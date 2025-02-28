import { NextFunction, Request, Response } from "express"
import { Theme } from "../sequelize/sequelize"

export const getTheme = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.query.id)

  return Theme.findOrCreate({
    where: { owner: id },
    defaults: {
      owner: id,
      theme: "default",
    },
  })
    .then(theme => {
      const { createdAt, updatedAt, id, ...rest } = theme[0].dataValues
      res.send(rest)
    })
    .catch(next)
}

export const setTheme = (req: Request, res: Response, next: NextFunction) => {
  const currentTheme = req.body.currentTheme
  const actualTheme = req.body.actualTheme

  return Theme.update(
    {
      theme: actualTheme,
    },
    {
      where: currentTheme,
    },
  )
    .then(theme => {
      res.send(theme)
    })
    .catch(next)
}
