import { ConfigProvider, App } from "antd"
import enEn from "antd/es/locale/en_US"
import { type ReactNode } from "react"
import styles from "./app.module.css"

const DARK_THEME = {
  cssVar: { prefix: "" },
  token: {
    fontFamily: "Michroma, sans-serif",
    formLabelColor: "#ffffff",
    colorTextHeading: "#ffffff",
    colorText: "#ffffff",
    fontSizeHeading2: 100,
    fontSizeHeading3: 40,
  },
}

export const AntdConfigProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider locale={enEn} theme={DARK_THEME}>
      <App className={styles.app}>{children}</App>
    </ConfigProvider>
  )
}
