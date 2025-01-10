import {
  CommentOutlined,
  RocketOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Flex, Layout, Switch } from "antd"
import { Link } from "react-router-dom"
import { withAuth } from "../withAuth"

const layoutStyle = {
  margin: "0",
}

const sidebarStyle = {
  backgroundColor: "#000",
  padding: "10px 0",
  width: "80px",
  height: "100%",
  gap: "36px",
}

const iconStyle = {
  fontSize: "36px",
}

const switchStyle = {
  transform: "rotate(270deg)",
  transformOrigin: "center",
  background: "#1668dc",
}

const Sidebar = () => {
  return (
    <Layout.Sider id="sidebar" width="80px" style={layoutStyle}>
      <Flex style={sidebarStyle} vertical align="center" justify="center">
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
        <Switch defaultChecked style={switchStyle} />
      </Flex>
    </Layout.Sider>
  )
}

export default withAuth(Sidebar)
