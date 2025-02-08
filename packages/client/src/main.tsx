import ReactDOM from "react-dom/client"
import App from "./app/App"
import { registerServiceWorker } from "./utils/serviceWorker"
import "./index.css"
import { BrowserRouter } from "react-router-dom"

registerServiceWorker()
ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
