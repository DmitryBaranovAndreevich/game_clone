import { useGameContextContext } from "../../useGameContext"
import { Flex } from "antd"
import { PlayCircleOutlined, PauseOutlined } from "@ant-design/icons"

const pauseStyle = {
  backgroundColor: "transparent",
  padding: "40px 0",
  width: "80px",
  height: "100%",
  gap: "36px",
  position: "fixed",
  top: 0,
  bottom: 0,
  right: 50,
}

const iconStyle = {
  fontSize: "36px",
}

export const PauseButton = () => {
  const { state, setState } = useGameContextContext()

  const togglePause = () => {
    setState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }))
  }

  return (
    <Flex style={pauseStyle} vertical align="center" justify="center">
      {state.isPaused ? (
        <PlayCircleOutlined style={iconStyle} onClick={togglePause} />
      ) : (
        <PauseOutlined style={iconStyle} onClick={togglePause} />
      )}
    </Flex>
  )
}
