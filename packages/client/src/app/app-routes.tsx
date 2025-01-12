import { BrowserRouter, Routes, Route } from "react-router-dom"
import {
  Leaderboard,
  LoginPage,
  NonFoundPage,
  RegisterPage,
  ServerErrorPage,
  StartPage,
} from "../pages"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/server-error" element={<ServerErrorPage />} />
        <Route path="/*" element={<NonFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
