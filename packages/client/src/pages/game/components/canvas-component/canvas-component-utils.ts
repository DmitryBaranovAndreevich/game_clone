import {
  BULLET_HEIGHT,
  BULLET_WIDTH,
  COOKIE_SIZE,
  SHIP_HEIGHT,
  SHIP_WIDTH,
} from "../../game-constants"
import { TGameStore } from "../../game-utils"
import rocket from "../../../../assets/images/image/rocket.png"
import cracker from "../../../../assets/images/image/cracker.png"
import bullet from "../../../../assets/images/image/bullet.png"

function drawStar(
  ctx: CanvasRenderingContext2D | null | undefined,
  stars: { x: number; y: number; size: number; brightness: number }[],
) {
  if (!ctx) {
    return
  }
  stars.forEach(star => {
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`
    ctx.fill()
  })
}

export function generateStarrySky(
  canvas: HTMLCanvasElement | null,
  stars: { x: number; y: number; size: number; brightness: number }[],
  isGameOver = false,
) {
  if (!canvas || isGameOver) {
    return
  }

  const ctx = canvas.getContext("2d")

  if (!ctx) {
    return
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawStar(ctx, stars)
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

const drawShip = (
  ctx: CanvasRenderingContext2D,
  shipPosition: { x: number; y: number },
) => {
  const shipImage = new Image()
  shipImage.src = rocket

  ctx.drawImage(
    shipImage,
    shipPosition.x,
    shipPosition.y - 20,
    SHIP_WIDTH,
    SHIP_HEIGHT,
  )
}

const drawBullet = (
  ctx: CanvasRenderingContext2D,
  bullets: { x: number; y: number }[],
) => {
  const bulletImage = new Image()
  bulletImage.src = bullet

  bullets.forEach(bullet => {
    ctx.drawImage(
      bulletImage,
      bullet.x - 15,
      bullet.y - 10,
      BULLET_WIDTH + 30,
      BULLET_HEIGHT + 30,
    )
  })
}

const drawCracker = (
  ctx: CanvasRenderingContext2D,
  cookies: { x: number; y: number; health: number }[],
) => {
  const crackerImage = new Image()
  crackerImage.src = cracker

  cookies.forEach(cookie => {
    ctx.drawImage(
      crackerImage,
      cookie.x - 15,
      cookie.y - 25,
      COOKIE_SIZE + 30,
      COOKIE_SIZE + 50,
    )

    // Рисуем здоровье печеньки в правом верхнем углу
    ctx.fillStyle = "white" // Устанавливаем цвет для текста здоровья
    ctx.font = "16px Arial"
    ctx.textAlign = "right" // Выравнивание текста по правому краю
    ctx.textBaseline = "top" // Вертикальное выравнивание текста по верхнему краю
    ctx.fillText(
      `${cookie.health}`, // Текущее здоровье
      cookie.x + COOKIE_SIZE / 2 + COOKIE_SIZE / 2, // X-координата для правого верхнего угла
      cookie.y - 25, // Y-координата для верхней части печеньки
    )
    ctx.restore() // Восстанавливаем состояние контекста
  })
}

const drawScore = (
  ctx: CanvasRenderingContext2D,
  levelScore: number,
  requiredScore: number,
) => {
  ctx.save() // Сохраняем состояние контекста
  ctx.fillStyle = "white"
  ctx.font = "40px Michroma"
  ctx.textAlign = "left" // Явно задаём выравнивание текста
  ctx.textBaseline = "top" // Явно задаём базовую линию текста
  ctx.fillText(`Score: ${levelScore} / ${requiredScore}`, 45, 30)
  ctx.restore() // Восстанавливаем состояние контекста
}

const drawLevel = (
  ctx: CanvasRenderingContext2D,
  level: number,
  canvasWidth: number,
) => {
  ctx.save()
  ctx.fillStyle = "white"
  ctx.font = "40px Michroma"
  ctx.textAlign = "center"
  ctx.textBaseline = "top"
  ctx.fillText(`Level: ${level}`, canvasWidth / 2, 30)
  ctx.restore()
}

const drawTime = (
  ctx: CanvasRenderingContext2D,
  elapsedTime: number,
  canvasWidth: number,
) => {
  ctx.save()
  ctx.fillStyle = "white"
  ctx.font = "40px Michroma"
  ctx.textAlign = "right"
  ctx.textBaseline = "top"
  ctx.fillText(`Time: ${formatTime(elapsedTime)}`, canvasWidth - 50, 30)
  ctx.restore()
}

export const drawGame = (state: TGameStore) => {
  const { ctx: canvas, canvasSize, elapsedTime, gameOver, levelScore } = state
  const ctx = canvas?.getContext("2d")
  if (!ctx) {
    return
  }

  generateStarrySky(state.ctx, state.stars, gameOver)

  drawShip(ctx, state.shipPosition)

  drawBullet(ctx, state.bullets)

  drawCracker(ctx, state.cookies)

  drawLevel(ctx, state.currentLevel, canvasSize.width)

  drawScore(ctx, levelScore, state.requiredHits)

  drawTime(ctx, elapsedTime, canvasSize.width)
  // Конец игры

  if (gameOver) {
    ctx.fillText("Game Over", canvasSize.width / 2 - 50, canvasSize.height / 2)
    return
  }
}
