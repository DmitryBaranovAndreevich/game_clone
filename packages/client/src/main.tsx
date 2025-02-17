import ReactDOM from "react-dom/client"
import App from "./app/App"
import { registerServiceWorker } from "./utils/serviceWorker"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { makeStore } from "./store"

registerServiceWorker()

// 🟢 Получаем предзагруженное состояние Redux из глобального объекта
// @ts-ignore
const preloadedState = (window as never).APP_INITIAL_STATE || "{}"

// 🔵 Десериализуем состояние (с проверкой на безопасность)
const store = makeStore(preloadedState)

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
