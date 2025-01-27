import { FC } from "react"
import { generatePath, useNavigate } from "react-router-dom"
import { useGameContextContext } from "../../useGameContext"
import { Button, Flex, Modal, Typography } from "antd"
import styles from "./style.module.css"

const buttonStyle = {
  width: "100%",
  maxWidth: "345px",
  marginBottom: "50px",
  backgroundColor: "transparent",
}

export const PauseModal: FC = () => {
  const navigateTo = useNavigate()
  const { state, setState } = useGameContextContext()

  const togglePause = () => {
    setState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }))
  }

  return (
    <Modal
      centered
      open={state.isPaused}
      footer={null}
      closeIcon={null}
      onCancel={togglePause}>
      <Flex vertical align="center" justify="center" gap={60}>
        <Typography.Title level={3}>PAUSE</Typography.Title>
        <Typography.Title
          level={3}
          className={styles.customText}
          onClick={togglePause}>
          CLICK TO
          <br />
          CONTINUE
        </Typography.Title>
        <Button
          onClick={() => {
            navigateTo(generatePath("/"))
          }}
          style={buttonStyle}>
          Start Page
        </Button>
      </Flex>
    </Modal>
  )
}
