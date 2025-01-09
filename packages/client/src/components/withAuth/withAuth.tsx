import type { ComponentType } from "react"
import { useEffect } from "react"
import { generatePath, useLocation, useNavigate } from "react-router-dom"
import { getCookie } from "../../utils"

const LOGIN_PAGE_PATH = "/login"

export const withAuth =
  <T extends object>(Component: ComponentType<T>) =>
  (componentProps: T) => {
    const navigateTo = useNavigate()
    const location = useLocation()
    const isLogin = getCookie("login")
    useEffect(() => {
      if (!isLogin) {
        navigateTo(generatePath(LOGIN_PAGE_PATH), {
          state: { from: location },
        })
      }
    }, [isLogin, location, navigateTo])

    if (!isLogin) {
      return null
    }

    return (
      <>
        <Component {...componentProps} />
      </>
    )
  }
