import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
import { createServer as createViteServer, ViteDevServer } from "vite"
import express from "express"
import fs from "node:fs"
import path from "node:path"

const isDev = () => process.env.NODE_ENV === "development"

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001
  const srcPath = path.dirname(require.resolve("client"))
  let vite: ViteDevServer | undefined
  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: "custom",
    })
    app.use(vite!.middlewares)
  }

  if (!isDev()) {
    const distPath = path.dirname(require.resolve("client/dist/index.html"))
    app.use("/assets", express.static(path.resolve(distPath, "assets")))
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        const distPath = path.dirname(require.resolve("client/dist/index.html"))
        template = fs.readFileSync(
          path.resolve(distPath, "index.html"),
          "utf-8",
        )
      } else {
        template = fs.readFileSync(path.resolve(srcPath, "index.html"), "utf-8")
        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (url: string) => Promise<string>
      let renderStyles: () => Promise<string>

      if (!isDev()) {
        const ssrClientPath = require.resolve("client/ssr-dist/client.cjs")
        const bundle = await import(ssrClientPath)
        render = bundle.render
        renderStyles = bundle.renderStyles
      } else {
        const devBundle = await vite!.ssrLoadModule(
          path.resolve(srcPath, "src/ssr.tsx"),
        )
        render = devBundle.render
        renderStyles = devBundle.renderStyles
      }

      const appHtml = await render(url)
      const css = await renderStyles()

      const preHtml = template.replace(`<!--styles-outlet-->`, () => css)
      const html = preHtml.replace(`<!--ssr-outlet-->`, () => appHtml)

      res.status(200).set({ "Content-Type": "text/html" }).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }

      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
