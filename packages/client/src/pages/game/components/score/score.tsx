import { useEffect } from "react"
import { useGameContextContext } from "../../useGameContext"
import { BULLET_HEIGHT, BULLET_WIDTH, COOKIE_SIZE } from "../../game-constants"

export const Score = () => {
  const { state, setState } = useGameContextContext()
  const { gameOver, cookies, bullets } = state
  // Проверка на столкновение пуль с печеньками
  useEffect(() => {
    if (gameOver) {
      return
    }

    let isChange = false

    const newCookies = [...cookies]
    let newBullets = [...bullets]
    newBullets = newBullets.filter(bullet => {
      const hitIndex = newCookies.findIndex(
        cookie =>
          bullet.x < cookie.x + COOKIE_SIZE &&
          bullet.x + BULLET_WIDTH > cookie.x &&
          bullet.y < cookie.y + COOKIE_SIZE &&
          bullet.y + BULLET_HEIGHT > cookie.y,
      )

      if (hitIndex !== -1) {
        isChange = true
        setState(prev => ({ ...prev, score: prev.score + 1 }))
        newCookies.splice(hitIndex, 1) // Удаляем печеньку
        return false // Удаляем пулю
      }
      return true
    })
    if (isChange) {
      setState(prev => ({ ...prev, cookies: newCookies, bullets: newBullets }))
    }
  }, [bullets, cookies, gameOver])
  return null
}
