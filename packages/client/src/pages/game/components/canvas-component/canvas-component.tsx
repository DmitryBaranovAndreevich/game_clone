import { useEffect, useRef } from "react"
import { useGameContextContext } from "../../useGameContext"
import { drawGame } from "./canvas-component-utils"
import { COOKIE_SIZE, SHIP_HEIGHT } from "../../game-constants"

let id: number | undefined

export const CanvasComponent = () => {
  const { state, setState } = useGameContextContext()
  const {
    gameOver,
    canvasSize,
    elapsedTime,
    shipPosition,
    bullets,
    cookies,
    score,
  } = state
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Обновление размеров холста при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      setState(prev => ({
        ...prev,
        canvasSize: { width: window.innerWidth, height: window.innerHeight },
      }))
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      setState(prev => ({ ...prev, ctx: canvasRef.current }))
    }
  }, [canvasRef.current])

  useEffect(() => {
    if (id) {
      cancelAnimationFrame(id)
    }

    if (gameOver) {
      drawGame(state)
      return
    }

    const animate = () => {
      drawGame(state)
      id = requestAnimationFrame(animate)
    }

    animate()
  }, [gameOver, canvasSize, elapsedTime, shipPosition, bullets, cookies, score])

  // Проверка на конец игры (столкновение с печенькой)
  useEffect(() => {
    cookies.forEach(cookie => {
      if (
        shipPosition.x < cookie.x + COOKIE_SIZE &&
        shipPosition.x + SHIP_HEIGHT > cookie.x &&
        shipPosition.y < cookie.y + COOKIE_SIZE &&
        shipPosition.y + SHIP_HEIGHT > cookie.y
      ) {
        setState(prev => ({ ...prev, gameOver: true }))
      }
    })
  }, [cookies, shipPosition])

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  )
}
