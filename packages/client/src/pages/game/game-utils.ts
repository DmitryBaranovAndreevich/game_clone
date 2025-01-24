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
  elapsedTime: number
  shipPosition: { x: number; y: number }
  bullets: { x: number; y: number }[]
  cookies: { x: number; y: number }[]
  stars: { x: number; y: number; size: number; brightness: number }[]
  score: number
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
  gameOver: false,
  elapsedTime: 0,
  shipPosition: { x: 200, y: 600 },
  bullets: [],
  cookies: [],
  stars: [],
  score: 0,
}

export const GameContext = createContext<{
  state: TGameStore
  setState: React.Dispatch<React.SetStateAction<TGameStore>>
}>({
  state: INIT_GAME_STATE,
  setState: () => {},
})
