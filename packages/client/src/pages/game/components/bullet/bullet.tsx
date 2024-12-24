import { useEffect } from "react"
import { useGameContextContext } from "../../useGameContext"

export const Bullet = () => {
  const { state, setState } = useGameContextContext()
  const { gameOver, timers } = state
  useEffect(() => {
    if (gameOver) {
      return
    }

    timers.bulletInterval = setInterval(() => {
      setState(prev => ({
        ...prev,
        bullets: prev.bullets
          .map(bullet => ({ ...bullet, y: bullet.y - 5 }))
          .filter(bullet => bullet.y > 0),
      }))
    }, 20)

    return () => {
      if (timers.bulletInterval) {
        clearInterval(timers.bulletInterval)
      }
    }
  }, [gameOver])
  return null
}
