import { FC } from "react"
import { Button, Flex, Layout, Typography } from "antd"

type TComponentProps = {
  id: string
  title: string
  subtitle: string
}

const layoutStyle = {
  height: "100vh",
  width: "100vw",
  backgroundImage: "url(src/assets/images/image/image.png)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "bottom -230px left -300px",
}

const ErrorPage: FC<TComponentProps> = ({ id, title, subtitle }) => {
  return (
    <Layout>
      <Layout.Content style={layoutStyle} id={id}>
        <Flex
          vertical
          align="center"
          justify="center"
          style={{ height: "100%" }}>
          <Typography.Title level={2}>{title}</Typography.Title>
          <Typography.Title level={3}>{subtitle}</Typography.Title>
          <Button style={{ width: "100%", maxWidth: "200px" }}>Back</Button>
        </Flex>
      </Layout.Content>
    </Layout>
  )
}

export default ErrorPage
