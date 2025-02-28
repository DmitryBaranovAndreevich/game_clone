import { App, Switch } from "antd"
import { useAppDispatch, useAppSelector } from "../../store"
import { setTheme, setThemeStatus } from "../../store/slices/theme"
import { FC, useEffect } from "react"
import { ThemeApi } from "../../services/api/theme-api"
import { TUser } from "../../services/api/user-api"

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

const themeApi = new ThemeApi()

const ThemeSwitch: FC<TComponentProps> = ({ className }) => {
  const { info: theme, status } = useAppSelector(state => state.theme)
  const { info: userInfo } = useAppSelector(state => state.user)

  const dispatch = useAppDispatch()
  const { notification } = App.useApp()

  const withoutAuthOnclick = async (actualTheme: string) => {
    dispatch(setTheme(actualTheme))
    dispatch(setThemeStatus())
  }
  const withAuthOnclick = async (actualTheme: string) => {
    const { id } = userInfo as TUser

    // const themeResponse = await themeApi.getTheme({id: id.toString()})
    // const response = await themeApi.setTheme(themeResponse, actualTheme)

    // if (response) {
    //   dispatch(setTheme(actualTheme))
    //   dispatch((setThemeStatus()))
    // }

    try {
      themeApi
        .getTheme({ id: id.toString() })
        .then(themeResponse => {
          return themeApi.setTheme(themeResponse, actualTheme)
        })
        .then(themeResponse => {
          if (themeResponse) {
            dispatch(setTheme(actualTheme))
            dispatch(setThemeStatus())
          }
        })
    } catch (e) {
      if (e instanceof Error) {
        notification.error({ message: e.message, placement: "bottomRight" })
      }
    }
  }

  const handleSwitch = async (e: boolean) => {
    const actualTheme = e ? "purple" : "default"

    if (userInfo) {
      withAuthOnclick(actualTheme)
    } else {
      withoutAuthOnclick(actualTheme)
    }
  }

  useEffect(() => {
    if (userInfo) {
      const { id } = userInfo as TUser

      try {
        themeApi.getTheme({ id: id.toString() }).then(response => {
          if (status === "init" && response.theme !== theme) {
            dispatch(setTheme(response.theme))
          } else if (status === "changed" && response.theme !== theme) {
            themeApi.setTheme(response, theme)
          }
        })
      } catch (e) {
        if (e instanceof Error) {
          notification.error({ message: e.message, placement: "bottomRight" })
        }
      }
    }
  }, [userInfo])

  return (
    <Switch
      className={className}
      id="theme-switch"
      onClick={handleSwitch}
      style={
        theme === "purple" ? switchStylePurpleTheme : switchStyleDefaultTheme
      }
      checked={theme === "purple" ? true : false}
    />
  )
}

export default ThemeSwitch
