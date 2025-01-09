import { BrowserRouter, Routes, Route } from "react-router-dom"
import {
  Leaderboard,
  LoginPage,
  NavigationPage,
  NonFoundPage,
  RegisterPage,
  ServerErrorPage,
  ForumPage,
} from "../pages"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/server-error" element={<ServerErrorPage />} />
        <Route path="/*" element={<NonFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
