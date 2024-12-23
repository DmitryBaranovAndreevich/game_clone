import { useEffect } from "react"
import { AntdConfigProvider } from "./antd-config-provider"
import { Leaderboard } from "../pages"

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
  return <AntdConfigProvider><Leaderboard  /></AntdConfigProvider>
}

export default App
