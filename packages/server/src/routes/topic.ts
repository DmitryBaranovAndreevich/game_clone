import { Router } from "express"
import { celebrate, Joi } from "celebrate"
import { createTopic, getAllTopics } from "../controllers/topic"

const router = Router()

router.get("/", getAllTopics)

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().required().min(1),
      content: Joi.string().required().min(1),
    }),
  }),
  createTopic,
)

export default router
