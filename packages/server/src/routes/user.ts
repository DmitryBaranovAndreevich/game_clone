import { Router } from "express"
import { celebrate, Joi } from "celebrate"
import {
  getUser,
  updateAvatarUser,
  updateUser,
  updateUserPassword,
} from "../controllers"
import multer from "multer"
const multerMiddleware = multer({ dest: "./resources" })

const router = Router()

router.get("/", getUser)

router.put(
  "/profile",
  celebrate({
    body: Joi.object().keys({
      second_name: Joi.string().min(3).max(20),
      first_name: Joi.string().min(3).max(20),
      phone: Joi.string().min(10).max(15),
      email: Joi.string().email(),
      login: Joi.string(),
      display_name: Joi.string(),
    }),
  }),
  updateUser,
)

router.put(
  "/password",
  celebrate({
    body: Joi.object().keys({
      oldPassword: Joi.string().required().min(8).max(40),
      newPassword: Joi.string().required().min(8).max(40),
    }),
  }),
  updateUserPassword,
)

router.put(
  "/profile/avatar",
  //@ts-ignore
  //проблема с типами multer, открыты несколько issues  https://github.com/DefinitelyTyped/DefinitelyTyped/issues/43897
  //стабильного решения пока нет
  multerMiddleware.single("avatar"),
  updateAvatarUser,
)

export default router
