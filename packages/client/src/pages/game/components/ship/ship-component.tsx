import { useEffect } from "react"
import { useGameContextContext } from "../../useGameContext"
import { BULLET_HEIGHT, BULLET_WIDTH, SHIP_WIDTH } from "../../game-constants"

export const ShipComponent = () => {
  const { state, setState } = useGameContextContext()
  const { shipPosition, canvasSize, gameOver } = state

  const fireBullet = () => {
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
      if (e.key === "ArrowLeft" && shipPosition.x > 0) {
        setState(prev => ({
          ...prev,
          shipPosition: { ...prev.shipPosition, x: prev.shipPosition.x - 10 },
        }))
      }
      if (
        e.key === "ArrowRight" &&
        shipPosition.x < canvasSize.width - SHIP_WIDTH
      ) {
        setState(prev => ({
          ...prev,
          shipPosition: { ...prev.shipPosition, x: prev.shipPosition.x + 10 },
        }))
      }
      if (e.key === " " && !gameOver) {
        fireBullet()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [shipPosition, gameOver, canvasSize.width])
  return null
}
