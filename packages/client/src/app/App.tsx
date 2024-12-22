import { useEffect } from "react"
import { AntdConfigProvider } from "./antd-config-provider"
import { Routes, Route } from "react-router-dom"
import {
  LoginPage,
  NonFoundPage,
  ServerErrorPage,
  NavigationPage,
} from "../pages"

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <AntdConfigProvider>
      <Routes>
        <Route path="/" element={<NavigationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/server-error" element={<ServerErrorPage />} />
        <Route path="/*" element={<NonFoundPage />} />
      </Routes>
    </AntdConfigProvider>
  )
}

export default App
