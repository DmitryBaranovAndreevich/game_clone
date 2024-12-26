import { Button, Typography, Flex } from "antd"
import styles from "./game-over.module.css"
import sideCrazyCrackerIcon from "../../assets/images/image/sideCrazyCrackerIcon.png"

const GameOver = () => {
  return (
    <Flex
      vertical
      align={"center"}
      justify={"center"}
      gap={60}
      className={styles.scorePage}>
      <Typography.Title level={2}>Game Over</Typography.Title>
      <Flex vertical gap={60} className={styles.score}>
        <Flex justify={"space-between"}>
          Current Score <span>200</span>
        </Flex>
        <Flex justify={"space-between"}>
          Best Score <span>100500</span>
        </Flex>
      </Flex>
      <Button className={styles.button}>New Game</Button>
      <img
        src={sideCrazyCrackerIcon}
        className={styles.sideCrazyCrackerIcon}
        alt="Side Crazy CrackerIcon"
      />
    </Flex>
  )
}

export default GameOver
