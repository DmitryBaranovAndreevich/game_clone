import { Router } from "express"
import { celebrate, Joi } from "celebrate"
import { createAnswer } from "../controllers/answer"

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

export default router
