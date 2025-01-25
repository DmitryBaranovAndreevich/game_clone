import { useEffect, useRef } from "react"
import { useGameContextContext } from "../../useGameContext"
import {
  BULLET_HEIGHT,
  BULLET_WIDTH,
  FIRE_DELAY,
  SHIP_HEIGHT,
  SHIP_WIDTH,
  STEP,
} from "../../game-constants"

export const ShipComponent = () => {
  const { state, setState } = useGameContextContext()
  const { shipPosition, canvasSize, gameOver, isPaused } = state

  // Тайминг для предотвращения спама выстрелами
  const lastFireTimeRef = useRef<number>(0)

  const moveShip = (direction: "left" | "right" | "up" | "down") => {
    setState(prev => {
      const { x, y } = prev.shipPosition
      switch (direction) {
        case "left":
          return {
            ...prev,
            shipPosition: { ...prev.shipPosition, x: Math.max(0, x - STEP) },
          }
        case "right":
          return {
            ...prev,
            shipPosition: {
              ...prev.shipPosition,
              x: Math.min(canvasSize.width - SHIP_WIDTH, x + STEP),
            },
          }
        case "up":
          return {
            ...prev,
            shipPosition: { ...prev.shipPosition, y: Math.max(0, y - STEP) },
          }
        case "down":
          return {
            ...prev,
            shipPosition: {
              ...prev.shipPosition,
              y: Math.min(canvasSize.height - SHIP_HEIGHT, y + STEP),
            },
          }
        default:
          return prev
      }
    })
  }

  const fireBullet = () => {
    const now = Date.now()
    if (now - lastFireTimeRef.current < FIRE_DELAY) {
      return
    } // Пропустить выстрел, если слишком быстро
    lastFireTimeRef.current = now

    setState(prev => ({
      ...prev,
      bullets: [
        ...prev.bullets,
        {
          x: shipPosition.x + SHIP_WIDTH / 2 - BULLET_WIDTH / 2,
          y: shipPosition.y - BULLET_HEIGHT,
        },
      ],
    }))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || isPaused) {
        return
      } // Игнорировать ввод, если игра окончена

      switch (e.key) {
        case "ArrowLeft":
          moveShip("left")
          break
        case "ArrowRight":
          moveShip("right")
          break
        case "ArrowUp":
          moveShip("up")
          break
        case "ArrowDown":
          moveShip("down")
          break
        case " ":
          fireBullet()
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [gameOver, isPaused, canvasSize.width, canvasSize.height, shipPosition])
  return null
}
