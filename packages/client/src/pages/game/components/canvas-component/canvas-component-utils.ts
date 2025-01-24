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
  cookies: { x: number; y: number }[],
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

export const drawGame = (state: TGameStore) => {
  const { ctx: canvas, canvasSize, elapsedTime, gameOver, score } = state
  const ctx = canvas?.getContext("2d")
  if (!ctx) {
    return
  }

  generateStarrySky(state.ctx, state.stars, gameOver)

  drawShip(ctx, state.shipPosition)

  drawBullet(ctx, state.bullets)

  drawCracker(ctx, state.cookies)

  drawScore(ctx, score)

  drawTime(ctx, elapsedTime, canvasSize.width)
  // Конец игры

  if (gameOver) {
    ctx.fillText("Game Over", canvasSize.width / 2 - 50, canvasSize.height / 2)
    return
  }
}
