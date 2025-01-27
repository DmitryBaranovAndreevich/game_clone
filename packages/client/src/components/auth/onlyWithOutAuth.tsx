import type { ComponentType } from "react"
import { useEffect } from "react"
import { generatePath, useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../store"
import { getUserInfo } from "../../store/selectors"

const MAIN_PAGE = "/"

export const onlyWithOutAuth =
  <T extends object>(Component: ComponentType<T>) =>
  (componentProps: T) => {
    const userInfo = useAppSelector(getUserInfo)
    const navigateTo = useNavigate()
    const location = useLocation()
    useEffect(() => {
      if (userInfo) {
        navigateTo(generatePath(MAIN_PAGE))
      }
    }, [userInfo, location, navigateTo])

    if (userInfo) {
      return null
    }

    return (
      <>
        <Component {...componentProps} />
      </>
    )
  }
