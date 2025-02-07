import { useEffect, useRef } from "react"
import { useGameContextContext } from "../../useGameContext"
import { drawGame } from "./canvas-component-utils"
import { COOKIE_SIZE, SHIP_HEIGHT, SHIP_WIDTH } from "../../game-constants"
import {
  LeaderboardApi,
  TAddLeaderData,
} from "../../../../services/api/leaderboard-api"
import { useAppSelector } from "../../../../store"
import { App } from "antd"

const leaderboardApi = new LeaderboardApi()
let id: number | undefined

export const CanvasComponent = () => {
  const { notification } = App.useApp()
  const { info: userInfo } = useAppSelector(state => state.user)
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

  const addLeader = async (data: TAddLeaderData) => {
    try {
      await leaderboardApi.addLeader(data)
    } catch (e) {
      if (e instanceof Error) {
        notification.error({ message: e.message, placement: "bottomRight" })
      }
    }
  }

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

  useEffect(() => {
    if (state.levelScore >= state.requiredHits) {
      // Условия завершения уровня
      setState(prev => ({
        ...prev,
        levelScore: 0, // Сбрасываем счётчик попаданий
        currentLevel: prev.currentLevel + 1, // Увеличиваем уровень
        requiredHits: prev.requiredHits + 5, // Увеличиваем необходимое количество попаданий
      }))
    }
  }, [state.levelScore, state.requiredHits])

  useEffect(() => {
    // Проверка столкновения с первой печенькой
    state.cookies.forEach(cookie => {
      const distance = Math.sqrt(
        (state.shipPosition.x - (cookie.x + COOKIE_SIZE / 2)) ** 2 +
          (state.shipPosition.y - (cookie.y + COOKIE_SIZE / 2)) ** 2,
      )

      if (distance < COOKIE_SIZE / 2 + SHIP_WIDTH / 2) {
        const circleX = cookie.x
        const circleY = cookie.y
        const circleRadius = COOKIE_SIZE

        // Вершины треугольника
        const A = { x: shipPosition.x, y: shipPosition.y }
        const B = {
          x: shipPosition.x - SHIP_WIDTH / 2,
          y: shipPosition.y + SHIP_HEIGHT,
        }
        const C = {
          x: shipPosition.x + SHIP_WIDTH / 2,
          y: shipPosition.y + SHIP_HEIGHT,
        }

        // Проверка пересечения сторон треугольника с кругом
        const intersects =
          doesCircleIntersectLine(circleX, circleY, circleRadius, A, B) ||
          doesCircleIntersectLine(circleX, circleY, circleRadius, B, C) ||
          doesCircleIntersectLine(circleX, circleY, circleRadius, C, A)

        if (intersects) {
          setState(prev => ({ ...prev, gameOver: true }))

          addLeader({
            score: score === 0 ? 0 : null,
            name: userInfo?.display_name || userInfo?.login || null,
            id: userInfo?.id || null,
          })
        }
      }
    })
  }, [state.cookies, state.shipPosition])

  /**
   * Проверяет, пересекает ли круг отрезок.
   */
  function doesCircleIntersectLine(
    cx: number,
    cy: number,
    radius: number,
    p1: { x: number; y: number },
    p2: { x: number; y: number },
  ) {
    const dx = p2.x - p1.x
    const dy = p2.y - p1.y
    const fx = p1.x - cx
    const fy = p1.y - cy

    const a = dx * dx + dy * dy
    const b = 2 * (fx * dx + fy * dy)
    const c = fx * fx + fy * fy - radius * radius

    const discriminant = b * b - 4 * a * c
    if (discriminant < 0) {
      return false
    } // Нет пересечения

    const t1 = (-b - Math.sqrt(discriminant)) / (2 * a)
    const t2 = (-b + Math.sqrt(discriminant)) / (2 * a)

    return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1)
  }

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  )
}
