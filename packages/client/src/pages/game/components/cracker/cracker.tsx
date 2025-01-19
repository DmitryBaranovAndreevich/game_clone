import { useEffect } from "react"
import { useGameContextContext } from "../../useGameContext"
import { COOKIE_SIZE } from "../../game-constants"

export const Cracker = () => {
  const { state, setState } = useGameContextContext()
  const { gameOver, canvasSize, timers } = state

  // Генерация печенек
  useEffect(() => {
    if (gameOver) {
      return
    }

    timers.cookieGenerationInterval = setInterval(() => {
      const x = Math.random() * (canvasSize.width - COOKIE_SIZE)
      setState(prev => ({
        ...prev,
        cookies: [...prev.cookies, { x, y: -COOKIE_SIZE }],
      }))
    }, 2000)

    return () => {
      if (timers.cookieGenerationInterval) {
        clearInterval(timers.cookieGenerationInterval)
      }
    }
  }, [gameOver, canvasSize.width])

  // Движение печенек
  useEffect(() => {
    if (gameOver) {
      return
    }

    timers.cookieMovementInterval = setInterval(() => {
      setState(prev => ({
        ...prev,
        cookies: prev.cookies
          .map(cookie => ({ ...cookie, y: cookie.y + 3 }))
          .filter(cookie => cookie.y < canvasSize.height),
      }))
    }, 20)

    return () => {
      if (timers.cookieMovementInterval) {
        clearInterval(timers.cookieMovementInterval)
      }
    }
  }, [gameOver, canvasSize.height])
  return null
}
