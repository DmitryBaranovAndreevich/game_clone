import { generatePath, useLocation, useNavigate } from "react-router-dom"
import { useCallback } from "react"

export const useRedirect = () => {
  const navigateTo = useNavigate()
  const location = useLocation()
  const redirect = useCallback(() => {
    navigateTo(location.state?.from || generatePath("/"))
  }, [location.state, navigateTo])

  return redirect
}
