import {
  CommentOutlined,
  RocketOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Switch } from "antd"
import styles from "./index.module.css"

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <RocketOutlined className={styles.icons} />
      <UserOutlined className={styles.icons} />
      <TrophyOutlined className={styles.icons} />
      <CommentOutlined className={styles.icons} />
      <Switch defaultChecked className={styles.customSwitch} />
    </div>
  )
}

export default Sidebar
