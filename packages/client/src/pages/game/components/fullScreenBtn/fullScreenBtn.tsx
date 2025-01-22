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
) => {
  const pos = {
    x: e.clientX,
    y: e.clientY,
  }

  const actuallFullscreenBtn = fullscreenBtn(canvasSize)

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(
        () => {},
        e => {
          console.log(e)
        },
      )
    } else {
      document.exitFullscreen()
    }
  }

  function isIntersect(
    point: { x: number; y: number },
    btnArea: {
      x: number
      y: number
      size: number
    },
  ) {
    const { x: btnX, y: btnY, size } = btnArea

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
