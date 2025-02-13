import { useEffect } from "react"
import { useGameContextContext } from "../../useGameContext"
import { INIT_GAME_STATE } from "../../game-utils"

import { Modal, Button, Typography, Flex } from "antd"
import styles from "./game-over.module.css"
import { generatePath, useNavigate } from "react-router-dom"

export const GameOver = () => {
  const navigateTo = useNavigate()
  const { state, setState } = useGameContextContext()
  const { isModalGameOverOpen, gameOver, score } = state

  useEffect(() => {
    if (gameOver) {
      setState(prev => ({
        ...prev,
        isModalGameOverOpen: true,
      }))
    }
  }, [gameOver])

  const closeModal = () => {
    setState(prev => ({
      ...prev,
      isModalGameOverOpen: false,
    }))

    navigateTo(generatePath("/"))
  }
  const restartGame = () => {
    setState(prev => ({
      ...prev,
      ...prev,
      timers: INIT_GAME_STATE.timers,
      initialTime: INIT_GAME_STATE.initialTime,
      currentLevel: INIT_GAME_STATE.currentLevel,
      requiredHits: INIT_GAME_STATE.requiredHits,
      isPaused: INIT_GAME_STATE.isPaused,
      showTime: INIT_GAME_STATE.showTime,
      gameOver: INIT_GAME_STATE.gameOver,
      elapsedTime: INIT_GAME_STATE.elapsedTime,
      shipPosition: INIT_GAME_STATE.shipPosition,
      bullets: INIT_GAME_STATE.bullets,
      cookies: INIT_GAME_STATE.cookies,
      stars: INIT_GAME_STATE.stars,
      score: INIT_GAME_STATE.score,
      levelScore: INIT_GAME_STATE.levelScore,
      isModalGameOverOpen: INIT_GAME_STATE.isModalGameOverOpen,
    }))
  }

  return (
    <Modal
      open={isModalGameOverOpen}
      footer={null}
      closeIcon={null}
      centered
      onOk={closeModal}
      onCancel={closeModal}>
      <Flex vertical gap={60} align="center" justify="center">
        <Typography.Title level={3}>Game Over</Typography.Title>
        <Flex justify="space-between" className={styles.score}>
          <span>Current Score</span>
          <span>{score}</span>
        </Flex>
        <Flex justify="space-between" className={styles.score}>
          <span>Best Score</span>
          <span>{score}</span>
        </Flex>
        <Typography.Title
          level={3}
          className={styles.customText}
          onClick={restartGame}>
          CLICK TO
          <br />
          START NEW GAME
        </Typography.Title>
        <Button className={styles.button} onClick={closeModal}>
          Start Page
        </Button>
      </Flex>
    </Modal>
  )
}
