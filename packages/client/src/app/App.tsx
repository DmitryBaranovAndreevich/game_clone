import { AntdConfigProvider } from "./antd-config-provider"
import React from "react"
import store from "../store"
import ErrorBoundary from "../components/error-boundary"
import { Provider } from "react-redux"
import { createCache, StyleProvider } from "@ant-design/cssinjs"
import AppRoutes from "./app-routes"

export const cache = createCache()

function App() {
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
