import { ErrorRequestHandler } from "express"

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const { statusCode = 500, message } = err
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  })
}
