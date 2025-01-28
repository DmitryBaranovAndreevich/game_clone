import { FC, useEffect, useState } from "react"
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons"

const iconStyle = {
  fontSize: "36px",
}

export const FullscreenButton: FC = () => {
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
    <>
      {isFullscreen ? (
        <FullscreenExitOutlined style={iconStyle} onClick={toggleFullScreen} />
      ) : (
        <FullscreenOutlined style={iconStyle} onClick={toggleFullScreen} />
      )}
    </>
  )
}
