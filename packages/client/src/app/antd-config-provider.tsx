import { ConfigProvider, App, theme } from "antd"
import enEn from "antd/es/locale/en_US"
import { type ReactNode } from "react"
import styles from "./app.module.css"

const DARK_THEME = {
  cssVar: { prefix: "" },
  algorithm: theme.darkAlgorithm,
  token: {
    fontFamily: "Michroma, sans-serif",
    fontSizeHeading2: 100,
    fontSizeHeading3: 40,
    colorBgBase: "#000",
    colorLink: "#fff",
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

// const PURPLE_THEME = {
//   cssVar: { prefix: "" },
//   algorithm: theme.darkAlgorithm,
//   token: {
//
//     colorPrimary: "#8000ff",
//   },
// }

export const AntdConfigProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider locale={enEn} theme={DARK_THEME}>
      <App className={styles.app}>{children}</App>
    </ConfigProvider>
  )
}
