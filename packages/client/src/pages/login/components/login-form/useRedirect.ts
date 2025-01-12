import { generatePath, useLocation, useNavigate } from "react-router-dom"
import { setCookie } from "../../../../utils"
import { useCallback } from "react"

export const useRedirect = () => {
  const navigateTo = useNavigate()
  const location = useLocation()
  const redirect = useCallback(() => {
    setCookie("login", "true", { expires: 1200 })
    navigateTo(location.state?.from || generatePath("/"))
  }, [location.state, navigateTo])

  return redirect
}
