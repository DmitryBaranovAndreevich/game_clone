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
      gutter={{ xs: 10, sm: 10, md: 60, lg: 120 }}>
      <Col xs={0} sm={12} md={12} lg={12}>
        <CrazyCrackerIcon width={"100%"} />
      </Col>
      <Col xs={24} sm={12} md={8} lg={8}>
        <LoginForm />
      </Col>
    </Row>
  )
}

export default Login
