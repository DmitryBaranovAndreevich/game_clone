import { AntdConfigProvider } from "./antd-config-provider"
import React from "react"
import ErrorBoundary from "../components/error-boundary"
import { Provider } from "react-redux"
import { createCache, StyleProvider } from "@ant-design/cssinjs"
import AppRoutes from "./app-routes"
import { makeStore } from "../store"

export const cache = createCache()

function App() {
  // @ts-ignore
  const preloadedState = (window as never).APP_INITIAL_STATE || "{}"
  const store = makeStore(preloadedState)

  return (
    <React.StrictMode>
      <StyleProvider cache={cache}>
        <Provider store={store}>
          <ErrorBoundary fallback={<h1 style={{ color: "white" }}>error</h1>}>
            <AntdConfigProvider>
              <AppRoutes />
            </AntdConfigProvider>
          </ErrorBoundary>
        </Provider>
      </StyleProvider>
    </React.StrictMode>
  )
}

export default App
