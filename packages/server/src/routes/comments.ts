import { Router } from "express"
import { celebrate, Joi } from "celebrate"
import { createComment, getAllComments } from "../controllers/comment"

const router = Router()

router.get("/:topicId", getAllComments)

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      topic: Joi.string().required(),
      content: Joi.string().required().min(1),
    }),
  }),
  createComment,
)

export default router
