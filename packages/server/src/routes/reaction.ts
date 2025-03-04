import { Router } from "express"
import { celebrate, Joi } from "celebrate"
import { createReaction } from "../controllers/reaction"
import { deleteReaction } from "../controllers/reaction"

const router = Router()

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      emoji: Joi.string().required().min(1),
      type: Joi.string().required().min(1),
      typeId: Joi.number().integer().required(),
    }),
  }),
  createReaction,
)

router.delete(
  "/:reaction/:type/:typeId",
  celebrate({
    params: Joi.object().keys({
      reaction: Joi.string().required().min(1),
      type: Joi.string().required().min(1),
      typeId: Joi.number().integer().required(),
    }),
  }),
  deleteReaction,
)
export default router
