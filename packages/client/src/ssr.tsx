import { renderToString } from "react-dom/server"
import App, { cache } from "./app/App"
import { extractStyle } from "@ant-design/cssinjs"
import { StaticRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { makeStore } from "./store"

export const render = (url: string) => {
  const preloadedState = window.APP_INITIAL_STATE || "{}"
  const store = makeStore(preloadedState) // Начальное состояние
  const initialState = store.getState()

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>,
  )

  return { html, initialState }
}

export const renderStyles = () => extractStyle(cache)
