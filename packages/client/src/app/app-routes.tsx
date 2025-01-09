import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavigationPage from "../pages/navigation"
import LoginPage from "../pages/login"
import ServerErrorPage from "../pages/server-error"
import NonFoundPage from "../pages/non-found"
import ForumPage from "../pages/forum"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/server-error" element={<ServerErrorPage />} />
        <Route path="/*" element={<NonFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
