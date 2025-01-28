import { Layout, Typography } from "antd"
import styles from "./start.module.css"
import Sidebar from "../../components/sidebar"
import { CrazyCrackerIcon } from "../../assets/images/image/image-black-bg"
import { generatePath, useNavigate } from "react-router-dom"
import { withAuth } from "../../components"

const { Content } = Layout

const Start = () => {
  const navigateTo = useNavigate()

  return (
    <Layout className={styles.mainLayout}>
      <Layout className={styles.layout}>
        <Content className={styles.content}>
          <CrazyCrackerIcon className={styles.image} />
          <Typography.Title
            level={3}
            className={styles.customText}
            onClick={() => {
              navigateTo(generatePath("/game"))
            }}>
            CLICK TO
            <br /> START
          </Typography.Title>
        </Content>
        <Sidebar />
      </Layout>
    </Layout>
  )
}

export default withAuth(Start)
