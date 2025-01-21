import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./app/App"
import { registerServiceWorker } from "./utils/serviceWorker"
import "./index.css"
import store from "./store"
import ErrorBoundary from "./components/error-boundary"

registerServiceWorker()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary fallback={<h1 style={{ color: "white" }}>error</h1>}>
        <App />
      </ErrorBoundary>
    </Provider>
    ,
  </React.StrictMode>,
)
