import type { ComponentType } from "react"
import { useEffect, useRef } from "react"
import { generatePath, useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store"
import { fetchUserInfo } from "../../store/slices/user"
import { getUserInfo } from "../../store/selectors"
import { unwrapResult } from "@reduxjs/toolkit"
import { AuthApi } from "../../services/api/auth-api"

const LOGIN_PAGE_PATH = "/login"

export const withAuth =
  <T extends object>(Component: ComponentType<T>) =>
  (componentProps: T) => {
    const userInfo = useAppSelector(getUserInfo)
    const dispatch = useAppDispatch()
    const navigateTo = useNavigate()
    const location = useLocation()
    const isRequestSent = useRef(false)

    useEffect(() => {
      const params = new URLSearchParams(location.search)
      const authCode = params.get("code")
      const authApi = new AuthApi()

      if (!userInfo) {
        // если в пути найден праметр code - получаемый от аутентифиуации яндекса
        if (authCode) {
          // + флаг отправления запроса необходимый из-за перерендеринга компонентов
          if (!isRequestSent.current) {
            isRequestSent.current = true
            authApi
              .oauthSignIn(authCode)
              .then(() => {
                dispatch(fetchUserInfo())
                  .then(unwrapResult)
                  .then(() => {
                    navigateTo(generatePath("/"))
                  })
                  .catch(() => {
                    isRequestSent.current = false
                    navigateTo(generatePath(LOGIN_PAGE_PATH), {
                      state: { from: location },
                    })
                  })
              })
              .catch(error => {
                isRequestSent.current = false
                console.error("Ошибка при обмене кода на токен:", error)
                navigateTo(generatePath(LOGIN_PAGE_PATH), {
                  state: { from: location },
                })
              })
          }
        } else {
          dispatch(fetchUserInfo())
            .then(unwrapResult)
            .catch(() => {
              navigateTo(generatePath(LOGIN_PAGE_PATH), {
                state: { from: location },
              })
            })
        }
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
