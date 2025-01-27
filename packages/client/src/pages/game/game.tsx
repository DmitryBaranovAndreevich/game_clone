import { useState } from "react"
import { GameContext, INIT_GAME_STATE, TGameStore } from "./game-utils"
import {
  Bullet,
  CanvasComponent,
  Cracker,
  Score,
  ShipComponent,
  Timer,
  Star,
} from "./components"
import { Sidebar } from "./components/sidebar"
import { withAuth } from "../../components"
import { PauseModal } from "./components/pauseModal"

const Game = () => {
  const [state, setState] = useState<TGameStore>(INIT_GAME_STATE)

  return (
    <GameContext.Provider value={{ state, setState }}>
      <CanvasComponent />
      <Star />
      <Timer />
      <ShipComponent />
      <Bullet />
      <Cracker />
      <Score />
      <Sidebar />
      <PauseModal />
    </GameContext.Provider>
  )
}

export default withAuth(Game)
