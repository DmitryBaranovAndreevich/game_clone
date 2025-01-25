import { useGameContextContext } from "../../useGameContext"
import { PlayCircleOutlined, PauseOutlined } from "@ant-design/icons"

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
    <>
      {state.isPaused ? (
        <PlayCircleOutlined style={iconStyle} onClick={togglePause} />
      ) : (
        <PauseOutlined style={iconStyle} onClick={togglePause} />
      )}
    </>
  )
}
