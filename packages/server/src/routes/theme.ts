import { Router } from "express"
import { getTheme, setTheme } from "../controllers/theme"

const router = Router()

router.get("/", getTheme)
router.put("/", setTheme)

export default router
