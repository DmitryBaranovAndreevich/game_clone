import { ConfigProvider, App, theme } from "antd"
import { type ReactNode } from "react"
import styles from "./app.module.css"
import { useAppSelector } from "../store"

const DEFAULT_THEME = {
  cssVar: { prefix: "" },
  algorithm: theme.darkAlgorithm,
  token: {
    fontFamily: "Michroma, sans-serif",
    fontSizeHeading2: 100,
    fontSizeHeading3: 40,
    colorBgBase: "#000",
    colorLink: "#fff",
    colorPrimary: "#1668dc",
  },
  components: {
    Table: {
      headerBorderRadius: 0,
      stickyScrollBarBg: "rgba(255, 255, 255, 0.25)",
    },
    Button: {
      defaultBg: "#000",
      defaultActiveBg: "#000",
      defaultHoverBg: "#000",
    },
    Switch: {
      handleBg: "#fff",
    },
    Layout: {
      bodyBg: "#000",
      siderBg: "#000",
    },
  },
}

const PURPLE_THEME = {
  cssVar: { prefix: "" },
  algorithm: theme.darkAlgorithm,
  token: {
    fontFamily: "Michroma, sans-serif",
    fontSizeHeading2: 100,
    fontSizeHeading3: 40,
    colorBgBase: "#000",
    colorLink: "#fff",
    colorPrimary: "#8000ff",
  },
  components: {
    Table: {
      headerBorderRadius: 0,
      stickyScrollBarBg: "rgba(255, 255, 255, 0.25)",
    },
    Button: {
      defaultBg: "#000",
      defaultActiveBg: "#000",
      defaultHoverBg: "#000",
    },
    Switch: {
      handleBg: "#fff",
    },
    Layout: {
      bodyBg: "#000",
      siderBg: "#000",
    },
  },
}

export const AntdConfigProvider = ({ children }: { children: ReactNode }) => {
  const theme = useAppSelector(state => state.theme)
  const actualTheme = theme === "purple" ? PURPLE_THEME : DEFAULT_THEME

  return (
    <ConfigProvider theme={actualTheme}>
      <App className={styles.app}>{children}</App>
    </ConfigProvider>
  )
}
