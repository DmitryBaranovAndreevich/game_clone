import { FC, useState } from "react"
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons"
import { useEffectWithAbort } from "../../../../utils/useEffectWithAbort"

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
  useEffectWithAbort(document, "fullscreenchange", () => {
    setFullScreen(Boolean(document.fullscreenElement))
  })

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
