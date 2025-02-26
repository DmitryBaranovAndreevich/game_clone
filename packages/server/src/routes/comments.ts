import { Router } from "express"
import { celebrate, Joi } from "celebrate"
import {
  addLike,
  createComment,
  deleteLike,
  getAllComments,
} from "../controllers/comment"

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
