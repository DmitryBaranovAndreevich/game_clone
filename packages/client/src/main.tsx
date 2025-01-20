import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app/App"
import { registerServiceWorker } from "./utils/serviceWorker"
import "./index.css"

registerServiceWorker()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
