import { Button, Flex, Form, Input, Typography } from "antd"
import styles from "./login-form.module.css"

export const LoginForm = () => {
  const [form] = Form.useForm<{ password: string; login: string }>()
  const onLogin = (value: { password: string; login: string }) => {
    console.log(value)
  }
  return (
    <Flex vertical align={"center"} gap={60}>
      <Typography.Title>Log in</Typography.Title>
      <Form
        layout={"vertical"}
        form={form}
        className={styles.form}
        onFinish={onLogin}>
        <Form.Item label={"Login"} name={"login"}>
          <Input placeholder="input login" />
        </Form.Item>
        <Form.Item label={"Password"} name={"password"}>
          <Input placeholder="input password" />
        </Form.Item>
        <Flex vertical gap={"middle"} className={styles.buttonContainer}>
          <Button type={"primary"} htmlType="submit">
            Sign in
          </Button>
          <Button ghost>Sign up</Button>
        </Flex>
      </Form>
    </Flex>
  )
}
