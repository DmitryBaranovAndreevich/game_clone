import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
dotenv.config()
// @ts-ignore
import { createServer as createViteServer, ViteDevServer } from "vite"
import express from "express"
import fs from "node:fs"
import path from "node:path"
import serialize from "serialize-javascript"
import cookieParser from "cookie-parser"
import { celebrate, Joi } from "celebrate"
import { createUser, login, logOut } from "./src/controllers"
import sequelize from "./src/sequelize"
import { auth } from "./src/middlewares"
import { errorHandler } from "./src/helpers"
import topicRouter from "./src/routes/topic"
import commentRouter from "./src/routes/comments"
import answerRouter from "./src/routes/answer"
import reactionRouter from "./src/routes/reaction"
import themeRouter from "./src/routes/theme"
import userRouter from "./src/routes/user"

export const isDev = () => process.env.NODE_ENV === "development"

async function startServer() {
  const corsOptions = {
    origin: [
      "http://84.201.153.103:3001",
      "http://dough-matter-45.ya-praktikum.tech:3001",
    ],
    credentials: true,
  }
  const app = express()
  app.use(cookieParser())
  app.use(cors(corsOptions))
  app.use(express.json())
  try {
    await sequelize.sync({ force: true })
    console.log("Соединение с БД было успешно установлено")
  } catch (e) {
    console.log("Невозможно выполнить подключение к БД: ", e)
  }

  app.post(
    "/signin",
    celebrate({
      body: Joi.object().keys({
        login: Joi.string().required(),
        password: Joi.string().required().min(8),
      }),
    }),
    login,
  )

  app.post(
    "/signup",
    celebrate({
      body: Joi.object().keys({
        second_name: Joi.string().required().min(3).max(20),
        first_name: Joi.string().required().min(3).max(20),
        phone: Joi.string().min(10).max(15),
        email: Joi.string().required().email(),
        login: Joi.string().required(),
        password: Joi.string().required().min(8).max(40),
      }),
    }),
    createUser,
  )

  app.post("/logout", logOut)
  app.use("/resources", express.static(path.resolve("./resources")))
  const port = Number(process.env.SERVER_PORT) || 3001
  let vite: ViteDevServer | undefined
  if (isDev()) {
    const srcPath = path.dirname(require.resolve("client"))
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: "custom",
    })
    app.use(vite!.middlewares)
  }

  if (!isDev()) {
    const distPath = path.dirname(require.resolve("../client/dist/index.html"))
    app.use("/assets", express.static(path.resolve(distPath, "assets")))
  }

  app.get("/", async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        const distPath = path.dirname(
          require.resolve("../client/dist/index.html"),
        )
        template = fs.readFileSync(
          path.resolve(distPath, "index.html"),
          "utf-8",
        )
      } else {
        const srcPath = path.dirname(require.resolve("client"))
        template = fs.readFileSync(path.resolve(srcPath, "index.html"), "utf-8")
        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (
        url: string,
      ) => Promise<{ html: string; initialState: unknown }>
      let renderStyles: () => Promise<string>

      if (!isDev()) {
        const ssrClientPath = require.resolve("../client/ssr-dist/client.cjs")
        const bundle = await import(ssrClientPath)
        render = bundle.render
        renderStyles = bundle.renderStyles
      } else {
        const srcPath = path.dirname(require.resolve("client"))
        const devBundle = await vite!.ssrLoadModule(
          path.resolve(srcPath, "src/ssr.tsx"),
        )
        render = devBundle.render
        renderStyles = devBundle.renderStyles
      }

      const { html: appHtml, initialState } = await render(url)
      const css = await renderStyles()

      const preHtml = template.replace(`<!--styles-outlet-->`, css)
      const html = preHtml
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${serialize(initialState, { isJSON: true })}</script>`,
        )

      res.status(200).set({ "Content-Type": "text/html" }).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.use(helmet())
  app.use(auth)
  app.use("/user", userRouter)
  app.use("/topic", topicRouter)
  app.use("/comments", commentRouter)
  app.use("/answers", answerRouter)
  app.use("/reaction", reactionRouter)
  app.use("/theme", themeRouter)

  app.use(errorHandler)

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
