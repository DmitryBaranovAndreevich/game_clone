import {
  CommentOutlined,
  RocketOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Link } from "react-router-dom"
import Switch from "../theme-switch"
import { withAuth } from "../auth"
import { FC } from "react"
import { Flex, Layout } from "antd"

const layoutStyle = {
  margin: "0",
}

const sidebarStyle = {
  backgroundColor: "#000",
  width: "80px",
  height: "100%",
  gap: "36px",
}

const iconStyle = {
  fontSize: "36px",
}

const Sidebar: FC = () => {
  return (
    <Layout.Sider id="sidebar" width="80px" style={layoutStyle}>
      <Flex vertical align="center" justify="center" style={sidebarStyle}>
        <Link id="start-link" to="/">
          <RocketOutlined style={iconStyle} />
        </Link>
        <Link id="profile-link" to="/profile">
          <UserOutlined style={iconStyle} />
        </Link>
        <Link id="leaderboard-link" to="/leaderboard">
          <TrophyOutlined style={iconStyle} />
        </Link>
        <Link id="forum-link" to="/forum">
          <CommentOutlined style={iconStyle} />
        </Link>
        <Switch />
      </Flex>
    </Layout.Sider>
  )
}

export default withAuth(Sidebar)
