import {
  BULLET_HEIGHT,
  BULLET_WIDTH,
  COOKIE_SIZE,
  SHIP_HEIGHT,
  SHIP_WIDTH,
} from "../../game-constants"
import { TGameStore } from "../../game-utils"

export const STAR_COUNT = 500

function drawStar(
  ctx: CanvasRenderingContext2D | null | undefined,
  x: number,
  y: number,
  size: number,
  brightness: number,
) {
  if (!ctx) {
    return
  }
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
  ctx.fill()
}

export function generateStarrySky(
  canvas: HTMLCanvasElement | null,
  starCount: number,
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
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const size = Math.random() * 2 + 0.5 // Размер звезды от 0.5 до 2.5
    const brightness = Math.random() * 0.8 + 0.2 // Яркость от 0.2 до 1

    drawStar(ctx, x, y, size, brightness)
  }
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
  ctx.fillStyle = "white"
  ctx.beginPath()
  ctx.moveTo(shipPosition.x + SHIP_WIDTH / 2, shipPosition.y) // Верхушка треугольника
  ctx.lineTo(shipPosition.x, shipPosition.y + SHIP_HEIGHT) // Левая нижняя точка
  ctx.lineTo(shipPosition.x + SHIP_WIDTH, shipPosition.y + SHIP_HEIGHT) // Правая нижняя точка
  ctx.closePath()
  ctx.fill()
}

const drawBullet = (
  ctx: CanvasRenderingContext2D,
  bullets: { x: number; y: number }[],
) => {
  ctx.fillStyle = "red"
  bullets.forEach(bullet => {
    ctx.fillRect(bullet.x, bullet.y, BULLET_WIDTH, BULLET_HEIGHT)
  })
}

const drawCracker = (
  ctx: CanvasRenderingContext2D,
  cookies: { x: number; y: number }[],
) => {
  ctx.fillStyle = "brown"
  cookies.forEach(cookie => {
    ctx.beginPath()
    ctx.arc(
      cookie.x + COOKIE_SIZE / 2,
      cookie.y + COOKIE_SIZE / 2,
      COOKIE_SIZE / 2,
      0,
      Math.PI * 2,
    )
    ctx.fill()
  })
}

const drawScore = (ctx: CanvasRenderingContext2D, score: number) => {
  ctx.fillStyle = "white"
  ctx.font = "40px Michroma "
  ctx.fillText(`Score: ${score}`, 45, 80)
}

const drawTime = (
  ctx: CanvasRenderingContext2D,
  elapsedTime: number,
  canvasWidth: number,
) => {
  ctx.fillText(`Time: ${formatTime(elapsedTime)}`, canvasWidth - 350, 80)
}

// const drawFullscreenBtn = (ctx: CanvasRenderingContext2D,   canvasWidth: number, canvasHeight: number
// ) => {
//   ctx.beginPath();

//   ctx.fillRect(canvasWidth - 59, canvasHeight / 2 - 18, 10, 3)
//   ctx.fillRect(canvasWidth - 59, canvasHeight / 2 - 18, 3, 10)

//   ctx.fillRect(canvasWidth - 38, canvasHeight / 2 - 18, 10, 3)
//   ctx.fillRect(canvasWidth - 31, canvasHeight / 2 - 18, 3, 10)

//   ctx.fillRect(canvasWidth - 59, canvasHeight / 2 + 9, 10, 3)
//   ctx.fillRect(canvasWidth - 59, canvasHeight / 2 + 2, 3, 10)

//   ctx.fillRect(canvasWidth - 38, canvasHeight / 2 + 9, 10, 3)
//   ctx.fillRect(canvasWidth - 31, canvasHeight / 2 + 2, 3, 10)

//   ctx.fillStyle = "white"
//   ctx.fill()
// }

export const drawGame = (state: TGameStore) => {
  const { ctx: canvas, canvasSize, elapsedTime, gameOver, score } = state
  const ctx = canvas?.getContext("2d")
  if (!ctx) {
    return
  }

  generateStarrySky(state.ctx, STAR_COUNT, gameOver)

  drawShip(ctx, state.shipPosition)

  drawBullet(ctx, state.bullets)

  drawCracker(ctx, state.cookies)

  drawScore(ctx, score)

  drawTime(ctx, elapsedTime, canvasSize.width)

  // drawFullscreenBtn(ctx, canvasSize.width, canvasSize.height)
  // Конец игры

  if (gameOver) {
    ctx.fillText("Game Over", canvasSize.width / 2 - 50, canvasSize.height / 2)
    return
  }
}
