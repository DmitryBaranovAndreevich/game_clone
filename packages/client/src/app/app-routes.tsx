import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavigationPage from "../pages/navigation"
import NonFoundPage from "../pages/non-found"
import { Leaderboard, LoginPage, RegisterPage, ServerErrorPage } from "../pages"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/server-error" element={<ServerErrorPage />} />
        <Route path="/*" element={<NonFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
