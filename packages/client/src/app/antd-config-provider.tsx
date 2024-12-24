import { ConfigProvider, App, theme } from "antd"
import enEn from "antd/es/locale/en_US"
import { type ReactNode } from "react"
import styles from "./app.module.css"

const DARK_THEME = {
  cssVar: { prefix: "" },
  algorithm: theme.darkAlgorithm,
  token: {
    fontFamily: "Michroma, sans-serif",
    // formLabelColor: "#ffffff",
    // colorTextHeading: "#ffffff",
    // colorText: "#ffffff",
    // colorTextPlaceholder: "#fff",
    fontSizeHeading2: 100,
    fontSizeHeading3: 40,
    // colorBgBase: "#000",
    // colorBgContainer: "#000",
    // colorBorder: "#fff"
  },
  // components: {
  //   Table: {
  //     borderColor: "#fff",
  //     headerBorderRadius: "0",
  //     stickyScrollBarBg: "rgba(255, 255, 255, 0.25)"
  //   },
  // },
}


export const AntdConfigProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider locale={enEn} theme={DARK_THEME}>
      <App className={styles.app}>{children}</App>
    </ConfigProvider>
  )
}
