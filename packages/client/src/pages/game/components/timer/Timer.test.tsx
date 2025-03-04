import { render } from "@testing-library/react"
import { act } from "react"
import { useGameContextContext } from "../../useGameContext"
import { Timer } from "./timer"

jest.mock("../../useGameContext", () => ({
  useGameContextContext: jest.fn(),
}))

describe("Timer component", () => {
  let mockSetState: jest.Mock

  beforeEach(() => {
    jest.useFakeTimers()
    mockSetState = jest.fn()
    ;(useGameContextContext as jest.Mock).mockReturnValue({
      state: {
        gameOver: false,
        isPaused: false,
        initialTime: 10,
        elapsedTime: 10,
      },
      setState: mockSetState,
    })
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("should initialize elapsedTime with initialTime", () => {
    render(<Timer />)

    // Вызываем переданную в setState функцию вручную
    const stateUpdateFn = mockSetState.mock.calls[0][0]
    expect(typeof stateUpdateFn).toBe("function")

    const newState = stateUpdateFn({ elapsedTime: 0 })
    expect(newState).toEqual(expect.objectContaining({ elapsedTime: 10 }))
  })

  it("should increase elapsedTime every second", () => {
    render(<Timer />)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(mockSetState).toHaveBeenCalledTimes(2) // 1 раз при инициализации + 1 раз после 1 секунды
  })

  it("should stop the timer when gameOver is true", () => {
    ;(useGameContextContext as jest.Mock).mockReturnValue({
      state: {
        gameOver: true,
        isPaused: false,
        initialTime: 10,
        elapsedTime: 10,
      },
      setState: mockSetState,
    })

    render(<Timer />)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(mockSetState).toHaveBeenCalledTimes(1) // Только инициализация, таймер не запустился
  })

  it("should stop the timer when isPaused is true", () => {
    ;(useGameContextContext as jest.Mock).mockReturnValue({
      state: {
        gameOver: false,
        isPaused: true,
        initialTime: 10,
        elapsedTime: 10,
      },
      setState: mockSetState,
    })

    render(<Timer />)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(mockSetState).toHaveBeenCalledTimes(1) // Только инициализация, таймер не работает
  })
})
