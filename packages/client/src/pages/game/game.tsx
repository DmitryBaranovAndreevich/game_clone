import { useEffect, useRef, useState } from "react"

interface Bullet {
  x: number
  y: number
}

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [shipPosition, setShipPosition] = useState({ x: 200, y: 500 })
  const [bullets, setBullets] = useState<Bullet[]>([])
  const [cookies, setCookies] = useState<Bullet[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [backgroundOffset, setBackgroundOffset] = useState(0)

  const shipWidth = 33
  const shipHeight = 70
  const bulletWidth = 5
  const bulletHeight = 15
  const cookieSize = 40

  const [elapsedTime, setElapsedTime] = useState(0)

  // Запуск таймера
  useEffect(() => {
    if (gameOver) {
      return
    }

    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [gameOver])

  // Форматирование времени
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }

  const backgroundImage = useRef(new Image())
  backgroundImage.current.src = "/static/theme.png" // Путь к вашей картинке

  const intervalRefs = useRef<{
    bulletInterval: NodeJS.Timeout | null
    cookieGenerationInterval: NodeJS.Timeout | null
    cookieMovementInterval: NodeJS.Timeout | null
  }>({
    bulletInterval: null,
    cookieGenerationInterval: null,
    cookieMovementInterval: null,
  })

  // Обновление размеров холста при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Управление кораблем
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && shipPosition.x > 0) {
        setShipPosition(prev => ({ ...prev, x: prev.x - 10 }))
      }
      if (
        e.key === "ArrowRight" &&
        shipPosition.x < canvasSize.width - shipWidth
      ) {
        setShipPosition(prev => ({ ...prev, x: prev.x + 10 }))
      }
      if (e.key === " " && !gameOver) {
        fireBullet()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [shipPosition, gameOver, canvasSize.width])

  // Стрельба
  const fireBullet = () => {
    setBullets(prevBullets => [
      ...prevBullets,
      {
        x: shipPosition.x + shipWidth / 2 - bulletWidth / 2,
        y: shipPosition.y - bulletHeight,
      },
    ])
  }

  // Движение пуль
  useEffect(() => {
    if (gameOver) {
      return
    }

    intervalRefs.current.bulletInterval = setInterval(() => {
      setBullets(prevBullets =>
        prevBullets
          .map(bullet => ({ ...bullet, y: bullet.y - 5 }))
          .filter(bullet => bullet.y > 0),
      )
    }, 20)

    return () => {
      if (intervalRefs.current.bulletInterval) {
        clearInterval(intervalRefs.current.bulletInterval)
      }
    }
  }, [gameOver])

  // Генерация печенек
  useEffect(() => {
    if (gameOver) {
      return
    }

    intervalRefs.current.cookieGenerationInterval = setInterval(() => {
      const x = Math.random() * (canvasSize.width - cookieSize)
      setCookies(prevCookies => [...prevCookies, { x, y: -cookieSize }])
    }, 2000)

    return () => {
      if (intervalRefs.current.cookieGenerationInterval) {
        clearInterval(intervalRefs.current.cookieGenerationInterval)
      }
    }
  }, [gameOver, canvasSize.width])

  // Движение печенек
  useEffect(() => {
    if (gameOver) {
      return
    }

    intervalRefs.current.cookieMovementInterval = setInterval(() => {
      setCookies(prevCookies =>
        prevCookies
          .map(cookie => ({ ...cookie, y: cookie.y + 3 }))
          .filter(cookie => cookie.y < canvasSize.height),
      )
    }, 20)

    return () => {
      if (intervalRefs.current.cookieMovementInterval) {
        clearInterval(intervalRefs.current.cookieMovementInterval)
      }
    }
  }, [gameOver, canvasSize.height])

  // Проверка на столкновение пуль с печеньками
  useEffect(() => {
    if (gameOver) {
      return
    }

    const newCookies = [...cookies]
    let newBullets = [...bullets]
    newBullets = newBullets.filter(bullet => {
      const hitIndex = newCookies.findIndex(
        cookie =>
          bullet.x < cookie.x + cookieSize &&
          bullet.x + bulletWidth > cookie.x &&
          bullet.y < cookie.y + cookieSize &&
          bullet.y + bulletHeight > cookie.y,
      )
      if (hitIndex !== -1) {
        setScore(prev => prev + 1)
        newCookies.splice(hitIndex, 1) // Удаляем печеньку
        return false // Удаляем пулю
      }
      return true
    })
    setCookies(newCookies)
    setBullets(newBullets)
  }, [bullets, cookies, gameOver])

  // Проверка на конец игры (столкновение с печенькой)
  useEffect(() => {
    cookies.forEach(cookie => {
      if (
        shipPosition.x < cookie.x + cookieSize &&
        shipPosition.x + shipWidth > cookie.x &&
        shipPosition.y < cookie.y + cookieSize &&
        shipPosition.y + shipHeight > cookie.y
      ) {
        setGameOver(true)
      }
    })
  }, [cookies, shipPosition])

  useEffect(() => {
    if (gameOver) {
      return
    }

    let animationFrame: number
    const animateBackground = () => {
      setBackgroundOffset(prevOffset => (prevOffset + 2) % canvasSize.height)
      animationFrame = requestAnimationFrame(animateBackground)
    }

    animationFrame = requestAnimationFrame(animateBackground)

    return () => cancelAnimationFrame(animationFrame)
  }, [gameOver, canvasSize.height])

  // Отрисовка игры
  const drawGame = () => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) {
      return
    }

    // Отрисовываем фон
    ctx.drawImage(
      backgroundImage.current,
      0,
      backgroundOffset - canvasSize.height,
      canvasSize.width,
      canvasSize.height,
    )
    ctx.drawImage(
      backgroundImage.current,
      0,
      backgroundOffset,
      canvasSize.width,
      canvasSize.height,
    )

    // Корабль
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.moveTo(shipPosition.x + shipWidth / 2, shipPosition.y) // Верхушка треугольника
    ctx.lineTo(shipPosition.x, shipPosition.y + shipHeight) // Левая нижняя точка
    ctx.lineTo(shipPosition.x + shipWidth, shipPosition.y + shipHeight) // Правая нижняя точка
    ctx.closePath()
    ctx.fill()

    // Пули
    ctx.fillStyle = "red"
    bullets.forEach(bullet => {
      ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight)
    })

    // Печеньки
    ctx.fillStyle = "brown"
    cookies.forEach(cookie => {
      ctx.beginPath()
      ctx.arc(
        cookie.x + cookieSize / 2,
        cookie.y + cookieSize / 2,
        cookieSize / 2,
        0,
        Math.PI * 2,
      )
      ctx.fill()
    })

    // Счет
    ctx.fillStyle = "white"
    ctx.font = "40px Michroma "
    ctx.fillText(`Score: ${score}`, 45, 80)

    // Время
    ctx.fillText(`Time: ${formatTime(elapsedTime)}`, canvasSize.width - 350, 80)

    // Конец игры
    if (gameOver) {
      ctx.fillText(
        "Game Over",
        canvasSize.width / 2 - 50,
        canvasSize.height / 2,
      )
    }
  }

  useEffect(() => {
    if (gameOver) {
      return
    }
    drawGame()
  }, [shipPosition, bullets, cookies, score, gameOver, canvasSize])

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}></canvas>
    </div>
  )
}

export default Game
