import { Routes, Route } from "react-router-dom"
import {
  Leaderboard,
  LoginPage,
  NonFoundPage,
  Profile,
  RegisterPage,
  ServerErrorPage,
  StartPage,
  ForumPage,
  TopicPage,
  CreateTopicPage,
} from "../pages"
import Game from "../pages/game/game"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/game" element={<Game />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forum" element={<ForumPage />} />
      <Route path="/forum/:topicId" element={<TopicPage />} />
      <Route path="/create-topic" element={<CreateTopicPage />} />
      <Route path="/server-error" element={<ServerErrorPage />} />
      <Route path="/*" element={<NonFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
