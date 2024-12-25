import type { ComponentType } from "react"
import { useEffect } from "react"
import { generatePath, useLocation, useNavigate } from "react-router-dom"

const isAuthorized = true
const LOGIN_PAGE_PATH = "/login"

export const withAuth =
  <T extends object>(Component: ComponentType<T>) =>
  (componentProps: T) => {
    const navigateTo = useNavigate()
    const location = useLocation()
    useEffect(() => {
      if (!isAuthorized) {
        navigateTo(generatePath(LOGIN_PAGE_PATH), {
          state: location,
        })
      }
    }, [])

    if (!isAuthorized) {
      return null
    }

    return (
      <>
        <Component {...componentProps} />
      </>
    )
  }
