import { FC } from "react"

export const fullscreenBtn = (canvasSize: {
  width: number
  height: number
}) => {
  return {
    x: canvasSize.width - 62,
    y: canvasSize.height / 2 - 21,
    size: 36,
  }
}

export const fullscreenHandler = (
  e: MouseEvent,
  canvasSize: { width: number; height: number },
  canvas,
) => {
  const pos = {
    x: e.clientX,
    y: e.clientY,
  }

  const actuallFullscreenBtn = fullscreenBtn(canvasSize)

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      canvas.requestFullscreen().then(
        () => {},
        e => {
          console.log(e)
        },
      )
    } else {
      document.exitFullscreen()
    }
  }

  function isIntersect(point, btn) {
    // Координаты углов квадрата
    const { x: btnX, y: btnY, size } = btn

    // Проверяем, находится ли точка внутри границ квадрата
    return (
      point.x >= btnX &&
      point.x <= btnX + size &&
      point.y >= btnY &&
      point.y <= btnY + size
    )
  }

  if (isIntersect(pos, actuallFullscreenBtn)) {
    toggleFullScreen()
  }
}

export const FullscreenBtn: FC = () => {
  return null
}
