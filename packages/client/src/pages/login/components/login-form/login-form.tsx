import { App, Button, Flex, Form, Input, Typography } from "antd"
import { loginApiInstance } from "../../login-api"
import { useRedirect } from "./useRedirect"
import { generatePath, useNavigate } from "react-router-dom"
import styles from "./login-form.module.css"
import { getFormRules } from "../../../../components"

const REGISTER_PAGE = "/register"

export const LoginForm = () => {
  const { passwordFormRules, requiredFieldRule, userLoginFormRules } =
    getFormRules()
  const { notification } = App.useApp()
  const navigateTo = useNavigate()
  const redirect = useRedirect()
  const [form] = Form.useForm<{ password: string; login: string }>()
  const onLogin = async (value: { password: string; login: string }) => {
    try {
      const response = await loginApiInstance.login(value)
      if (response) {
        redirect()
      }
    } catch (e) {
      if (e instanceof Error) {
        notification.error({ message: e.message, placement: "bottomRight" })
      }
    }
  }

  const onSignUpClick = () => {
    navigateTo(generatePath(REGISTER_PAGE))
  }
  return (
    <Flex vertical align={"center"} gap={60}>
      <Typography.Title level={3}>Log in</Typography.Title>
      <Form
        layout={"vertical"}
        form={form}
        className={styles.form}
        onFinish={onLogin}>
        <Form.Item
          label={"Login"}
          name={"login"}
          rules={[requiredFieldRule, userLoginFormRules]}>
          <Input placeholder={"input login"} className={styles.input} />
        </Form.Item>
        <Form.Item
          label={"Password"}
          name={"password"}
          rules={[passwordFormRules, requiredFieldRule]}>
          <Input
            placeholder={"input password"}
            className={styles.input}
            type={"password"}
          />
        </Form.Item>
        <Flex vertical gap={"middle"} className={styles.buttonContainer}>
          <Button type={"primary"} htmlType={"submit"}>
            Sign in
          </Button>
          <Button onClick={onSignUpClick}>Sign up</Button>
        </Flex>
      </Form>
    </Flex>
  )
}
