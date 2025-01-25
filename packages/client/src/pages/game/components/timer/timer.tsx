import { useEffect, useRef } from "react"
import { useGameContextContext } from "../../useGameContext"

export const Timer = () => {
  const { state, setState } = useGameContextContext()
  const { gameOver, isPaused, initialTime } = state // Деструктуризация для удобства
  const intervalRef = useRef<NodeJS.Timeout | null>(null) // Хранение интервала

  // Инициализация таймера
  useEffect(() => {
    setState(prev => ({ ...prev, elapsedTime: initialTime }))
  }, [initialTime, setState])

  // Управление таймером
  useEffect(() => {
    // Если игра завершена или пауза, ничего не делаем
    if (gameOver || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current) // Очищаем интервал, если он существует
        intervalRef.current = null
      }
      return
    }

    // Запуск интервала для увеличения времени
    intervalRef.current = setInterval(() => {
      setState(prev => ({
        ...prev,
        elapsedTime: prev.elapsedTime + 1, // Увеличиваем время на 1 секунду
      }))
    }, 1000)

    // Очистка интервала при размонтировании или изменении условий
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [gameOver, isPaused, setState])

  return null
}
