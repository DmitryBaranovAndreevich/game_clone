import { useEffect } from "react"
import { useGameContextContext } from "../../useGameContext"

export const Star = () => {
  const { state, setState } = useGameContextContext()
  const { gameOver, canvasSize, timers } = state

  // Генерация звёзд
  useEffect(() => {
    if (gameOver) {
      return
    }

    timers.starGenerationInterval = setInterval(() => {
      const x = Math.random() * canvasSize.width
      const y = Math.random() * canvasSize.height
      const size = Math.random() * 2 + 0.5 // Размер звезды от 0.5 до 2.5
      const brightness = Math.random() * 0.8 + 0.2 // Яркость от 0.2 до 1
      setState(prev => ({
        ...prev,
        stars: [...prev.stars, { x, y, size, brightness }],
      }))
    }, 100)

    return () => {
      if (timers.starGenerationInterval) {
        clearInterval(timers.starGenerationInterval)
      }
    }
  }, [gameOver, canvasSize.width])

  // Движение звёзд
  useEffect(() => {
    if (gameOver) {
      return
    }

    timers.starMovementInterval = setInterval(() => {
      setState(prev => ({
        ...prev,
        stars: prev.stars
          .map(star => ({ ...star, y: star.y + 3 }))
          .filter(star => star.y < canvasSize.height),
      }))
    }, 20)

    return () => {
      if (timers.starMovementInterval) {
        clearInterval(timers.starMovementInterval)
      }
    }
  }, [gameOver, canvasSize.height])
  return null
}
