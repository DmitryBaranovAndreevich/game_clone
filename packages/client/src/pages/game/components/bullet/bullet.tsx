import { useEffect, useRef } from "react"
import { useGameContextContext } from "../../useGameContext"

export const Bullet = () => {
  const { state, setState } = useGameContextContext()
  const { gameOver, isPaused } = state

  // Используем useRef для управления интервалом
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (gameOver || isPaused) {
      return
    }

    // Обновление положения снарядов
    const updateBullets = () => {
      setState(prev => ({
        ...prev,
        bullets: prev.bullets
          .map(bullet => ({ ...bullet, y: bullet.y - 5 })) // Двигаем снаряды вверх
          .filter(bullet => bullet.y > 0), // Убираем снаряды за пределами экрана
      }))
    }

    // Запуск интервала
    intervalRef.current = setInterval(updateBullets, 20)

    // Очистка интервала при размонтировании или окончании игры
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [gameOver, isPaused, setState])
  return null
}
