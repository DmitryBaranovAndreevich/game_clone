import type { ComponentType } from "react"
import { useEffect } from "react"
import { generatePath, useLocation, useNavigate } from "react-router-dom"
import { getCookie } from "../../utils"

const MAIN_PAGE = "/"

export const onlyWithOutAuth =
  <T extends object>(Component: ComponentType<T>) =>
  (componentProps: T) => {
    const navigateTo = useNavigate()
    const location = useLocation()
    const isLogin = getCookie("login")
    useEffect(() => {
      if (isLogin) {
        navigateTo(generatePath(MAIN_PAGE))
      }
    }, [isLogin, location, navigateTo])

    if (isLogin) {
      return null
    }

    return (
      <>
        <Component {...componentProps} />
      </>
    )
  }
