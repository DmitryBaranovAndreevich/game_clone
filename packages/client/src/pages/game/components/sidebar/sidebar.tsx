import { FC, useEffect, useState } from "react"
import { Flex } from "antd"
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons"

const sidebarStyle = {
  backgroundColor: "transparent",
  padding: "10px 0",
  width: "80px",
  height: "100%",
  gap: "36px",
  position: "fixed",
  top: 0,
  bottom: 0,
  right: 0,
}

const iconStyle = {
  fontSize: "36px",
}

export const Sidebar: FC = () => {
  const [isFullscreen, setFullScreen] = useState<boolean>(
    Boolean(document.fullscreenElement),
  )

  // Функция переключения полноэкранного режима
  const toggleFullScreen = async () => {
    try {
      if (!isFullscreen) {
        await document.documentElement.requestFullscreen()
      } else if (document.exitFullscreen) {
        await document.exitFullscreen()
      }
      setFullScreen(!isFullscreen)
    } catch (e) {
      console.error("Error toggling fullscreen mode:", e)
    }
  }

  // Слежение за изменением полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullScreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <Flex style={sidebarStyle} vertical align="center" justify="center">
      {isFullscreen ? (
        <FullscreenExitOutlined style={iconStyle} onClick={toggleFullScreen} />
      ) : (
        <FullscreenOutlined style={iconStyle} onClick={toggleFullScreen} />
      )}
    </Flex>
  )
}
