import { FC, useState } from "react"
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

  const toggleFullScreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen().then(
        () => {
          setFullScreen(true)
        },
        e => {
          console.log(e)
        },
      )
    } else if (isFullscreen && document.exitFullscreen) {
      document.exitFullscreen()
      setFullScreen(false)
    }
  }

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
