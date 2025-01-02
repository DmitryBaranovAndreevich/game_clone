import { FC } from "react"
import { Button, Col, Flex, Layout, Row, Typography } from "antd"
import { CrazyCrackerIcon } from "../../assets/images/image/image-black-bg"
import styles from "../../pages/register/register.module.css"

type TComponentProps = {
  id: string
  title: string
  subtitle: string
}

const layoutStyle = {
  height: "100vh",
  width: "100vw",
}

const handleBack = () => {
  window.history.back()
}

const ErrorPage: FC<TComponentProps> = ({ id, title, subtitle }) => {
  return (
    <Layout>
      <Layout.Content style={layoutStyle} id={id}>
        <Row
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
          }}>
          <Col xs={0} sm={0} md={6} lg={6}>
            <CrazyCrackerIcon className={styles.icon} />
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} />
          <Flex
            vertical
            align="center"
            justify="center"
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              bottom: "0",
              left: "0",
            }}>
            <Typography.Title level={2}>{title}</Typography.Title>
            <Typography.Title level={3}>{subtitle}</Typography.Title>
            <Button
              style={{ width: "100%", maxWidth: "200px" }}
              onClick={handleBack}>
              Back
            </Button>
          </Flex>
        </Row>
      </Layout.Content>
    </Layout>
  )
}

export default ErrorPage
