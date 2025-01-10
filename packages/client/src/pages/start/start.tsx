import { Layout, Typography } from "antd"
import styles from "./start.module.css"
import Sidebar from "../../components/sidebar"
import { CrazyCrackerIcon } from "../../assets/images/image/image-black-bg"

const { Content } = Layout

const Start = () => {
  return (
    <Layout className={styles.mainLayout}>
      <Layout className={styles.layout}>
        <Content className={styles.content}>
          <CrazyCrackerIcon className={styles.image} />
          <Typography.Title level={3} className={styles.customText}>
            CLICK TO
            <br /> START
          </Typography.Title>
        </Content>
        <Sidebar />
      </Layout>
    </Layout>
  )
}

export default Start
