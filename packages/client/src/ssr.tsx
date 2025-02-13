import { renderToString } from "react-dom/server"
import App, { cache } from "./app/App"
import { extractStyle } from "@ant-design/cssinjs"
import { StaticRouter } from "react-router-dom"

export const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
export const renderStyles = () => extractStyle(cache)
