import { FC } from "react"
import { Button, Typography, Flex } from "antd"
import styles from "./style.module.css"

type TComponentProps = {
  id: string
  title: string
  subtitle: string
}

const ErrorPage: FC<TComponentProps> = ({ id, title, subtitle }) => {
  return (
    <Flex
      id={id}
      vertical
      justify={"center"}
      align={"center"}
      className={styles.container}>
      <Typography.Title level={2}>{title}</Typography.Title>
      <Typography.Title level={3}>{subtitle}</Typography.Title>
      <Button className={styles.button} ghost>
        Back
      </Button>
    </Flex>
  )
}

export default ErrorPage
