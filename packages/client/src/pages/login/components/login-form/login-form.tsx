import { App, Button, Flex, Form, Input, Typography } from "antd"
import { loginApiInstance } from "../../login-api"
import { useRedirect } from "./useRedirect"
import { generatePath, useNavigate } from "react-router-dom"
import styles from "./login-form.module.css"
import { getFormRules } from "../../../../components"
import { UserApi } from "../../../../services/api/user-api"
import { useDispatch } from "react-redux"
import userSlice from "../../../../store/slices/user"
import store from "../../../../store"

const REGISTER_PAGE = "/register"
const userApi = new UserApi()
const { actions: USER } = userSlice

export const LoginForm = () => {
  const { passwordFormRules, requiredFieldRule, userLoginFormRules } =
    getFormRules()
  const dispatch = useDispatch()
  const { notification } = App.useApp()
  const navigateTo = useNavigate()
  const redirect = useRedirect()
  const [form] = Form.useForm<{ password: string; login: string }>()
  const onLogin = async (value: { password: string; login: string }) => {
    try {
      const response = await loginApiInstance.login(value)
      if (response) {
        try {
          dispatch(USER.LOADING())

          userApi.getUser().then(response => {
            const userData = response
            if (userData) {
              dispatch(USER.SUCCESS())
              dispatch(USER.SET_USER_ITEM(userData))
            }
          })
        } catch (e) {
          dispatch(USER.FAILED())

          if (e instanceof Error) {
            console.log(e.message)
          }
        }

        redirect()
      }
    } catch (e) {
      if (e instanceof Error && e.message === "User already in system") {
        const { user } = store.getState()
        if (user === null) {
          try {
            dispatch(USER.LOADING())

            userApi.getUser().then(response => {
              const userData = response
              if (userData) {
                dispatch(USER.SUCCESS())
                dispatch(USER.SET_USER_ITEM(userData))
              }
            })
          } catch (e) {
            dispatch(USER.FAILED())

            if (e instanceof Error) {
              console.log(e.message)
            }
          }
        }

        redirect()
        return
      }

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
