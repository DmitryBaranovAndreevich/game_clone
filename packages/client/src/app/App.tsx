import { useEffect } from "react"
import Login from "../pages/login"
import { AntdConfigProvider } from "./antd-config-provider"

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
      <Login />
    </AntdConfigProvider>
  )
}

export default App
