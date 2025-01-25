import { useEffect } from "react"
import { useGameContextContext } from "../../useGameContext"
import { COOKIE_SIZE } from "../../game-constants"

export const Cracker = () => {
  const { state, setState } = useGameContextContext()
  const { gameOver, isPaused, canvasSize, timers } = state

  // Генерация печенек
  useEffect(() => {
    if (gameOver || isPaused) {
      return
    }

    timers.cookieGenerationInterval = setInterval(() => {
      const x = Math.random() * (canvasSize.width - COOKIE_SIZE)
      const health = Math.floor(Math.random() * 3) + 1

      setState(prev => ({
        ...prev,
        cookies: [...prev.cookies, { x, y: -COOKIE_SIZE, health }],
      }))
    }, 2000)

    return () => {
      if (timers.cookieGenerationInterval) {
        clearInterval(timers.cookieGenerationInterval)
      }
    }
  }, [gameOver, isPaused, canvasSize.width])

  // Движение печенек
  useEffect(() => {
    if (gameOver || isPaused) {
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
  }, [gameOver, isPaused, canvasSize.height])
  return null
}
