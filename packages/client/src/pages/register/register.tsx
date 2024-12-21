import { Col, Form, Row } from "antd"
import { CrazyCrackerIcon } from "../../assets/images/image/image-black-bg"
import { RegisterControls, RegisterForm } from "./components"
import styles from "./register.module.css"

type TRegisterForm = Record<
  | "email"
  | "login"
  | "first_name"
  | "second_name"
  | "phone"
  | "password"
  | "confirmPassword",
  string
>

const Register = () => {
  const [form] = Form.useForm<TRegisterForm>()
  const onRegister = (value: TRegisterForm) => {
    console.log(value)
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

export default Register
