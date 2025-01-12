import { Button, Flex, Typography } from "antd"
import { generatePath, useNavigate } from "react-router-dom"
import styles from "./register-controls.module.css"

const LOGIN_PAGE = "/login"

export const RegisterControls = () => {
  const navigateTo = useNavigate()
  const onSignInClick = () => {
    navigateTo(generatePath(LOGIN_PAGE))
  }
  return (
    <Flex vertical gap={80} align={"center"}>
      <Typography.Title>Sign up</Typography.Title>
      <Flex vertical gap={"middle"} className={styles.buttonContainer}>
        <Button type={"primary"} htmlType={"submit"}>
          Sign up
        </Button>
        <Button onClick={onSignInClick}>Sign in</Button>
      </Flex>
    </Flex>
  )
}
