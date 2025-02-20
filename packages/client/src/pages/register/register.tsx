import { App, Col, Form, Row } from "antd"
import { CrazyCrackerIcon } from "../../assets/images/image/image-black-bg"
import { RegisterControls, RegisterForm } from "./components"
import { TRegisterRequestParams } from "./register-types"
import { RegisterAPI } from "./register-api"
import { generatePath, useNavigate } from "react-router-dom"
import { onlyWithOutAuth } from "../../components"
import styles from "./register.module.css"
import { useAppDispatch } from "../../store"
import { setUserInfo } from "../../store/slices/user"

type TRegisterForm = TRegisterRequestParams & { confirmPassword: string }
const registerApi = new RegisterAPI()

const Register = () => {
  const dispatch = useAppDispatch()
  const { notification } = App.useApp()
  const navigateTo = useNavigate()
  const [form] = Form.useForm<TRegisterForm>()
  const onRegister = async (value: TRegisterForm) => {
    try {
      const { password, confirmPassword, ...rest } = value
      if (password !== confirmPassword) {
        notification.error({
          message: "Passwords don't match",
          placement: "bottomRight",
        })
        return
      }
      const registerResponse = await registerApi.create({ password, ...rest })
      dispatch(setUserInfo(registerResponse))
      if (registerResponse) {
        navigateTo(generatePath("/"))
      }
    } catch (e) {
      if (e instanceof Error) {
        notification.error({ message: e.message, placement: "bottomRight" })
      }
    }
  }
  return (
    <Form layout={"vertical"} form={form} onFinish={onRegister}>
      <Row
        className={styles.root}
        align={"middle"}
        justify={"center"}
        gutter={{ xs: 10, sm: 10, md: 30, lg: 60 }}>
        <Col className={styles.iconContainer} xs={0} sm={0} md={6} lg={6}>
          <CrazyCrackerIcon className={styles.icon} />
        </Col>
        <Col xs={12} sm={12} md={9} lg={9}>
          <RegisterForm />
        </Col>
        <Col xs={12} sm={12} md={9} lg={9}>
          <RegisterControls />
        </Col>
      </Row>
    </Form>
  )
}

export default onlyWithOutAuth(Register)
