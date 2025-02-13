import { useEffect } from "react"
import { useGameContextContext } from "../../useGameContext"
import { BULLET_HEIGHT, BULLET_WIDTH, COOKIE_SIZE } from "../../game-constants"

export const Score = () => {
  const { state, setState } = useGameContextContext()
  const { gameOver, isPaused, cookies, bullets } = state

  // Проверка на столкновение пуль с печеньками
  useEffect(() => {
    if (gameOver || isPaused) {
      return
    }

    let isChange = false

    const updatedCookies = [...cookies] // Копия массива печенек
    let updatedBullets = [...bullets] // Копия массива пуль

    // Фильтруем пули, обрабатывая их столкновения с печеньками
    updatedBullets = updatedBullets.filter(bullet => {
      // Найти индекс печеньки, с которой пересеклась пуля
      const hitIndex = updatedCookies.findIndex(
        cookie =>
          bullet.x < cookie.x + COOKIE_SIZE &&
          bullet.x + BULLET_WIDTH > cookie.x &&
          bullet.y < cookie.y + COOKIE_SIZE &&
          bullet.y + BULLET_HEIGHT > cookie.y,
      )

      if (hitIndex !== -1) {
        isChange = true

        // Уменьшаем здоровье печеньки
        updatedCookies[hitIndex].health -= 1

        // Если здоровье <= 0, удаляем печеньку
        if (updatedCookies[hitIndex].health <= 0) {
          updatedCookies.splice(hitIndex, 1)
          setState(prev => ({
            ...prev,
            score: prev.score + 1,
            levelScore: prev.levelScore + 1,
          })) // Увеличиваем счёт
        }

        return false // Удаляем пулю
      }
      return true // Пуля остаётся
    })

    if (isChange) {
      setState(prev => ({
        ...prev,
        cookies: updatedCookies,
        bullets: updatedBullets,
      }))
    }
  }, [bullets, cookies, gameOver, isPaused, setState])

  return null
}
