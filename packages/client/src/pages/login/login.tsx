import { Col, Row } from "antd"
import { CrazyCrackerIcon } from "../../assets/images/image/image-black-bg"
import { LoginForm } from "./components"
import styles from "./login.module.css"

const Login = () => {
  return (
    <Row
      className={styles.root}
      align={"middle"}
      justify={"center"}
      gutter={[120, 0]}>
      <Col>
        <CrazyCrackerIcon />
      </Col>
      <Col span={8}>
        <LoginForm />
      </Col>
    </Row>
  )
}

export default Login
