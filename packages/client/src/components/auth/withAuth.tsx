import type { ComponentType } from "react"
import { useEffect } from "react"
import { generatePath, useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store"
import { fetchUserInfo } from "../../store/slices/user"
import { getUserInfo } from "../../store/selectors"
import { unwrapResult } from "@reduxjs/toolkit"

const LOGIN_PAGE_PATH = "/login"

export const withAuth =
  <T extends object>(Component: ComponentType<T>) =>
  (componentProps: T) => {
    const userInfo = useAppSelector(getUserInfo)
    const dispatch = useAppDispatch()
    const navigateTo = useNavigate()
    const location = useLocation()
    useEffect(() => {
      if (!userInfo) {
        dispatch(fetchUserInfo())
          .then(unwrapResult)
          .catch(() => {
            navigateTo(generatePath(LOGIN_PAGE_PATH), {
              state: { from: location },
            })
          })
      }
    }, [dispatch, location, navigateTo, userInfo])

    if (!userInfo) {
      return null
    }

    return (
      <>
        <Component {...componentProps} />
      </>
    )
  }
