import { useEffect } from "react"
import { useGameContextContext } from "../../useGameContext"

export const Timer = () => {
  const { state, setState } = useGameContextContext()
  // Запуск таймера
  useEffect(() => {
    if (state.gameOver) {
      return
    }

    const interval = setInterval(() => {
      setState(prev => ({ ...prev, elapsedTime: prev.elapsedTime + 1 }))
    }, 1000)

    return () => clearInterval(interval)
  }, [state.gameOver])

  return null
}
