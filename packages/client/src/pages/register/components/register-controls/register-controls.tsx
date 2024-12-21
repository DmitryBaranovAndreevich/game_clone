import { Button, Flex, Typography } from "antd"
import styles from "./register-controls.module.css"

export const RegisterControls = () => {
  return (
    <Flex vertical gap={80} align={"center"}>
      <Typography.Title>Sign up</Typography.Title>
      <Flex vertical gap={"middle"} className={styles.buttonContainer}>
        <Button type={"primary"} htmlType={"submit"}>
          Sign up
        </Button>
        <Button ghost>Sign in</Button>
      </Flex>
    </Flex>
  )
}
