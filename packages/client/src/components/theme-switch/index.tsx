import { Switch } from "antd"
import { useAppDispatch, useAppSelector } from "../../store"
import { setTheme } from "../../store/slices/theme"
import { FC } from "react"

const switchStyleDefaultTheme = {
  transform: "rotate(270deg)",
  transformOrigin: "center",
  margin: "11px 0",
  background: "#1668dc",
}

const switchStylePurpleTheme = {
  transform: "rotate(270deg)",
  transformOrigin: "center",
  margin: "11px 0",
  background: "#8000ff",
}

type TComponentProps = {
  className?: string
}

const ThemeSwitch: FC<TComponentProps> = ({ className }) => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme)

  return (
    <Switch
      className={className}
      id="theme-switch"
      onClick={e => {
        const actualTheme = e ? "purple" : "default"
        dispatch(setTheme(actualTheme))
      }}
      style={
        theme === "purple" ? switchStylePurpleTheme : switchStyleDefaultTheme
      }
      defaultChecked={theme === "purple" ? true : false}
    />
  )
}

export default ThemeSwitch
