import { createContext } from "react"

export type TGameStore = {
  ctx: HTMLCanvasElement | null
  timers: {
    bulletInterval: NodeJS.Timeout | null
    cookieGenerationInterval: NodeJS.Timeout | null
    cookieMovementInterval: NodeJS.Timeout | null
    starGenerationInterval: NodeJS.Timeout | null
    starMovementInterval: NodeJS.Timeout | null
  }
  canvasSize: { width: number; height: number }
  gameOver: boolean
  initialTime: number
  currentLevel: number
  showTime: boolean
  isPaused: boolean
  elapsedTime: number
  requiredHits: number
  shipPosition: { x: number; y: number }
  bullets: { x: number; y: number }[]
  stars: { x: number; y: number; size: number; brightness: number }[]
  cookies: { x: number; y: number; health: number }[]
  score: number
  isModalGameOverOpen: boolean
}

export const INIT_GAME_STATE = {
  ctx: null,
  timers: {
    bulletInterval: null,
    cookieGenerationInterval: null,
    cookieMovementInterval: null,
    starGenerationInterval: null,
    starMovementInterval: null,
  },
  canvasSize: {
    width: window.innerWidth || 800,
    height: window.innerHeight || 600,
  },
  initialTime: 0,
  currentLevel: 1,
  requiredHits: 5,
  isPaused: false,
  showTime: false,
  gameOver: false,
  elapsedTime: 0,
  shipPosition: { x: 200, y: 600 },
  bullets: [],
  cookies: [],
  stars: [],
  score: 0,
  isModalGameOverOpen: false,
}

export const GameContext = createContext<{
  state: TGameStore
  setState: React.Dispatch<React.SetStateAction<TGameStore>>
}>({
  state: INIT_GAME_STATE,
  setState: () => {},
})
