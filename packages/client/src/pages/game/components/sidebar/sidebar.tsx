import { CSSProperties, FC, useEffect, useState } from "react"
import { Flex } from "antd"
import { PauseButton } from "../pauseButton"
import { FullscreenButton } from "../fullScreenButton"

const sidebarStyle: CSSProperties = {
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

export const Sidebar: FC = () => {
  return (
    <Flex style={sidebarStyle} vertical align="center" justify="center">
      <FullscreenButton />
      <PauseButton />
    </Flex>
  )
}
