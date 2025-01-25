import { useState } from "react"
import { GameContext, INIT_GAME_STATE, TGameStore } from "./game-utils"
import {
  Bullet,
  CanvasComponent,
  Cracker,
  Score,
  ShipComponent,
  Timer,
} from "./components"
import { Sidebar } from "./components/sidebar"

const Game = () => {
  const [state, setState] = useState<TGameStore>(INIT_GAME_STATE)

  return (
    <GameContext.Provider value={{ state, setState }}>
      <CanvasComponent />
      <Timer />
      <ShipComponent />
      <Bullet />
      <Cracker />
      <Score />
      <Sidebar />
    </GameContext.Provider>
  )
}

export default Game
