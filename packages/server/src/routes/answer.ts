import { Router } from "express"
import { celebrate, Joi } from "celebrate"
import { addLike, createAnswer, deleteLike } from "../controllers/answer"

const router = Router()

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      topic: Joi.string().required(),
      comment: Joi.required(),
      content: Joi.string().required(),
      answer: Joi.required(),
    }),
  }),
  createAnswer,
)

router.put(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().required(),
    }),
  }),
  addLike,
)

router.delete(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().required(),
    }),
  }),
  deleteLike,
)

export default router
